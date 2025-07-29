
import { GoogleGenAI } from "@google/genai";
import type { GeneratedContent } from '../../../type';
import { NextRequest, NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

async function generateScript(topic: string): Promise<string> {
    const prompt = `Generate an image for a social media video about "${topic}". The script should be suitable for a video under 60 seconds. Include scene descriptions, camera shot ideas, and a voiceover or dialogue. Format the output clearly with headings for scenes, visuals, and audio.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text!;
    } catch (error) {
        console.error("Error generating script:", error);
        throw new Error("Failed to generate script from API.");
    }
}

async function generateImages(topic: string): Promise<string[]> {
    const imagePrompt = `A cinematic, highly detailed, photorealistic image representing: "${topic}". Suitable for a viral social media video.`;
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: imagePrompt,
            config: {
                numberOfImages: 4,
                aspectRatio: '16:9',
                outputMimeType: 'image/jpeg',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return any images.");
        }
        
        return response.generatedImages.map(img => img?.image?.imageBytes!);

    } catch (error) {
        console.error("Error generating images:", error);
        throw new Error("Failed to generate images from API.");
    }
}

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const [script, images] = await Promise.all([
      generateScript(topic),
      generateImages(topic),
    ]);

    return NextResponse.json({ script, images });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}