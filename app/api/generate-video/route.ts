// app/api/generate-video/route.ts

import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import type { Scene } from '../../../type';

interface ScriptScene {
  scene_description: string;
  voiceover: string;
}

interface ScriptStructure {
  scenes: ScriptScene[];
}

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

async function generateScript(topic: string): Promise<ScriptStructure> {
  const prompt = `Generate a short, engaging video script for a social media video about "${topic}". The script must be exactly 4 scenes long. For each scene, provide a detailed visual description suitable for an image generation AI, and a short voiceover text.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scenes: {
            type: Type.ARRAY,
            description: "An array of exactly 4 scenes for the video.",
            items: {
              type: Type.OBJECT,
              properties: {
                scene_description: {
                  type: Type.STRING,
                  description: "A detailed visual description of the scene for an image generation model. Should be visually rich and descriptive."
                },
                voiceover: {
                  type: Type.STRING,
                  description: "The voiceover narration for this scene. Keep it concise, under 25 words."
                }
              },
              required: ["scene_description", "voiceover"]
            }
          }
        },
        required: ["scenes"]
      }
    }
  });

  try {
    const jsonText = response?.text?.trim();
    const scriptData = JSON.parse(jsonText!) as ScriptStructure;
    if (!scriptData.scenes || scriptData.scenes.length === 0) {
      throw new Error("Generated script is empty or invalid.");
    }
    return scriptData;
  } catch (e) {
    console.error("Failed to parse script JSON:", e);
    throw new Error("Could not generate a valid script structure from the AI's response.");
  }
}

async function generateImage(prompt: string): Promise<string> {
  const fullPrompt = `${prompt}, cinematic, hyper-realistic, 8k, vibrant colors, epic lighting`;

  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: fullPrompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("Image generation failed to produce an image.");
  }

  const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
}

// ✅ Correct POST route handler
export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    console.log("Generating script for topic:", topic);

    const script = await generateScript(topic);

    const scenePromises = script.scenes.map(async (scene) => {
      const imageUrl = await generateImage(scene.scene_description);
      return {
        ...scene,
        imageUrl,
      };
    });

    const scenesWithImages = await Promise.all(scenePromises);
    return NextResponse.json(scenesWithImages);
  } catch (error: any) {
    console.error("Error in POST /api/generate-video:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500 }
    );
  }
}
