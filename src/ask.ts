import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const getDesc = async (id: string) => {
    const res = await fetch(`https://res.cloudinary.com/datcdiwco/video/upload/so_0/${id}.jpg`);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    const interaction = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { inlineData: { data: base64, mimeType: "image/jpeg" } },
        "Give a 2-4 word Title for this video frame, and a 2-3 word Category. Output in format: Title | Category"
      ]
    });
    
    console.log(`${id}:`, interaction.text);
  };
  
  await getDesc("all1_vpfm2r");
  await getDesc("vd2_vsa3t6");
  await getDesc("vd4_q18gjs");
}

main().catch(console.error);
