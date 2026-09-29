import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("Starting database schema migration for AI/ML platform...");

  // 1. Add columns to courses table if they don't exist
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'AI/ML'`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration VARCHAR(100) DEFAULT '8 Hours'`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor VARCHAR(255) DEFAULT 'CodeTree AI Faculty'`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS passing_score INTEGER DEFAULT 70`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS certificate_enabled BOOLEAN DEFAULT true`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS overview JSONB`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published'`;
  console.log("✓ Updated courses table columns");

  // 2. Add columns to enrolled_courses table if they don't exist
  await sql`ALTER TABLE enrolled_courses ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP`;
  await sql`ALTER TABLE enrolled_courses ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'in_progress'`;
  console.log("✓ Updated enrolled_courses table columns");

  // 3. Create certificates table
  await sql`
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      certificate_id VARCHAR(100) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
      learner_name VARCHAR(255) NOT NULL,
      course_title VARCHAR(255) NOT NULL,
      score INTEGER DEFAULT 100,
      issued_at TIMESTAMP DEFAULT NOW(),
      verification_code VARCHAR(100) NOT NULL,
      instructor VARCHAR(255) DEFAULT 'CodeTree AI Faculty',
      duration VARCHAR(100),
      skills_covered JSONB,
      metadata JSONB,
      CONSTRAINT unique_user_course_cert UNIQUE (user_id, course_id)
    )
  `;
  console.log("✓ Created certificates table with unique constraint on (user_id, course_id)");

  // 4. Create course_assessments table
  await sql`
    CREATE TABLE IF NOT EXISTS course_assessments (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
      chapter_id INTEGER,
      assessment_type VARCHAR(50) DEFAULT 'final',
      title VARCHAR(255) NOT NULL,
      description VARCHAR(1000),
      passing_score INTEGER DEFAULT 70,
      time_limit_minutes INTEGER DEFAULT 30,
      questions JSONB NOT NULL
    )
  `;
  console.log("✓ Created course_assessments table");

  // 5. Create assessment_attempts table
  await sql`
    CREATE TABLE IF NOT EXISTS assessment_attempts (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
      assessment_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      passed BOOLEAN NOT NULL,
      submitted_answers JSONB,
      attempted_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log("✓ Created assessment_attempts table");

  console.log("All AI/ML tables and schema updates migrated successfully!");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
