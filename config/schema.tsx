import {
  pgTable,
  integer,
  varchar,
  json,
  unique,
  timestamp,
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
