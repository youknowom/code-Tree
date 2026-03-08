import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";

async function main() {
    const courses = await db.select().from(coursesTable);
    console.log(JSON.stringify(courses, null, 2));
}

main();
