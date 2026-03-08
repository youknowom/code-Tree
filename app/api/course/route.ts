import { db } from "@/config/db";
import {
  completedExercisesTable,
  courseChaptersTable,
  coursesTable,
  enrolledCoursesTable,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const user = await currentUser();

  if (courseId && courseId != "enrolled") {
    const parsedCourseId = parseInt(courseId, 10);
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseId, parsedCourseId));
    const chapterResult = await db
      .select()
      .from(courseChaptersTable)
      .where(eq(courseChaptersTable.courseId, parsedCourseId));

    let isEnrolledCourse = false;
    let enrollCourse: any[] = [];
    let completedExcercises: any[] = [];

    if (user?.primaryEmailAddress?.emailAddress) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

      if (dbUser.length > 0) {
        enrollCourse = await db
          .select()
          .from(enrolledCoursesTable)
          .where(
            and(
              eq(enrolledCoursesTable.courseId, parsedCourseId),
              eq(enrolledCoursesTable.userId, dbUser[0].id)
            )
          );
        isEnrolledCourse = enrollCourse?.length > 0 ? true : false;

        // Fetch completed exercises using numeric IDs
        completedExcercises = await db
          .select()
          .from(completedExercisesTable)
          .where(
            and(
              eq(completedExercisesTable.courseId, parsedCourseId),
              eq(completedExercisesTable.userId, dbUser[0].id)
            )
          )
          .orderBy(
            desc(completedExercisesTable.courseId),
            desc(completedExercisesTable.exerciseId)
          );
      }
    }
    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrollCourse[0],
      completedExcercises: completedExcercises,
    });
  } else if (courseId == "enrolled") {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json([]);
    }

    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

    if (dbUser.length === 0) {
      return NextResponse.json([]);
    }

    const userId = dbUser[0].id;

    // 1️⃣ Fetch all enrolled courses for the user
    const enrolledCourses = await db
      .select()
      .from(enrolledCoursesTable)
      .where(eq(enrolledCoursesTable.userId, userId));

    if (enrolledCourses.length === 0) {
      return NextResponse.json([]);
    }

    // Extract courseIds
    const courseIds = enrolledCourses.map((c) => c.courseId);

    // 2️⃣ Fetch all course details in one go
    const courses = await db.select().from(coursesTable);

    // Filter courses by courseIds
    const filteredCourses = courses.filter((course) =>
      courseIds.includes(course.courseId)
    );

    // 3️⃣ Fetch chapters for all courses
    const chapters = await db
      .select()
      .from(courseChaptersTable)
      .orderBy(asc(courseChaptersTable.chapterId));

    const filteredChapters = chapters.filter((chapter) =>
      courseIds.includes(chapter.courseId)
    );

    // 4️⃣ Fetch completed exercises for all courses
    const completed = await db
      .select()
      .from(completedExercisesTable)
      .where(eq(completedExercisesTable.userId, userId))
      .orderBy(
        desc(completedExercisesTable.courseId),
        desc(completedExercisesTable.exerciseId)
      );

    const finalResult = filteredCourses.map((course) => {
      const courseEnrollInfo = enrolledCourses.find(
        (e) => e.courseId === course.courseId
      );

      return {
        ...course,
        chapters: filteredChapters.filter(
          (ch) => ch.courseId === course.courseId
        ),
        completedExercises: completed.filter(
          (cx) => cx.courseId === course.courseId
        ),
        courseEnrolledInfo: courseEnrollInfo,
        userEnrolled: true,
      };
    });

    // ⭐ Format output
    const formattedResult = finalResult.map((item) => {
      // Count total exercises by summing exercises arrays in all chapters
      const totalExercises = item.chapters.reduce((acc, chapter) => {
        // If exercises is stored as JSON/array
        const exercisesCount = Array.isArray(chapter.exercises)
          ? chapter.exercises.length
          : 0;
        return acc + exercisesCount;
      }, 0);

      const completedExercises = item.completedExercises.length;

      return {
        courseId: item.courseId,
        title: item.title,
        bannerImage: item?.bannerImage,
        totalExercises,
        completedExercises,
        xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
        level: item.level,
      };
    });

    return NextResponse.json(formattedResult);
  } else {
    //fetch all courses
    const result = await db.select().from(coursesTable);
    return NextResponse.json(result);
  }
}
