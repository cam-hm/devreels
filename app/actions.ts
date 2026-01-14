"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { PROJECTS } from "@/lib/data";
import { headers } from "next/headers";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

// Simple In-Memory Rate Limiter (Note: Resets on Cloud Run cold start/scaling)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function chatWithProject(query: string, projectId: string) {
    if (!apiKey) {
        return "Demo Mode: I cannot connect to Gemini without an API Key. Please add GOOGLE_API_KEY to .env.local.";
    }

    // RATE LIMITING
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 Minute
    const maxRequests = 5; // 5 messages per minute

    const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > windowMs) {
        record.count = 0;
        record.lastReset = now;
    }

    if (record.count >= maxRequests) {
        return "System Overload: Rate limit exceeded. Please wait a moment before sending more messages.";
    }

    record.count++;
    rateLimitMap.set(ip, record);

    // SECURITY: Fetch project data from trusted server source
    const projectContext = PROJECTS.find(p => p.id === projectId);

    if (!projectContext) {
        return "System Error: Project data corrupted or not found.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are the Lead Developer of the following project:
      
      Title: ${projectContext.title}
      Tech Stack: ${projectContext.tech.join(", ")}
      Description: ${projectContext.description}
      Internal Notes: ${projectContext.aiInsight}
      
      User Question: "${query}"
      
      Answer directly as the developer. Be technical but concise (max 2 sentences). 
      If the question is unrelated to the project, politely steer it back.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "System Error: Neural link unstable. Please try again.";
    }
}

// Fallback data if API is missing or fails
const FALLBACK_LOGS: Record<string, string[]> = {
    html: [
        "> [OFFLINE MODE] Generating Standard HTML5...",
        "> <header> injected.",
        "> <main> container created.",
        "> Semantic tags applied.",
    ],
    styling: [
        "> [OFFLINE MODE] Applying Default Theme...",
        "> Color: Blue-500",
        "> Font: Sans-Serif",
        "> Grid Layout: Verified",
    ]
};

export async function getGeminiThinking(stage: string): Promise<string[]> {
    if (!apiKey) {
        // Return standard dummy logs if no key
        console.warn("No GOOGLE_API_KEY found. Using fallback logs.");
        return FALLBACK_LOGS[stage] || ["> Processing stage: " + stage + "..."];
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are an advanced AI web architect.
      Generate 4-6 lines of highly technical, sci-fi style terminal log output
      for the web development stage: "${stage}".

      Requirements:
      - Use technical jargon (e.g., "DOM hydration", "CSSOM tree", "Vector rasterization").
      - Make it sound like a fast, futuristic system boot.
      - Return ONLY the lines, separated by newlines. No json, no formatting.
      - Prefix each line with "> ".
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split by newline and filter empty strings
        return text.split('\n').filter(line => line.trim().length > 0);

    } catch (error) {
        console.error("Gemini API Error:", error);
        return [
            "> [API ERROR] Connection unstable...",
            "> Falling back to local protocols...",
            ... (FALLBACK_LOGS[stage] || [])
        ];
    }
}

export async function getGeminiTheme() {
    if (!apiKey) return { color: "blue", hex: "#3b82f6", name: "Default Blue" };

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      Pick a sophisticated, minimalist color theme for a premium developer portfolio.

      Constraints:
      - NO neon colors, NO bright rainbows.
      - PREFER: Muted tones, warm grays, deep forest greens, navy blues, sandy beiges, charcoal.
      - Think "Architectural Digest", "Swiss Design", "Luxury Watch Brand".
      
      Return strictly a JSON object with:
      - "name": A classy name (e.g. "Obsidian", "Sandstone", "Midnight", "Fog").
      - "hex": The primary hex color code (should be subtle).
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Simple cleanup to ensure valid JSON
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("Gemini Theme Error", error);
        return { color: "blue", hex: "#3b82f6", name: "Fallback Blue" };
    }
}
