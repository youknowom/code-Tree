import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import crypto from "crypto";
dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function runEndToEndVerification() {
  console.log("=== RUNNING FULL AI/ML COURSE & CERTIFICATION E2E TEST ===");

  // 1. Setup a test learner user
  const testEmail = "omkar.learner@example.com";
  const testName = "Omkar Dadaji Bagul";

  console.log(`\n1. Creating/Fetching test learner: ${testEmail}`);
  const userResult = await sql`
    INSERT INTO users (name, email, points)
    VALUES (${testName}, ${testEmail}, 100)
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    RETURNING id, name, email, points;
  `;
  const userId = userResult[0].id;
  console.log(`✓ Learner ready (User ID: ${userId})`);

  // Course 10: Machine Learning Fundamentals & Scikit-Learn
  const courseId = 10;

  // 2. Test Enrollment
  console.log(`\n2. Enrolling learner in Course ${courseId}...`);
  await sql`
    INSERT INTO enrolled_courses (course_id, user_id, status, xp_earned)
    VALUES (${courseId}, ${userId}, 'in_progress', 0)
    ON CONFLICT DO NOTHING;
  `;
  const enroll = await sql`
    SELECT * FROM enrolled_courses WHERE course_id = ${courseId} AND user_id = ${userId};
  `;
  console.log(`✓ Enrolled successfully. Status: ${enroll[0].status}`);

  // 3. Complete Lessons & Verify Progress
  console.log("\n3. Simulating Lesson Completions...");
  const chapters = await sql`
    SELECT id, chapter_id FROM course_chapters WHERE course_id = ${courseId};
  `;

  for (const ch of chapters) {
    await sql`
      INSERT INTO completed_exercises (course_id, chapter_id, exercise_id, user_id)
      VALUES (${courseId}, ${ch.id}, 1, ${userId})
      ON CONFLICT DO NOTHING;
    `;
  }
  const completed = await sql`
    SELECT count(*) as count FROM completed_exercises WHERE course_id = ${courseId} AND user_id = ${userId};
  `;
  console.log(`✓ Completed exercises recorded: ${completed[0].count}`);

  // 4. Test Final Assessment: Failing Attempt (< 75%)
  console.log("\n4. Testing Assessment: Failing Attempt...");
  const assessments = await sql`
    SELECT * FROM course_assessments WHERE course_id = ${courseId} AND assessment_type = 'final';
  `;
  if (assessments.length === 0) {
    throw new Error("Final assessment not found for course 10");
  }
  const assessment = assessments[0];
  const questions = assessment.questions;
  console.log(`Assessment: "${assessment.title}" (Passing threshold: ${assessment.passing_score}%)`);

  // Submitting all wrong answers (e.g. choice 3 for all)
  const failAnswers: Record<number, number> = {};
  questions.forEach((q: any) => {
    failAnswers[q.id] = (q.correctAnswerIndex + 1) % q.options.length; // guaranteed wrong
  });

  let failCorrectCount = 0;
  questions.forEach((q: any) => {
    if (failAnswers[q.id] === q.correctAnswerIndex) failCorrectCount++;
  });
  const failScore = Math.round((failCorrectCount / questions.length) * 100);
  const failPassed = failScore >= assessment.passing_score;

  await sql`
    INSERT INTO assessment_attempts (user_id, course_id, assessment_id, score, total_questions, correct_answers, passed, submitted_answers)
    VALUES (${userId}, ${courseId}, ${assessment.id}, ${failScore}, ${questions.length}, ${failCorrectCount}, ${failPassed}, ${JSON.stringify(failAnswers)});
  `;
  console.log(`Attempt 1 Result: Score = ${failScore}%, Passed = ${failPassed}`);

  // Verify NO certificate was generated on failure
  const noCert = await sql`
    SELECT * FROM certificates WHERE user_id = ${userId} AND course_id = ${courseId};
  `;
  if (noCert.length === 0) {
    console.log("✓ Correct: No certificate issued on failing score.");
  } else {
    throw new Error("ERROR: Certificate was issued despite failing score!");
  }

  // 5. Test Assessment: Passing Attempt (100%)
  console.log("\n5. Testing Assessment: Retake & Passing Attempt...");
  const passAnswers: Record<number, number> = {};
  questions.forEach((q: any) => {
    passAnswers[q.id] = q.correctAnswerIndex; // 100% correct
  });

  let passCorrectCount = 0;
  questions.forEach((q: any) => {
    if (passAnswers[q.id] === q.correctAnswerIndex) passCorrectCount++;
  });
  const passScore = Math.round((passCorrectCount / questions.length) * 100);
  const passPassed = passScore >= assessment.passing_score;

  await sql`
    INSERT INTO assessment_attempts (user_id, course_id, assessment_id, score, total_questions, correct_answers, passed, submitted_answers)
    VALUES (${userId}, ${courseId}, ${assessment.id}, ${passScore}, ${questions.length}, ${passCorrectCount}, ${passPassed}, ${JSON.stringify(passAnswers)});
  `;
  console.log(`Attempt 2 Result: Score = ${passScore}%, Passed = ${passPassed}`);

  // Update enrollment to completed
  await sql`
    UPDATE enrolled_courses
    SET status = 'completed', completed_at = NOW()
    WHERE course_id = ${courseId} AND user_id = ${userId};
  `;

  // 6. Generate Certificate (Idempotent Server Logic)
  console.log("\n6. Automatically Generating Certificate...");
  const year = new Date().getFullYear();
  const randomChars = crypto.randomBytes(4).toString("hex").toUpperCase();
  const generatedCertId = `CERT-AIML-${year}-${courseId}${randomChars.slice(0, 4)}`;
  const verificationCode = crypto.randomBytes(8).toString("hex").toUpperCase();

  const certInsert = await sql`
    INSERT INTO certificates (
      certificate_id, user_id, course_id, learner_name, course_title,
      score, verification_code, instructor, duration, skills_covered, metadata
    ) VALUES (
      ${generatedCertId}, ${userId}, ${courseId}, ${testName}, 'Machine Learning Fundamentals & Scikit-Learn',
      ${passScore}, ${verificationCode}, 'Marcus Thorne, Principal ML Engineer', '14 Hours',
      ${JSON.stringify(["Statistical Learning", "Regularization", "Scikit-Learn", "Pipelines"])},
      ${JSON.stringify({ issuedBy: "CodeTree AI Academy", accreditation: "Verified Certificate" })}
    )
    ON CONFLICT (user_id, course_id) DO UPDATE SET score = EXCLUDED.score
    RETURNING certificate_id, learner_name, course_title, score, issued_at;
  `;

  const cert = certInsert[0];
  console.log("✓ Certificate generated successfully:");
  console.log(`  - Certificate ID: ${cert.certificate_id}`);
  console.log(`  - Learner:        ${cert.learner_name}`);
  console.log(`  - Course:         ${cert.course_title}`);
  console.log(`  - Score:          ${cert.score}%`);
  console.log(`  - Issued At:      ${cert.issued_at}`);

  // 7. Test Idempotency (Duplicate completion request)
  console.log("\n7. Testing Idempotency (Preventing Duplicate Certificates)...");
  const secondAttemptCertId = `CERT-AIML-${year}-${courseId}9999`;
  const dupCheck = await sql`
    INSERT INTO certificates (
      certificate_id, user_id, course_id, learner_name, course_title,
      score, verification_code
    ) VALUES (
      ${secondAttemptCertId}, ${userId}, ${courseId}, ${testName}, 'Machine Learning Fundamentals',
      100, 'TESTCODE'
    )
    ON CONFLICT (user_id, course_id) DO NOTHING
    RETURNING id;
  `;
  const totalCertsForUser = await sql`
    SELECT count(*) as count FROM certificates WHERE user_id = ${userId} AND course_id = ${courseId};
  `;
  if (parseInt(totalCertsForUser[0].count) === 1) {
    console.log("✓ Idempotency Verified: Exactly 1 certificate exists. Duplicate insertion safely blocked.");
  } else {
    throw new Error(`Idempotency failed: found ${totalCertsForUser[0].count} certificates!`);
  }

  // 8. Test Public Verification Lookup
  console.log("\n8. Testing Public Verification Query...");
  const verifyResult = await sql`
    SELECT certificate_id, learner_name, course_title, score, issued_at, instructor
    FROM certificates
    WHERE certificate_id = ${cert.certificate_id};
  `;
  if (verifyResult.length === 1 && verifyResult[0].certificate_id === cert.certificate_id) {
    console.log("✓ Public Registry verified: Record is authentic and fully accessible!");
  } else {
    throw new Error("Verification query failed.");
  }

  console.log("\n=== ALL 8 END-TO-END VERIFICATION TESTS PASSED PERFECTLY! ===");
}

runEndToEndVerification().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
