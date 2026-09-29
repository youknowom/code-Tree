/**
 * Validates user code against exercise validation rules.
 * Supports regex rules, starter-code modification checks, and empty/unmodified checks.
 */

export interface ValidationRule {
  regex?: string;
  output?: string;
  task?: string;
}

export interface ValidationResult {
  passed: boolean;
  message?: string;
}

function normalizeCode(code: any): string {
  if (!code) return "";
  if (typeof code === "string") return code.trim();
  if (typeof code === "object") {
    // If it's a sandpack file map like { "/index.js": "..." }
    const values = Object.values(code);
    return values.length > 0 && typeof values[0] === "string"
      ? (values[0] as string).trim()
      : "";
  }
  return String(code).trim();
}

// Strip comments and whitespace to detect whether actual logic was written
function stripComments(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "") // JS/TS/CSS comments
    .replace(/#.*$/gm, "") // Python comments
    .replace(/<!--[\s\S]*?-->/gm, "") // HTML comments
    .replace(/\s+/g, "")
    .trim();
}

// Common boilerplate templates that should never pass as completed submissions
const BOILERPLATE_SIGNATURES = [
  "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
  "<!DOCTYPE html><html><body></body></html>",
  'export default function App() { return <h1>Hello</h1>; }',
  'export default function App() { return <div></div>; }',
  'console.log("TypeScript Ready!");',
];

export function validateCode(
  userCode: string,
  starterCode?: any,
  rules?: ValidationRule
): ValidationResult {
  const trimmedUser = (userCode || "").trim();
  const normalizedStarter = normalizeCode(starterCode);

  // 1. Check if user code is completely empty
  if (trimmedUser.length === 0) {
    return {
      passed: false,
      message: "Please write your code solution before submitting. The editor is currently empty.",
    };
  }

  // 2. Check if user code is purely unchanged starter code
  if (normalizedStarter.length > 0) {
    const userStripped = stripComments(trimmedUser);
    const starterStripped = stripComments(normalizedStarter);

    if (userStripped === starterStripped) {
      return {
        passed: false,
        message: "Please write your solution before submitting. Your code is still identical to the starter template.",
      };
    }
  }

  // 3. Check for trivial boilerplate or meaningless inputs
  const codeContentWithoutComments = stripComments(trimmedUser);
  if (codeContentWithoutComments.length < 8) {
    return {
      passed: false,
      message: "Your code appears too brief to be a valid solution. Please implement the requested challenge.",
    };
  }

  // Check if stripped code matches any standard empty boilerplate
  for (const bp of BOILERPLATE_SIGNATURES) {
    if (codeContentWithoutComments.toLowerCase() === stripComments(bp).toLowerCase()) {
      return {
        passed: false,
        message: "Please implement the requested challenge inside the editor before submitting.",
      };
    }
  }

  // 4. Check for untouched TODO placeholders if starter code had TODO
  if (
    normalizedStarter.toLowerCase().includes("todo") &&
    trimmedUser.toLowerCase().includes("todo") &&
    (trimmedUser.includes("pass") || trimmedUser.includes("// Write your") || trimmedUser.includes("# Write your"))
  ) {
    // If user left TODO and pass untouched
    const hasOnlyPass = /def\s+\w+\([^)]*\):\s*(?:"""[\s\S]*?"""\s*)?pass/.test(trimmedUser);
    if (hasOnlyPass) {
      return {
        passed: false,
        message: "Please replace the TODO and 'pass' statement with your actual implementation.",
      };
    }
  }

  // 5. If regex rule exists, test against user's code
  if (rules?.regex && rules.regex.trim().length > 0) {
    let pattern = rules.regex.trim();
    let flags = "m";

    // Handle (?i) inline case-insensitive flag
    if (pattern.startsWith("(?i)")) {
      flags += "i";
      pattern = pattern.substring(4);
    }

    try {
      const reg = new RegExp(pattern, flags);
      const matches = reg.test(trimmedUser);

      if (!matches) {
        return {
          passed: false,
          message: rules.output
            ? `Your code does not satisfy the requirements yet. Expected pattern: ${rules.output}`
            : "Your solution does not meet all task criteria yet. Double-check your function names, return values, and syntax.",
        };
      }
    } catch (e) {
      console.warn("Regex validation fallback:", e);
      if (
        rules.output &&
        !trimmedUser.toLowerCase().includes(rules.output.toLowerCase())
      ) {
        return {
          passed: false,
          message: "Check your code against the task requirements and try again.",
        };
      }
    }
  }

  // 6. Check task for required function identifiers if no regex is configured
  if (!rules?.regex && rules?.task) {
    // Extract code keywords from task, e.g. `compute_l2_norm(...)` or `calculate_mse`
    const codeMatches = rules.task.match(/<code>([a-zA-Z_][a-zA-Z0-9_]*)(?:\([^)]*\))?<\/code>/g);
    if (codeMatches && codeMatches.length > 0) {
      for (const m of codeMatches) {
        const identifier = m.replace(/<\/?code>/g, "").split("(")[0].trim();
        if (identifier && identifier.length > 2 && !["true", "false", "null", "none", "int", "str"].includes(identifier.toLowerCase())) {
          if (!trimmedUser.includes(identifier)) {
            return {
              passed: false,
              message: `Your code must define or use \`${identifier}\` as specified in the task description.`,
            };
          }
        }
      }
    }
  }

  return {
    passed: true,
  };
}

