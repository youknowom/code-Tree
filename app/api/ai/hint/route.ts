import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/authHelper";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { exerciseName, task, content, userCode, language, requestType } =
      await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Prompt engineering for coding mentor (Socratic tutor)
    const systemPrompt = `You are CodeTree AI, an expert, encouraging coding mentor and AI/ML tutor.
Your goal is to guide the student to understand concepts and write the code themselves.
RULES:
1. NEVER output the complete final answer directly.
2. Provide a clear, actionable hint or explain where the bug in their code is.
3. If they asked for a hint, give a step-by-step conceptual clue with a small illustrative example.
4. If their code has a syntax or logical bug, pinpoint the line or concept causing the issue.
5. Keep explanations concise, professional, and friendly (max 2-3 short paragraphs).
6. Format your response in clean markdown with inline code backticks where appropriate.`;

    const userPrompt = `
Exercise: ${exerciseName || "Coding Challenge"}
Language / Runtime: ${language || "Python"}
Task Requirements:
${task || "No explicit task provided."}

Conceptual Context:
${content ? content.replace(/<[^>]*>?/gm, "").slice(0, 500) : "N/A"}

Student's Current Code in Editor:
\`\`\`
${userCode || "// Student has not written code yet."}
\`\`\`

Request Type: ${requestType || "hint"} (e.g. 'hint', 'debug', 'explain')
Please provide a helpful, Socratic coaching hint to help the student make progress.`;

    if (apiKey) {
      // Call Google Gemini API (gemini-1.5-flash or gemini-2.0-flash)
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't generate a hint right now. Please review the task description.";

        return NextResponse.json({
          success: true,
          hint: aiText,
          source: "gemini-api",
        });
      } else {
        const errData = await response.text();
        console.warn("Gemini API call returned non-200:", errData);
      }
    }

    // Fallback Intelligent Tutor if GEMINI_API_KEY is not configured yet
    const fallbackHint = generateContextualFallbackHint(
      exerciseName,
      task,
      userCode,
      requestType
    );

    return NextResponse.json({
      success: true,
      hint: fallbackHint,
      source: "local-tutor",
      notice: !apiKey
        ? "Tip: Add GEMINI_API_KEY to your .env to unlock real-time Gemini AI tutoring."
        : undefined,
    });
  } catch (error: any) {
    console.error("AI Hint Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI hint", details: error.message },
      { status: 500 }
    );
  }
}

function generateContextualFallbackHint(
  name?: string,
  task?: string,
  code?: string,
  requestType: string = "hint"
): string {
  const cleanTask = task ? task.replace(/<[^>]*>?/gm, "").trim() : "";
  const trimmedCode = (code || "").trim();

  if (requestType === "debug") {
    return `🐞 **Common Pitfalls & Debugging Checklist for ${name || "this challenge"}**\n\n1. **Return vs Print:** Ensure your function returns the calculated value instead of merely printing it with \`print()\` or \`console.log()\`.
2. **Data Types:** Check if the task expects float precision (e.g. \`float(val)\`) or integer rounding.
3. **Empty / Edge Inputs:** Does your logic handle empty arrays or single-element inputs without throwing division-by-zero errors?
4. **Variable Naming:** Double check function signatures and parameter names against the task tab.`;
  }

  if (requestType === "explain") {
    return `🧠 **Concept Deep-Dive: ${name || "Core Principles"}**\n\n**Goal:** ${cleanTask || "Implement the requested algorithm."}\n\n**Why it matters in modern computing & AI:**
Algorithms must balance computational efficiency (vectorization, SIMD) with numerical stability. By breaking the task into clean, modular steps (input validation → vectorized transformation → aggregation), you write production-grade, testable code.`;
  }

  if (trimmedCode.length === 0 || trimmedCode.length < 15) {
    return `💡 **Getting Started Clue**\n\nBegin by reviewing the task: **${cleanTask}**.\n\nStart by defining the required function, class, or structure. Pay special attention to variable names and return types required by the challenge.`;
  }

  return `💡 **Socratic Guiding Clue for ${name || "this challenge"}**\n\nTake a close look at the requirement: *${cleanTask}*.\n\nKey steps to consider:\n1. Are you performing the calculation element-wise or aggregating?\n2. Ensure your output matches the exact format specified in the task tab.\n3. Run your code in the sandbox preview to inspect immediate output before submitting!`;
}

