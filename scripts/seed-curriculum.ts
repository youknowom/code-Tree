import { db } from "@/config/db";
import { coursesTable, courseChaptersTable, exercisesTable } from "@/config/schema";
import { eq, and } from "drizzle-orm";

interface ExerciseItem {
  name: string;
  slug: string;
  xp: number;
  difficulty: "easy" | "medium" | "hard";
  task?: string;
  hint?: string;
  content?: string;
  starterCode?: Record<string, string>;
  regex?: string;
}

interface ChapterItem {
  id: number;
  name: string;
  desc: string;
  exercises: ExerciseItem[];
}

interface CourseDefinition {
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string;
  editorType: string;
  chapters: ChapterItem[];
}

const NEW_COURSES: CourseDefinition[] = [
  {
    courseId: 5,
    title: "TypeScript Essentials",
    description: "Master modern TypeScript: type annotations, interfaces, union types, generics, and compile-time type safety.",
    bannerImage: "https://images.unsplash.com/photo-1516116211227-bbc04ad8f615?auto=format&fit=crop&w=800&q=80",
    level: "Intermediate",
    tags: "TypeScript",
    editorType: "vanilla-ts",
    chapters: [
      {
        id: 1,
        name: "Introduction to TypeScript",
        desc: "Understand what TypeScript is, how it enhances JavaScript, and write your first typed variables.",
        exercises: [
          {
            name: "Basic Type Annotations",
            slug: "basic-type-annotations",
            xp: 25,
            difficulty: "easy",
            content: `
              <h2>Welcome to TypeScript!</h2>
              <p>TypeScript adds static type definitions to JavaScript. Types provide a way to describe the shape of an object, offering better documentation and allowing TypeScript to validate that your code is working correctly.</p>
              <p>Basic primitive types include: <code>string</code>, <code>number</code>, and <code>boolean</code>.</p>
              <pre><code>let username: string = "Alex";\nlet level: number = 42;\nlet isActive: boolean = true;</code></pre>
            `,
            task: `<p>Declare a variable <code>heroName</code> of type <code>string</code> assigned to <code>"CodeKnight"</code>, and a variable <code>xpPoints</code> of type <code>number</code> assigned to <code>100</code>.</p>`,
            hint: `<p>Use <code>let heroName: string = "CodeKnight";</code> and <code>let xpPoints: number = 100;</code></p>`,
            starterCode: {
              "/index.ts": `// Declare heroName (string) and xpPoints (number)\n\nconsole.log("TypeScript Ready!");\n`,
            },
            regex: `heroName\\s*:\\s*string\\s*=\\s*["']CodeKnight["'][\\s\\S]*xpPoints\\s*:\\s*number\\s*=\\s*100`,
          },
          {
            name: "Type Inference & Arrays",
            slug: "type-inference-and-arrays",
            xp: 30,
            difficulty: "easy",
            content: `
              <h2>Arrays & Type Inference</h2>
              <p>In TypeScript, you can specify array types using <code>type[]</code> or <code>Array&lt;type&gt;</code> syntax.</p>
              <pre><code>const scores: number[] = [95, 88, 72];\nconst skills: string[] = ["HTML", "CSS", "TS"];</code></pre>
            `,
            task: `<p>Create an array named <code>languages</code> of type <code>string[]</code> containing at least <code>"TypeScript"</code> and <code>"JavaScript"</code>.</p>`,
            hint: `<p>Write <code>const languages: string[] = ["TypeScript", "JavaScript"];</code></p>`,
            starterCode: {
              "/index.ts": `// Define languages array\n\n`,
            },
            regex: `languages\\s*:\\s*string\\[\\]\\s*=\\s*\\[[\\s\\S]*"TypeScript"[\\s\\S]*"JavaScript"[\\s\\S]*\\]`,
          },
          {
            name: "Type Aliases",
            slug: "type-aliases",
            xp: 35,
            difficulty: "medium",
            content: `
              <h2>Creating Custom Types</h2>
              <p>The <code>type</code> keyword allows you to define custom type aliases for objects, unions, or primitives.</p>
              <pre><code>type UserID = string | number;\ntype Player = {\n  id: UserID;\n  name: string;\n  score: number;\n};</code></pre>
            `,
            task: `<p>Define a type alias <code>Coordinates</code> with properties <code>x: number</code> and <code>y: number</code>.</p>`,
            hint: `<p>Use <code>type Coordinates = { x: number; y: number; };</code></p>`,
            starterCode: {
              "/index.ts": `// Define Coordinates type\n\n`,
            },
            regex: `type\\s+Coordinates\\s*=\\s*\\{[\\s\\S]*x\\s*:\\s*number[\\s\\S]*y\\s*:\\s*number[\\s\\S]*\\}`,
          },
        ],
      },
      {
        id: 2,
        name: "Interfaces & Object Contracts",
        desc: "Define clean contracts for objects using TypeScript interfaces and optional properties.",
        exercises: [
          { name: "Defining Interfaces", slug: "defining-interfaces", xp: 30, difficulty: "easy" },
          { name: "Optional & Readonly Fields", slug: "optional-and-readonly", xp: 35, difficulty: "medium" },
          { name: "Extending Interfaces", slug: "extending-interfaces", xp: 40, difficulty: "medium" },
        ],
      },
      {
        id: 3,
        name: "Functions & Return Types",
        desc: "Type function arguments, return values, arrow functions, and optional parameters.",
        exercises: [
          { name: "Typed Function Parameters", slug: "typed-function-params", xp: 30, difficulty: "easy" },
          { name: "Return Type Annotations", slug: "return-type-annotations", xp: 35, difficulty: "medium" },
          { name: "Void & Never Types", slug: "void-and-never-types", xp: 35, difficulty: "medium" },
        ],
      },
      {
        id: 4,
        name: "Union Types & Type Guards",
        desc: "Handle multiple possibilities safely using unions, narrowing, and discriminated unions.",
        exercises: [
          { name: "Basic Union Types", slug: "basic-union-types", xp: 30, difficulty: "easy" },
          { name: "Type Narrowing with typeof", slug: "type-narrowing-typeof", xp: 35, difficulty: "medium" },
          { name: "Discriminated Unions", slug: "discriminated-unions", xp: 45, difficulty: "hard" },
        ],
      },
      {
        id: 5,
        name: "Generics & Reusable Code",
        desc: "Write adaptable, type-safe functions and data structures with TypeScript Generics.",
        exercises: [
          { name: "Generic Functions", slug: "generic-functions", xp: 40, difficulty: "medium" },
          { name: "Generic Interfaces", slug: "generic-interfaces", xp: 45, difficulty: "medium" },
          { name: "Generic Constraints", slug: "generic-constraints", xp: 50, difficulty: "hard" },
        ],
      },
      {
        id: 6,
        name: "Utility Types in Action",
        desc: "Leverage built-in TypeScript utilities like Partial, Pick, Omit, and Record.",
        exercises: [
          { name: "Partial & Required", slug: "partial-and-required", xp: 40, difficulty: "medium" },
          { name: "Pick & Omit", slug: "pick-and-omit", xp: 45, difficulty: "medium" },
          { name: "Record & Readonly", slug: "record-and-readonly", xp: 45, difficulty: "hard" },
        ],
      },
    ],
  },
  {
    courseId: 6,
    title: "Tailwind CSS Mastery",
    description: "Build modern, responsive, and beautiful user interfaces rapidly using utility-first CSS.",
    bannerImage: "/css-banner.gif",
    level: "Beginner",
    tags: "Tailwind",
    editorType: "static",
    chapters: [
      {
        id: 1,
        name: "Tailwind Fundamentals & Utility Workflow",
        desc: "Understand utility-first styling, class naming conventions, and instant preview styling.",
        exercises: [
          {
            name: "Style with Utility Classes",
            slug: "style-with-utility-classes",
            xp: 25,
            difficulty: "easy",
            content: `
              <h2>Welcome to Tailwind CSS!</h2>
              <p>Tailwind CSS is a utility-first CSS framework packed with classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code>, and <code>rotate-90</code> that can be composed to build any design directly in your markup.</p>
              <pre><code>&lt;div class="p-6 bg-slate-900 text-white rounded-xl shadow-lg"&gt;\n  &lt;h1 class="text-2xl font-bold"&gt;Hello Tailwind!&lt;/h1&gt;\n&lt;/div&gt;</code></pre>
            `,
            task: `<p>Create a <code>&lt;div&gt;</code> with classes <code>p-8 bg-indigo-600 text-white rounded-2xl</code> and an <code>&lt;h1&gt;</code> inside with <code>text-2xl font-bold</code> saying <strong>Welcome to CodeTree</strong>.</p>`,
            hint: `<p>Use <code>&lt;div class="p-8 bg-indigo-600 text-white rounded-2xl"&gt;&lt;h1 class="text-2xl font-bold"&gt;Welcome to CodeTree&lt;/h1&gt;&lt;/div&gt;</code></p>`,
            starterCode: {
              "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-slate-950 p-6 flex items-center justify-center min-h-screen">
  <!-- Add your styled card here -->

</body>
</html>`,
            },
            regex: `class="[^"]*p-8[^"]*bg-indigo-600[^"]*text-white[^"]*rounded-2xl[^"]*"[\\s\\S]*Welcome to CodeTree`,
          },
          {
            name: "Buttons & Color Palettes",
            slug: "buttons-and-colors",
            xp: 30,
            difficulty: "easy",
            content: `
              <h2>Styling Buttons in Tailwind</h2>
              <p>Combining padding, rounded corners, font weights, and hover background color utilities makes crafting buttons effortless.</p>
              <pre><code>&lt;button class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"&gt;\n  Click Me\n&lt;/button&gt;</code></pre>
            `,
            task: `<p>Build a button with classes <code>px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl</code> and text <strong>Get Started</strong>.</p>`,
            hint: `<p>Add <code>&lt;button class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"&gt;Get Started&lt;/button&gt;</code></p>`,
            starterCode: {
              "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-slate-900 p-8 flex items-center justify-center min-h-screen">
  <!-- Add your button here -->

</body>
</html>`,
            },
            regex: `px-6[\\s\\S]*py-3[\\s\\S]*bg-emerald-500[\\s\\S]*Get Started`,
          },
        ],
      },
      {
        id: 2,
        name: "Flexbox & Grid Layouts",
        desc: "Master layout alignment, direction, justify, gap, and multi-column CSS grids with Tailwind.",
        exercises: [
          { name: "Flex Alignment & Gap", slug: "flex-alignment-and-gap", xp: 30, difficulty: "easy" },
          { name: "Centering with Flexbox", slug: "centering-with-flexbox", xp: 30, difficulty: "easy" },
          { name: "Building a 3-Column Grid", slug: "building-3-column-grid", xp: 35, difficulty: "medium" },
        ],
      },
      {
        id: 3,
        name: "Responsive Design & Breakpoints",
        desc: "Use mobile-first responsive modifiers like sm:, md:, lg:, and xl: to build adaptive pages.",
        exercises: [
          { name: "Mobile-First Philosophy", slug: "mobile-first-philosophy", xp: 30, difficulty: "easy" },
          { name: "Responsive Stacking", slug: "responsive-stacking", xp: 35, difficulty: "medium" },
          { name: "Responsive Navigation Bar", slug: "responsive-navbar", xp: 45, difficulty: "hard" },
        ],
      },
      {
        id: 4,
        name: "Hover, Focus & Transitions",
        desc: "Add smooth animations, interactive states, focus outlines, and group-hover tricks.",
        exercises: [
          { name: "Smooth Color Transitions", slug: "smooth-transitions", xp: 30, difficulty: "easy" },
          { name: "Scale & Transform on Hover", slug: "scale-and-transform", xp: 35, difficulty: "medium" },
          { name: "Group-Hover Card Patterns", slug: "group-hover-cards", xp: 40, difficulty: "medium" },
        ],
      },
      {
        id: 5,
        name: "Building Modern UI Components",
        desc: "Synthesize everything into production-grade badges, pricing cards, and feature lists.",
        exercises: [
          { name: "Pill Badges & Status Indicators", slug: "pill-badges", xp: 35, difficulty: "easy" },
          { name: "Feature Card with Icon", slug: "feature-card-icon", xp: 40, difficulty: "medium" },
          { name: "SaaS Pricing Tier Card", slug: "saas-pricing-tier-card", xp: 50, difficulty: "hard" },
        ],
      },
    ],
  },
  {
    courseId: 7,
    title: "Python Fundamentals",
    description: "Learn Python programming: syntax, data structures, conditional logic, loops, functions, and algorithms.",
    bannerImage: "https://ik.imagekit.io/tubeguruji/Codebox/tumblr_3ebef054c877d03c507aa8c40149908b_515b1f92_1280.webp?updatedAt=1763406230994",
    level: "Beginner",
    tags: "Python",
    editorType: "vanilla",
    chapters: [
      {
        id: 1,
        name: "Introduction & Python Syntax",
        desc: "Write your first Python statements, learn clean indentation, and print messages to the console.",
        exercises: [
          {
            name: "Print Your First Message",
            slug: "print-first-message",
            xp: 20,
            difficulty: "easy",
            content: `
              <h2>Welcome to Python!</h2>
              <p>Python is known for its elegant, readable syntax. The <code>print()</code> function outputs text or variable values to the console.</p>
              <pre><code>print("Hello, World!")\nprint(42)</code></pre>
            `,
            task: `<p>Use <code>print("Hello, CodeTree!")</code> to output the greeting.</p>`,
            hint: `<p>Type <code>print("Hello, CodeTree!")</code></p>`,
            starterCode: {
              "/index.js": `// Output greeting to console\nconsole.log("Hello, CodeTree!");\n`,
            },
            regex: `Hello,\\s*CodeTree!`,
          },
          {
            name: "Variables & Calculations",
            slug: "variables-and-calculations",
            xp: 25,
            difficulty: "easy",
            content: `
              <h2>Python Variables</h2>
              <p>Variables store values without needing special declaration keywords.</p>
              <pre><code>x = 10\ny = 25\ntotal = x + y</code></pre>
            `,
            task: `<p>Define variable <code>width = 12</code> and <code>height = 5</code>, then calculate <code>area = width * height</code>.</p>`,
            hint: `<p>Calculate <code>area = width * height</code></p>`,
            starterCode: {
              "/index.js": `let width = 12;\nlet height = 5;\n// Calculate area\n`,
            },
            regex: `width\\s*\\*\\s*height`,
          },
        ],
      },
      {
        id: 2,
        name: "Lists, Dictionaries & Sets",
        desc: "Master Python's core data structures for storing sequences and key-value collections.",
        exercises: [
          { name: "List Indexing & Slicing", slug: "list-indexing-slicing", xp: 30, difficulty: "easy" },
          { name: "Dictionary Lookups", slug: "dictionary-lookups", xp: 35, difficulty: "medium" },
          { name: "Set Operations", slug: "set-operations", xp: 35, difficulty: "medium" },
        ],
      },
      {
        id: 3,
        name: "Conditionals & Logic",
        desc: "Control program flow with if, elif, else, logical operators, and comparison expressions.",
        exercises: [
          { name: "If-Else Conditionals", slug: "if-else-conditionals", xp: 25, difficulty: "easy" },
          { name: "Chained Comparisons", slug: "chained-comparisons", xp: 30, difficulty: "medium" },
          { name: "Ternary Expressions", slug: "ternary-expressions", xp: 35, difficulty: "medium" },
        ],
      },
      {
        id: 4,
        name: "Loops & Iterations",
        desc: "Repeat actions cleanly with for loops, while loops, range(), and list comprehensions.",
        exercises: [
          { name: "For Loops & range()", slug: "for-loops-range", xp: 30, difficulty: "easy" },
          { name: "While Loop Guards", slug: "while-loop-guards", xp: 35, difficulty: "medium" },
          { name: "List Comprehensions", slug: "list-comprehensions", xp: 40, difficulty: "hard" },
        ],
      },
      {
        id: 5,
        name: "Functions & Scope",
        desc: "Structure reusable logic using def, return statements, default parameters, and *args.",
        exercises: [
          { name: "Defining Functions", slug: "defining-functions", xp: 30, difficulty: "easy" },
          { name: "Default Arguments", slug: "default-arguments", xp: 35, difficulty: "medium" },
          { name: "Lambda Functions", slug: "lambda-functions", xp: 40, difficulty: "hard" },
        ],
      },
      {
        id: 6,
        name: "Object-Oriented Python",
        desc: "Create classes, methods, constructors (__init__), and understand inheritance.",
        exercises: [
          { name: "Creating a Class", slug: "creating-a-class", xp: 35, difficulty: "medium" },
          { name: "The __init__ Constructor", slug: "init-constructor", xp: 40, difficulty: "medium" },
          { name: "Class Inheritance", slug: "class-inheritance", xp: 45, difficulty: "hard" },
        ],
      },
    ],
  },
  {
    courseId: 8,
    title: "Next.js & Fullstack React",
    description: "Build production fullstack web applications with App Router, React Server Components, and API routes.",
    bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    level: "Intermediate",
    tags: "Next.js",
    editorType: "react",
    chapters: [
      {
        id: 1,
        name: "App Router & File System Routing",
        desc: "Understand the Next.js App Router, page.tsx conventions, and route segments.",
        exercises: [
          {
            name: "Your First App Route",
            slug: "your-first-app-route",
            xp: 25,
            difficulty: "easy",
            content: `
              <h2>Next.js App Router</h2>
              <p>In Next.js App Router, folders define route paths, and <code>page.tsx</code> defines the visible UI for that path.</p>
              <pre><code>export default function HomePage() {\n  return &lt;h1&gt;Welcome to Next.js&lt;/h1&gt;;\n}</code></pre>
            `,
            task: `<p>Export a default React component named <code>Dashboard</code> that returns an <code>&lt;h1&gt;</code> saying <strong>Next.js Dashboard</strong>.</p>`,
            hint: `<p>Write <code>export default function Dashboard() { return &lt;h1&gt;Next.js Dashboard&lt;/h1&gt;; }</code></p>`,
            starterCode: {
              "/App.js": `export default function Dashboard() {\n  return (\n    <div>\n      {/* Add your heading here */}\n    </div>\n  );\n}\n`,
            },
            regex: `Next\\.js Dashboard`,
          },
          {
            name: "Nested Layouts",
            slug: "nested-layouts",
            xp: 30,
            difficulty: "medium",
            content: `
              <h2>Shared Layouts</h2>
              <p>A layout is UI that is shared between multiple routes. Layouts preserve state and do not re-render upon navigation.</p>
              <pre><code>export default function Layout({ children }) {\n  return &lt;main class="p-6"&gt;{children}&lt;/main&gt;;\n}</code></pre>
            `,
            task: `<p>Create a layout that renders a <code>&lt;header&gt;</code> with <strong>App Header</strong> and wraps <code>{children}</code> inside <code>&lt;main&gt;</code>.</p>`,
            hint: `<p>Return <code>&lt;&gt;&lt;header&gt;App Header&lt;/header&gt;&lt;main&gt;{children}&lt;/main&gt;&lt;/&gt;</code></p>`,
            starterCode: {
              "/App.js": `export default function Layout({ children }) {\n  return (\n    <div>\n      {/* Render header and children */}\n    </div>\n  );\n}\n`,
            },
            regex: `App Header[\\s\\S]*\\{children\\}`,
          },
        ],
      },
      {
        id: 2,
        name: "Server vs Client Components",
        desc: "Master the boundary between React Server Components (RSC) and the 'use client' directive.",
        exercises: [
          { name: "Understanding Server Components", slug: "understanding-rsc", xp: 35, difficulty: "easy" },
          { name: "The 'use client' Boundary", slug: "use-client-boundary", xp: 35, difficulty: "medium" },
          { name: "Passing Server Data to Client", slug: "passing-server-data-to-client", xp: 40, difficulty: "hard" },
        ],
      },
      {
        id: 3,
        name: "Data Fetching & Caching",
        desc: "Learn async components, fetch caching strategies, revalidation, and loading states.",
        exercises: [
          { name: "Async Server Component Fetching", slug: "async-server-component-fetching", xp: 40, difficulty: "medium" },
          { name: "loading.tsx & Suspense", slug: "loading-tsx-suspense", xp: 35, difficulty: "medium" },
          { name: "Error Boundaries with error.tsx", slug: "error-boundaries", xp: 40, difficulty: "hard" },
        ],
      },
      {
        id: 4,
        name: "Server Actions & Mutations",
        desc: "Mutate backend data securely without writing explicit API boilerplate using Server Actions.",
        exercises: [
          { name: "Introduction to Server Actions", slug: "intro-server-actions", xp: 40, difficulty: "medium" },
          { name: "Form Submissions with Actions", slug: "form-submissions-actions", xp: 45, difficulty: "hard" },
          { name: "useActionState & Pending States", slug: "use-action-state", xp: 45, difficulty: "hard" },
        ],
      },
      {
        id: 5,
        name: "API Route Handlers",
        desc: "Build custom HTTP request handlers using NextRequest and NextResponse for REST/Webhooks.",
        exercises: [
          { name: "GET Route Handler", slug: "get-route-handler", xp: 35, difficulty: "easy" },
          { name: "POST Handler with JSON Body", slug: "post-handler-json", xp: 40, difficulty: "medium" },
          { name: "Query Parameters & Dynamic Segments", slug: "query-params-dynamic-segments", xp: 45, difficulty: "hard" },
        ],
      },
      {
        id: 6,
        name: "SEO, Metadata & Optimization",
        desc: "Configure dynamic metadata, OpenGraph tags, Image component optimization, and fonts.",
        exercises: [
          { name: "Static Metadata Object", slug: "static-metadata-object", xp: 30, difficulty: "easy" },
          { name: "Dynamic generateMetadata", slug: "dynamic-generate-metadata", xp: 40, difficulty: "medium" },
          { name: "Next.js Image Optimization", slug: "nextjs-image-optimization", xp: 35, difficulty: "medium" },
        ],
      },
    ],
  },
];

export async function seedCurriculum() {
  console.log("🌱 Starting curriculum seeding...");

  for (const course of NEW_COURSES) {
    console.log(`\n📚 Processing Course ${course.courseId}: "${course.title}"...`);

    // 1. Upsert course
    const existing = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseId, course.courseId));

    if (existing.length > 0) {
      await db
        .update(coursesTable)
        .set({
          title: course.title,
          description: course.description,
          bannerImage: course.bannerImage,
          level: course.level,
          tags: course.tags,
          editorType: course.editorType,
        })
        .where(eq(coursesTable.courseId, course.courseId));
      console.log(`  ✓ Updated course details for "${course.title}"`);
    } else {
      await db.insert(coursesTable).values({
        courseId: course.courseId,
        title: course.title,
        description: course.description,
        bannerImage: course.bannerImage,
        level: course.level,
        tags: course.tags,
        editorType: course.editorType,
      });
      console.log(`  ✓ Created course "${course.title}"`);
    }

    // 2. Upsert chapters
    for (const ch of course.chapters) {
      const existingCh = await db
        .select()
        .from(courseChaptersTable)
        .where(
          and(
            eq(courseChaptersTable.courseId, course.courseId),
            eq(courseChaptersTable.chapterId, ch.id)
          )
        );

      // Extract simplified exercises JSON for chapters table
      const chapterExercisesJson = ch.exercises.map((e) => ({
        name: e.name,
        slug: e.slug,
        xp: e.xp,
        difficulty: e.difficulty,
      }));

      if (existingCh.length > 0) {
        await db
          .update(courseChaptersTable)
          .set({
            name: ch.name,
            description: ch.desc,
            exercises: chapterExercisesJson,
          })
          .where(
            and(
              eq(courseChaptersTable.courseId, course.courseId),
              eq(courseChaptersTable.chapterId, ch.id)
            )
          );
        console.log(`    ↳ Updated Chapter ${ch.id}: "${ch.name}" (${ch.exercises.length} exercises)`);
      } else {
        await db.insert(courseChaptersTable).values({
          courseId: course.courseId,
          chapterId: ch.id,
          name: ch.name,
          description: ch.desc,
          exercises: chapterExercisesJson,
        });
        console.log(`    ↳ Inserted Chapter ${ch.id}: "${ch.name}" (${ch.exercises.length} exercises)`);
      }

      // 3. Seed rich interactive exercise data if provided
      for (const ex of ch.exercises) {
        if (ex.task || ex.starterCode) {
          const existingEx = await db
            .select()
            .from(exercisesTable)
            .where(
              and(
                eq(exercisesTable.courseId, course.courseId),
                eq(exercisesTable.chapterId, ch.id),
                eq(exercisesTable.exerciseId, ex.slug)
              )
            );

          const exerciseContentJson = {
            content: ex.content || `<p>${ex.name}</p>`,
            task: ex.task || `<p>Complete the exercise: ${ex.name}</p>`,
            hint: ex.hint || `<p>Review the concepts in the description tab.</p>`,
            starterCode: ex.starterCode || {},
            regex: ex.regex || "",
            output: "",
            hintXp: Math.round(ex.xp * 0.7),
          };

          if (existingEx.length > 0) {
            await db
              .update(exercisesTable)
              .set({
                exerciseName: ex.name,
                exercisesContent: exerciseContentJson,
              })
              .where(
                and(
                  eq(exercisesTable.courseId, course.courseId),
                  eq(exercisesTable.chapterId, ch.id),
                  eq(exercisesTable.exerciseId, ex.slug)
                )
              );
          } else {
            await db.insert(exercisesTable).values({
              courseId: course.courseId,
              chapterId: ch.id,
              exerciseId: ex.slug,
              exerciseName: ex.name,
              exercisesContent: exerciseContentJson,
            });
          }
        }
      }
    }
  }

  console.log("\n✅ Seeding complete! All courses, chapters, and exercises are ready.");
}

// Auto-run if executed directly via CLI
if (require.main === module || process.argv[1]?.includes("seed-curriculum")) {
  seedCurriculum()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    });
}
