import { db } from "@/config/db";
import { courseChaptersTable, coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Course 1: React Beginner Chapters
const REACT_CHAPTERS = [
  {
    id: 1,
    name: "Introduction to React",
    desc: "Learn the fundamentals of React and why it's the most popular UI library.",
    exercises: [
      {
        name: "What is React?",
        slug: "what-is-react",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Setup Your First React App",
        slug: "setup-react-app",
        xp: 25,
        difficulty: "easy",
      },
      { name: "JSX Basics", slug: "jsx-basics", xp: 30, difficulty: "easy" },
      {
        name: "Understanding Components",
        slug: "understanding-components",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Create Your First Component",
        slug: "first-component",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Component Rendering",
        slug: "component-rendering",
        xp: 20,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    name: "React Components",
    desc: "Master functional components and learn how to build reusable UI pieces.",
    exercises: [
      {
        name: "Functional Components",
        slug: "functional-components",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Component Props",
        slug: "component-props",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Props Destructuring",
        slug: "props-destructuring",
        xp: 25,
        difficulty: "medium",
      },
      {
        name: "Children Props",
        slug: "children-props",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Default Props",
        slug: "default-props",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "PropTypes Validation",
        slug: "proptypes-validation",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 3,
    name: "State Management",
    desc: "Learn how to manage and update component state with useState hook.",
    exercises: [
      {
        name: "Introduction to State",
        slug: "intro-to-state",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "useState Hook",
        slug: "usestate-hook",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Updating State",
        slug: "updating-state",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Multiple State Variables",
        slug: "multiple-state",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "State with Objects",
        slug: "state-with-objects",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "State with Arrays",
        slug: "state-with-arrays",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 4,
    name: "Event Handling",
    desc: "Handle user interactions and events in React applications.",
    exercises: [
      {
        name: "Click Events",
        slug: "click-events",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Form Events",
        slug: "form-events",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Event Object",
        slug: "event-object",
        xp: 25,
        difficulty: "medium",
      },
      {
        name: "Passing Arguments",
        slug: "passing-arguments",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Prevent Default",
        slug: "prevent-default",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Event Delegation",
        slug: "event-delegation",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 5,
    name: "Conditional Rendering",
    desc: "Learn different ways to conditionally render components and elements.",
    exercises: [
      {
        name: "If-Else Rendering",
        slug: "if-else-rendering",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Ternary Operator",
        slug: "ternary-operator",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Logical AND Operator",
        slug: "logical-and",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Switch Statements",
        slug: "switch-statements",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Multiple Conditions",
        slug: "multiple-conditions",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Conditional Styles",
        slug: "conditional-styles",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 6,
    name: "Lists and Keys",
    desc: "Render lists of data and understand the importance of keys in React.",
    exercises: [
      {
        name: "Rendering Lists",
        slug: "rendering-lists",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Map Function",
        slug: "map-function",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Understanding Keys",
        slug: "understanding-keys",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "List with State",
        slug: "list-with-state",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Filter Lists",
        slug: "filter-lists",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Nested Lists",
        slug: "nested-lists",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 7,
    name: "useEffect Hook",
    desc: "Master side effects and lifecycle methods with useEffect.",
    exercises: [
      {
        name: "Introduction to useEffect",
        slug: "intro-useeffect",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Dependency Array",
        slug: "dependency-array",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Cleanup Functions",
        slug: "cleanup-functions",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Fetching Data",
        slug: "fetching-data",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Multiple useEffects",
        slug: "multiple-useeffects",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "useEffect Best Practices",
        slug: "useeffect-best-practices",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 8,
    name: "Forms in React",
    desc: "Build and manage forms with controlled components.",
    exercises: [
      {
        name: "Controlled Inputs",
        slug: "controlled-inputs",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Multiple Inputs",
        slug: "multiple-inputs",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Form Submission",
        slug: "form-submission",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Form Validation",
        slug: "form-validation",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Checkboxes and Radios",
        slug: "checkboxes-radios",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Select Dropdowns",
        slug: "select-dropdowns",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 9,
    name: "Component Composition",
    desc: "Learn how to compose complex UIs from simple components.",
    exercises: [
      {
        name: "Component Hierarchy",
        slug: "component-hierarchy",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Container Components",
        slug: "container-components",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Presentational Components",
        slug: "presentational-components",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Compound Components",
        slug: "compound-components",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Render Props",
        slug: "render-props",
        xp: 50,
        difficulty: "hard",
      },
      {
        name: "Higher Order Components",
        slug: "hoc",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 10,
    name: "Context API",
    desc: "Share state across components without prop drilling.",
    exercises: [
      {
        name: "Creating Context",
        slug: "creating-context",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Context Provider",
        slug: "context-provider",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "useContext Hook",
        slug: "usecontext-hook",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Multiple Contexts",
        slug: "multiple-contexts",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Context Best Practices",
        slug: "context-best-practices",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Theme Context Example",
        slug: "theme-context",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 11,
    name: "Custom Hooks",
    desc: "Create reusable logic with custom React hooks.",
    exercises: [
      {
        name: "What are Custom Hooks",
        slug: "what-are-custom-hooks",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Creating Custom Hooks",
        slug: "creating-custom-hooks",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "useLocalStorage Hook",
        slug: "uselocalstorage-hook",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "useFetch Hook",
        slug: "usefetch-hook",
        xp: 50,
        difficulty: "hard",
      },
      {
        name: "useToggle Hook",
        slug: "usetoggle-hook",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Custom Hook Patterns",
        slug: "custom-hook-patterns",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 12,
    name: "React Best Practices",
    desc: "Learn best practices for writing clean and maintainable React code.",
    exercises: [
      {
        name: "File Structure",
        slug: "file-structure",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Component Naming",
        slug: "component-naming",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Performance Optimization",
        slug: "performance-optimization",
        xp: 50,
        difficulty: "hard",
      },
      {
        name: "Memo and Callback",
        slug: "memo-callback",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Error Boundaries",
        slug: "error-boundaries",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Code Splitting",
        slug: "code-splitting",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
];

// Course 2: HTML Chapters (Already exists, kept for reference)
const HTML_CHAPTERS = [
  {
    id: 1,
    name: "Introduction to HTML",
    desc: "Discover the foundation of every webpage and learn how HTML shapes the digital world.",
    exercises: [
      {
        name: "Explore the Web Skeleton",
        slug: "explore-the-web-skeleton",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Build Your Base Camp",
        slug: "build-your-base-camp",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Name Your World",
        slug: "name-your-world",
        xp: 15,
        difficulty: "easy",
      },
      {
        name: "Break & Repair",
        slug: "break-and-repair",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "HTML Detective",
        slug: "html-detective",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Element Collector",
        slug: "element-collector",
        xp: 25,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    name: "HTML Boilerplate",
    desc: "Understand the core structure that every HTML document begins with.",
    exercises: [
      {
        name: "Build the Core Structure",
        slug: "build-the-core-structure",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Fix the Broken Blueprint",
        slug: "fix-the-broken-blueprint",
        xp: 30,
        difficulty: "easy",
      },
      {
        name: "Boost Meta Power",
        slug: "boost-meta-power",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Add Language Identity",
        slug: "add-language-identity",
        xp: 10,
        difficulty: "easy",
      },
      {
        name: "Viewport Setup",
        slug: "viewport-setup",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Author Credit",
        slug: "author-credit",
        xp: 15,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    name: "Head & Body Tags",
    desc: "Learn the difference between behind-the-scenes metadata and visible page content.",
    exercises: [
      {
        name: "Mind vs Body",
        slug: "mind-vs-body",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Title Power", slug: "title-power", xp: 20, difficulty: "easy" },
      {
        name: "Meta Charset",
        slug: "meta-charset",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Link Stylesheet",
        slug: "link-stylesheet",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Script Placement",
        slug: "script-placement",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 4,
    name: "Text Content Tags",
    desc: "Format text with headings, paragraphs, and inline elements.",
    exercises: [
      {
        name: "Heading Hierarchy",
        slug: "heading-hierarchy",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Paragraph Power",
        slug: "paragraph-power",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Bold & Italic",
        slug: "bold-italic",
        xp: 20,
        difficulty: "easy",
      },
      { name: "Line Breaks", slug: "line-breaks", xp: 15, difficulty: "easy" },
      {
        name: "Preformatted Text",
        slug: "preformatted-text",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Inline vs Block",
        slug: "inline-vs-block",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 5,
    name: "Lists & Tables",
    desc: "Organize data with ordered lists, unordered lists, and tables.",
    exercises: [
      {
        name: "Unordered Lists",
        slug: "unordered-lists",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Ordered Lists",
        slug: "ordered-lists",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Nested Lists",
        slug: "nested-lists",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Description Lists",
        slug: "description-lists",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Basic Tables",
        slug: "basic-tables",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Table Headers & Footers",
        slug: "table-headers-footers",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 6,
    name: "Links & Images",
    desc: "Connect pages with links and add visual content with images.",
    exercises: [
      { name: "Anchor Tags", slug: "anchor-tags", xp: 25, difficulty: "easy" },
      {
        name: "External Links",
        slug: "external-links",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Internal Links",
        slug: "internal-links",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Image Tags", slug: "image-tags", xp: 25, difficulty: "easy" },
      {
        name: "Image Alt Text",
        slug: "image-alt-text",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Image Links",
        slug: "image-links",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 7,
    name: "Forms & Input",
    desc: "Create interactive forms to collect user data.",
    exercises: [
      {
        name: "Form Structure",
        slug: "form-structure",
        xp: 30,
        difficulty: "medium",
      },
      { name: "Text Inputs", slug: "text-inputs", xp: 25, difficulty: "easy" },
      {
        name: "Checkboxes & Radio",
        slug: "checkboxes-radio",
        xp: 30,
        difficulty: "medium",
      },
      { name: "Dropdowns", slug: "dropdowns", xp: 25, difficulty: "easy" },
      { name: "Textareas", slug: "textareas", xp: 20, difficulty: "easy" },
      {
        name: "Form Submission",
        slug: "form-submission",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 8,
    name: "Divs & Spans",
    desc: "Master container elements for layout and styling.",
    exercises: [
      {
        name: "Understanding Divs",
        slug: "understanding-divs",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Nested Divs",
        slug: "nested-divs",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Span Elements",
        slug: "span-elements",
        xp: 20,
        difficulty: "easy",
      },
      { name: "Div vs Span", slug: "div-vs-span", xp: 25, difficulty: "easy" },
      {
        name: "Class Attributes",
        slug: "class-attributes",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "ID Attributes",
        slug: "id-attributes",
        xp: 20,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 9,
    name: "Iframe & Embed",
    desc: "Embed external content like videos and maps into your pages.",
    exercises: [
      {
        name: "Basic Iframe",
        slug: "basic-iframe",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "YouTube Embed",
        slug: "youtube-embed",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Google Maps",
        slug: "google-maps",
        xp: 30,
        difficulty: "medium",
      },
      { name: "Embed Tag", slug: "embed-tag", xp: 25, difficulty: "easy" },
      { name: "Object Tag", slug: "object-tag", xp: 30, difficulty: "medium" },
      {
        name: "Iframe Attributes",
        slug: "iframe-attributes",
        xp: 25,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 10,
    name: "Semantic HTML",
    desc: "Use meaningful HTML5 elements for better structure and accessibility.",
    exercises: [
      {
        name: "Header Element",
        slug: "header-element",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Nav Element", slug: "nav-element", xp: 25, difficulty: "easy" },
      {
        name: "Main Element",
        slug: "main-element",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Section Element",
        slug: "section-element",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Article Element",
        slug: "article-element",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Footer Element",
        slug: "footer-element",
        xp: 20,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 11,
    name: "Audio & Video",
    desc: "Add multimedia content to enhance your web pages.",
    exercises: [
      { name: "Audio Tag", slug: "audio-tag", xp: 30, difficulty: "medium" },
      {
        name: "Audio Controls",
        slug: "audio-controls",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Video Tag", slug: "video-tag", xp: 30, difficulty: "medium" },
      {
        name: "Video Controls",
        slug: "video-controls",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Multiple Sources",
        slug: "multiple-sources",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Fallback Content",
        slug: "fallback-content",
        xp: 25,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 12,
    name: "HTML Best Practices",
    desc: "Learn industry standards and best practices for writing clean HTML.",
    exercises: [
      {
        name: "Code Indentation",
        slug: "code-indentation",
        xp: 20,
        difficulty: "easy",
      },
      { name: "Comments", slug: "comments", xp: 15, difficulty: "easy" },
      {
        name: "Accessibility Basics",
        slug: "accessibility-basics",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "SEO Friendly HTML",
        slug: "seo-friendly-html",
        xp: 35,
        difficulty: "medium",
      },
      { name: "Validation", slug: "validation", xp: 30, difficulty: "medium" },
      {
        name: "Performance Tips",
        slug: "performance-tips",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
];

// Course 3: CSS Chapters
const CSS_CHAPTERS = [
  {
    id: 1,
    name: "Introduction to CSS",
    desc: "Learn the basics of CSS and how to style your HTML elements.",
    exercises: [
      { name: "What is CSS?", slug: "what-is-css", xp: 20, difficulty: "easy" },
      {
        name: "Inline Styles",
        slug: "inline-styles",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Internal Styles",
        slug: "internal-styles",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "External Stylesheets",
        slug: "external-stylesheets",
        xp: 30,
        difficulty: "medium",
      },
      { name: "CSS Syntax", slug: "css-syntax", xp: 20, difficulty: "easy" },
      {
        name: "CSS Comments",
        slug: "css-comments",
        xp: 15,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    name: "CSS Selectors",
    desc: "Master different types of selectors to target HTML elements.",
    exercises: [
      {
        name: "Element Selectors",
        slug: "element-selectors",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Class Selectors",
        slug: "class-selectors",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "ID Selectors",
        slug: "id-selectors",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Descendant Selectors",
        slug: "descendant-selectors",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Attribute Selectors",
        slug: "attribute-selectors",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Pseudo-classes",
        slug: "pseudo-classes",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 3,
    name: "Colors and Backgrounds",
    desc: "Apply colors and background styles to your elements.",
    exercises: [
      {
        name: "Color Property",
        slug: "color-property",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Background Color",
        slug: "background-color",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Color Values",
        slug: "color-values",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Background Images",
        slug: "background-images",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Background Position",
        slug: "background-position",
        xp: 30,
        difficulty: "medium",
      },
      { name: "Gradients", slug: "gradients", xp: 40, difficulty: "hard" },
    ],
  },
  {
    id: 4,
    name: "Text Styling",
    desc: "Format and style text content with various CSS properties.",
    exercises: [
      { name: "Font Family", slug: "font-family", xp: 25, difficulty: "easy" },
      { name: "Font Size", slug: "font-size", xp: 20, difficulty: "easy" },
      { name: "Font Weight", slug: "font-weight", xp: 20, difficulty: "easy" },
      {
        name: "Text Alignment",
        slug: "text-alignment",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Text Decoration",
        slug: "text-decoration",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Text Transform",
        slug: "text-transform",
        xp: 25,
        difficulty: "easy",
      },
    ],
  },
  {
    id: 5,
    name: "Box Model",
    desc: "Understand the CSS box model and how spacing works.",
    exercises: [
      {
        name: "Understanding Box Model",
        slug: "understanding-box-model",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Padding Property",
        slug: "padding-property",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Margin Property",
        slug: "margin-property",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Border Property",
        slug: "border-property",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Width and Height",
        slug: "width-height",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Box Sizing", slug: "box-sizing", xp: 35, difficulty: "medium" },
    ],
  },
  {
    id: 6,
    name: "Display and Positioning",
    desc: "Control how elements are displayed and positioned on the page.",
    exercises: [
      {
        name: "Display Property",
        slug: "display-property",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Inline vs Block",
        slug: "inline-vs-block",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Position Static",
        slug: "position-static",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Position Relative",
        slug: "position-relative",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Position Absolute",
        slug: "position-absolute",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Position Fixed",
        slug: "position-fixed",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 7,
    name: "Flexbox Layout",
    desc: "Master Flexbox for creating flexible and responsive layouts.",
    exercises: [
      {
        name: "Introduction to Flexbox",
        slug: "intro-flexbox",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Flex Container",
        slug: "flex-container",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Flex Direction",
        slug: "flex-direction",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Justify Content",
        slug: "justify-content",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Align Items",
        slug: "align-items",
        xp: 35,
        difficulty: "medium",
      },
      { name: "Flex Wrap", slug: "flex-wrap", xp: 40, difficulty: "hard" },
    ],
  },
  {
    id: 8,
    name: "Grid Layout",
    desc: "Create complex 2D layouts with CSS Grid.",
    exercises: [
      {
        name: "Introduction to Grid",
        slug: "intro-grid",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Grid Template",
        slug: "grid-template",
        xp: 40,
        difficulty: "hard",
      },
      { name: "Grid Gap", slug: "grid-gap", xp: 30, difficulty: "medium" },
      { name: "Grid Areas", slug: "grid-areas", xp: 45, difficulty: "hard" },
      {
        name: "Auto Placement",
        slug: "auto-placement",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Responsive Grid",
        slug: "responsive-grid",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 9,
    name: "Responsive Design",
    desc: "Make your websites work beautifully on all screen sizes.",
    exercises: [
      {
        name: "Media Queries",
        slug: "media-queries",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Mobile First",
        slug: "mobile-first",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Breakpoints",
        slug: "breakpoints",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Responsive Units",
        slug: "responsive-units",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Viewport Units",
        slug: "viewport-units",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Responsive Images",
        slug: "responsive-images",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 10,
    name: "Transitions and Animations",
    desc: "Add motion and interactivity with CSS animations.",
    exercises: [
      {
        name: "CSS Transitions",
        slug: "css-transitions",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Transition Properties",
        slug: "transition-properties",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Keyframe Animations",
        slug: "keyframe-animations",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Animation Properties",
        slug: "animation-properties",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Transform Property",
        slug: "transform-property",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "3D Transforms",
        slug: "3d-transforms",
        xp: 50,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 11,
    name: "Advanced Selectors",
    desc: "Master advanced CSS selectors and combinators.",
    exercises: [
      {
        name: "Child Combinator",
        slug: "child-combinator",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Adjacent Sibling",
        slug: "adjacent-sibling",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "General Sibling",
        slug: "general-sibling",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Pseudo-elements",
        slug: "pseudo-elements",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "nth-child Selector",
        slug: "nth-child-selector",
        xp: 40,
        difficulty: "hard",
      },
      { name: "Specificity", slug: "specificity", xp: 45, difficulty: "hard" },
    ],
  },
  {
    id: 12,
    name: "CSS Best Practices",
    desc: "Learn best practices for writing maintainable and efficient CSS.",
    exercises: [
      {
        name: "Code Organization",
        slug: "code-organization",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Naming Conventions",
        slug: "naming-conventions",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "CSS Variables",
        slug: "css-variables",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Performance Tips",
        slug: "performance-tips",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Browser Compatibility",
        slug: "browser-compatibility",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "CSS Methodologies",
        slug: "css-methodologies",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
];

// Course 4: JavaScript Chapters
const JAVASCRIPT_CHAPTERS = [
  {
    id: 1,
    name: "Introduction to JavaScript",
    desc: "Learn the basics of JavaScript and start writing your first programs.",
    exercises: [
      {
        name: "What is JavaScript?",
        slug: "what-is-javascript",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Your First Program",
        slug: "first-program",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Console.log", slug: "console-log", xp: 20, difficulty: "easy" },
      {
        name: "Comments in JS",
        slug: "comments-js",
        xp: 15,
        difficulty: "easy",
      },
      { name: "Script Tags", slug: "script-tags", xp: 25, difficulty: "easy" },
      {
        name: "External Scripts",
        slug: "external-scripts",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 2,
    name: "Variables and Data Types",
    desc: "Understand variables and different data types in JavaScript.",
    exercises: [
      {
        name: "Variables with let",
        slug: "variables-let",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Variables with const",
        slug: "variables-const",
        xp: 25,
        difficulty: "easy",
      },
      { name: "Strings", slug: "strings", xp: 25, difficulty: "easy" },
      { name: "Numbers", slug: "numbers", xp: 25, difficulty: "easy" },
      { name: "Booleans", slug: "booleans", xp: 20, difficulty: "easy" },
      {
        name: "Null and Undefined",
        slug: "null-undefined",
        xp: 30,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 3,
    name: "Operators",
    desc: "Learn arithmetic, comparison, and logical operators.",
    exercises: [
      {
        name: "Arithmetic Operators",
        slug: "arithmetic-operators",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Assignment Operators",
        slug: "assignment-operators",
        xp: 20,
        difficulty: "easy",
      },
      {
        name: "Comparison Operators",
        slug: "comparison-operators",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Logical Operators",
        slug: "logical-operators",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Ternary Operator",
        slug: "ternary-operator",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Type Coercion",
        slug: "type-coercion",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 4,
    name: "Control Flow",
    desc: "Control program flow with conditional statements and loops.",
    exercises: [
      {
        name: "If Statement",
        slug: "if-statement",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "If-Else Statement",
        slug: "if-else-statement",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Else-If Chains",
        slug: "else-if-chains",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Switch Statement",
        slug: "switch-statement",
        xp: 30,
        difficulty: "medium",
      },
      { name: "For Loop", slug: "for-loop", xp: 30, difficulty: "medium" },
      { name: "While Loop", slug: "while-loop", xp: 30, difficulty: "medium" },
    ],
  },
  {
    id: 5,
    name: "Functions",
    desc: "Create reusable code blocks with functions.",
    exercises: [
      {
        name: "Function Declaration",
        slug: "function-declaration",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Function Expression",
        slug: "function-expression",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Arrow Functions",
        slug: "arrow-functions",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Function Parameters",
        slug: "function-parameters",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Return Values",
        slug: "return-values",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Scope and Closure",
        slug: "scope-closure",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 6,
    name: "Arrays",
    desc: "Work with arrays to store and manipulate lists of data.",
    exercises: [
      {
        name: "Creating Arrays",
        slug: "creating-arrays",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Array Methods",
        slug: "array-methods",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Array Iteration",
        slug: "array-iteration",
        xp: 35,
        difficulty: "medium",
      },
      { name: "Map Method", slug: "map-method", xp: 35, difficulty: "medium" },
      {
        name: "Filter Method",
        slug: "filter-method",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Reduce Method",
        slug: "reduce-method",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 7,
    name: "Objects",
    desc: "Master objects for organizing and structuring data.",
    exercises: [
      {
        name: "Object Literals",
        slug: "object-literals",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Object Properties",
        slug: "object-properties",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Object Methods",
        slug: "object-methods",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "This Keyword",
        slug: "this-keyword",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Object Destructuring",
        slug: "object-destructuring",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Object Spread",
        slug: "object-spread",
        xp: 35,
        difficulty: "medium",
      },
    ],
  },
  {
    id: 8,
    name: "DOM Manipulation",
    desc: "Interact with HTML elements using the Document Object Model.",
    exercises: [
      {
        name: "Selecting Elements",
        slug: "selecting-elements",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Changing Content",
        slug: "changing-content",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Changing Styles",
        slug: "changing-styles",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Adding Elements",
        slug: "adding-elements",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "Removing Elements",
        slug: "removing-elements",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Event Listeners",
        slug: "event-listeners",
        xp: 40,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 9,
    name: "Asynchronous JavaScript",
    desc: "Handle asynchronous operations with callbacks, promises, and async/await.",
    exercises: [
      { name: "setTimeout", slug: "settimeout", xp: 30, difficulty: "medium" },
      { name: "Callbacks", slug: "callbacks", xp: 35, difficulty: "medium" },
      { name: "Promises", slug: "promises", xp: 45, difficulty: "hard" },
      {
        name: "Promise Chaining",
        slug: "promise-chaining",
        xp: 45,
        difficulty: "hard",
      },
      { name: "Async/Await", slug: "async-await", xp: 50, difficulty: "hard" },
      {
        name: "Error Handling",
        slug: "error-handling",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
  {
    id: 10,
    name: "ES6+ Features",
    desc: "Learn modern JavaScript features from ES6 and beyond.",
    exercises: [
      {
        name: "Template Literals",
        slug: "template-literals",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Default Parameters",
        slug: "default-parameters",
        xp: 25,
        difficulty: "easy",
      },
      {
        name: "Rest Parameters",
        slug: "rest-parameters",
        xp: 30,
        difficulty: "medium",
      },
      {
        name: "Spread Operator",
        slug: "spread-operator",
        xp: 35,
        difficulty: "medium",
      },
      { name: "Classes", slug: "classes", xp: 40, difficulty: "hard" },
      { name: "Modules", slug: "modules", xp: 45, difficulty: "hard" },
    ],
  },
  {
    id: 11,
    name: "Working with APIs",
    desc: "Fetch and work with data from external APIs.",
    exercises: [
      { name: "Fetch API", slug: "fetch-api", xp: 40, difficulty: "hard" },
      {
        name: "JSON Parsing",
        slug: "json-parsing",
        xp: 35,
        difficulty: "medium",
      },
      {
        name: "GET Requests",
        slug: "get-requests",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "POST Requests",
        slug: "post-requests",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Error Handling",
        slug: "api-error-handling",
        xp: 40,
        difficulty: "hard",
      },
      { name: "API Project", slug: "api-project", xp: 50, difficulty: "hard" },
    ],
  },
  {
    id: 12,
    name: "JavaScript Best Practices",
    desc: "Write clean, maintainable, and efficient JavaScript code.",
    exercises: [
      { name: "Code Style", slug: "code-style", xp: 25, difficulty: "easy" },
      { name: "Debugging", slug: "debugging", xp: 35, difficulty: "medium" },
      {
        name: "Error Prevention",
        slug: "error-prevention",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Performance Tips",
        slug: "js-performance-tips",
        xp: 45,
        difficulty: "hard",
      },
      {
        name: "Security Basics",
        slug: "security-basics",
        xp: 40,
        difficulty: "hard",
      },
      {
        name: "Code Organization",
        slug: "js-code-organization",
        xp: 45,
        difficulty: "hard",
      },
    ],
  },
];

export async function GET() {
  try {
    // Get all existing courses with their titles
    const existingCourses = await db
      .select({ courseId: coursesTable.courseId, title: coursesTable.title })
      .from(coursesTable);

    console.log("Existing courses:", existingCourses);

    const results = [];
    let totalChapters = 0;

    // Map courses to their chapter structures
    const courseChapterMap: { [key: number]: any[] } = {
      1: REACT_CHAPTERS,
      2: HTML_CHAPTERS,
      3: CSS_CHAPTERS,
      4: JAVASCRIPT_CHAPTERS,
    };

    for (const course of existingCourses) {
      const courseId = course.courseId;
      const chapters = courseChapterMap[courseId];

      if (!chapters) {
        console.log(`No chapter structure defined for course ${courseId}`);
        continue;
      }

      // Delete existing chapters for this course
      await db
        .delete(courseChaptersTable)
        .where(eq(courseChaptersTable.courseId, courseId));

      // Insert new chapters
      const chaptersToInsert = chapters.map((chapter) => ({
        courseId: courseId,
        chapterId: chapter.id,
        name: chapter.name,
        description: chapter.desc,
        exercises: chapter.exercises,
      }));

      await db.insert(courseChaptersTable).values(chaptersToInsert);

      results.push({
        courseId,
        courseTitle: course.title,
        chaptersAdded: chapters.length,
      });
      totalChapters += chapters.length;
    }

    return NextResponse.json({
      success: true,
      message: "All courses seeded with appropriate chapter structures",
      results,
      totalChaptersInserted: totalChapters,
    });
  } catch (error) {
    console.error("Error seeding chapters:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed chapters",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
