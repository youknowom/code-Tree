import {
  pgTable,
  integer,
  varchar,
  json,
  unique,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

/* USERS */
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  points: integer("points").default(0),
  subscription: varchar("subscription", { length: 50 }),
});

/* COURSES */
export const coursesTable = pgTable("courses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer("course_id").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  bannerImage: varchar("banner_image", { length: 500 }).notNull(),
  level: varchar("level", { length: 50 }).default("Beginner"),
  tags: varchar("tags", { length: 255 }),
  editorType: varchar("editor_type", { length: 255 }),
  category: varchar("category", { length: 100 }).default("AI/ML"),
  duration: varchar("duration", { length: 100 }).default("8 Hours"),
  instructor: varchar("instructor", { length: 255 }).default("CodeTree AI Faculty"),
  passingScore: integer("passing_score").default(70),
  certificateEnabled: boolean("certificate_enabled").default(true),
  overview: json("overview"),
  status: varchar("status", { length: 50 }).default("published"),
});

/* COURSE CHAPTERS */
export const courseChaptersTable = pgTable(
  "course_chapters",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.courseId, { onDelete: "cascade" }),
    chapterId: integer("chapter_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    exercises: json("exercises"),
  },
  (table) => ({
    uniqueChapterPerCourse: unique().on(table.courseId, table.chapterId),
  })
);

/* ENROLLED COURSES */
export const enrolledCoursesTable = pgTable("enrolled_courses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.courseId, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  enrolledDate: timestamp("enrolled_date").defaultNow(),
  xpEarned: integer("xp_earned").default(0),
  completedAt: timestamp("completed_at"),
  status: varchar("status", { length: 50 }).default("in_progress"), // 'not_started' | 'in_progress' | 'completed' | 'certificate_issued'
});

export const completedExercisesTable = pgTable(
  "completed_exercises",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.courseId, { onDelete: "cascade" }),
    chapterId: integer("chapter_id")
      .notNull()
      .references(() => courseChaptersTable.id, { onDelete: "cascade" }),
    exerciseId: integer("exercise_id").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at").defaultNow(),
  },
  (table) => ({
    uniqueExercisePerUser: unique().on(
      table.userId,
      table.courseId,
      table.chapterId,
      table.exerciseId
    ),
  })
);

export const exercisesTable = pgTable("exercises", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer("course_id").references(() => coursesTable.courseId, {
    onDelete: "cascade",
  }),
  chapterId: integer("chapter_id"),
  exerciseId: varchar("exercise_id", { length: 255 }).notNull(),
  exercisesContent: json("exercises_content"),
  exerciseName: varchar("exercise_name", { length: 255 }),
});

/* CERTIFICATES */
export const certificatesTable = pgTable(
  "certificates",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    certificateId: varchar("certificate_id", { length: 100 }).notNull().unique(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.courseId, { onDelete: "cascade" }),
    learnerName: varchar("learner_name", { length: 255 }).notNull(),
    courseTitle: varchar("course_title", { length: 255 }).notNull(),
    score: integer("score").default(100),
    issuedAt: timestamp("issued_at").defaultNow(),
    verificationCode: varchar("verification_code", { length: 100 }).notNull(),
    instructor: varchar("instructor", { length: 255 }).default("CodeTree AI Faculty"),
    duration: varchar("duration", { length: 100 }),
    skillsCovered: json("skills_covered"),
    metadata: json("metadata"),
  },
  (table) => ({
    uniqueUserCourseCert: unique().on(table.userId, table.courseId),
  })
);

/* COURSE ASSESSMENTS (Quizzes & Final Exams) */
export const courseAssessmentsTable = pgTable("course_assessments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.courseId, { onDelete: "cascade" }),
  chapterId: integer("chapter_id"),
  assessmentType: varchar("assessment_type", { length: 50 }).default("final"), // 'quiz' | 'final'
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }),
  passingScore: integer("passing_score").default(70),
  timeLimitMinutes: integer("time_limit_minutes").default(30),
  questions: json("questions").notNull(),
});

/* ASSESSMENT ATTEMPTS */
export const assessmentAttemptsTable = pgTable("assessment_attempts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.courseId, { onDelete: "cascade" }),
  assessmentId: integer("assessment_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  passed: boolean("passed").notNull(),
  submittedAnswers: json("submitted_answers"),
  attemptedAt: timestamp("attempted_at").defaultNow(),
});
