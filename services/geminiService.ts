
import { GoogleGenAI, Type } from "@google/genai";
import { AdInput, AdCopy } from "../types";

export const generateAdCopy = async (input: AdInput): Promise<AdCopy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Generate three different styles of advertisement copy for the following product:
    Product Name: ${input.productName}
    Target Audience: ${input.targetAudience}
    Key Features: ${input.keyFeatures}
    
    Please provide:
    1) A Professional style (formal, authoritative, trustworthy).
    2) A Fun/Casual style (witty, relatable, friendly).
    3) An Urgent/Sales-focused style (scarcity, strong call-to-action, energetic).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class advertising copywriter specialized in conversion-driven ad copy for social media and search ads. You always deliver structured, high-quality copy.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            professional: {
              type: Type.STRING,
              description: "Professional and formal advertisement copy.",
            },
            casual: {
              type: Type.STRING,
              description: "Fun, relatable, and casual advertisement copy.",
            },
            urgent: {
              type: Type.STRING,
              description: "High-urgency, sales-focused advertisement copy with strong CTA.",
            },
          },
          required: ["professional", "casual", "urgent"],
        },
      },
    });

    const resultText = response.text || "{}";
    return JSON.parse(resultText) as AdCopy;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate ad copy. Please check your API key and try again.");
  }
};
