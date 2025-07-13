import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured. Please set the API_KEY environment variable." },
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const { topic } = await req.json();
    if (!topic) {
        return NextResponse.json(
            { error: "Topic is required" },
            { status: 400 }
        );
    }

    const prompt = `Generate a short, engaging video script for a social media video about "${topic}". The script should be suitable for a video under 60 seconds. Include scene descriptions, camera shot ideas, and a voiceover or dialogue. Format the output clearly with headings for scenes, visuals, and audio.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ script: response.text });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate script due to an internal server error." },
      { status: 500 }
    );
  }
}
