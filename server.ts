import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// AI Counseling / Comfort Letter Route
app.post("/api/counseling", async (req, res) => {
  try {
    const { message, mood, history = [], type = "chat" } = req.body;

    const ai = getGeminiClient();

    let systemInstruction = `당신은 '마음 상담소'의 따뜻하고 다정한 '따뜻한 마음 상담원'입니다.
상대방의 지친 마음에 깊이 공감하고, 진심어린 따뜻함과 다정한 어조(존댓말)로 응원과 위로를 건네주세요.
과도하게 길지 않게, 마음을 편안하게 해주는 문장으로 이야기해주세요.`;

    if (type === "comfort-letter") {
      systemInstruction = `당신은 '마음 상담소'의 따뜻한 시인이자 상담사입니다.
작성자가 남긴 오늘의 일기나 감정 기록을 읽고, 그 마음을 고스란히 감싸안아 주는 한 편의 '따뜻한 위로 편지'를 작성해 주세요.
격려, 안아줌, 평온함을 느낄 수 있도록 다정하고 아름다운 한국어 문체로 작성해주세요.`;
    }

    if (ai) {
      const contents = [];
      if (mood) {
        contents.push({ role: "user", parts: [{ text: `현재 저의 기분/감정 상태: ${mood}` }] });
      }

      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }

      contents.push({
        role: "user",
        parts: [{ text: message || "제 이야기 들어주셔서 감사해요." }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      const reply = response.text || "당신의 마음을 깊이 응원합니다. 언제든 편하게 이야기를 들려주세요.";
      return res.json({ success: true, reply });
    } else {
      // Fallback response when GEMINI_API_KEY is not set
      let fallbackReply = "많이 지치고 힘드셨군요. 당신이 짊어진 마음의 짐을 제가 잠시라도 나눠 가질 수 있기를 바라요. 오늘 하루도 고생 참 많으셨어요.";
      if (type === "comfort-letter") {
        fallbackReply = `[마음 상담소의 위로 편지]

당신의 일기를 읽으며, 마음 한구석이 뭉클해졌습니다.
오늘 하루 지나온 시간 속에서 참 많은 마음을 버텨내느라 고생하셨어요.

잠시 모든 걱정을 내려놓고, 깊고 편안한 호흡을 내쉬어 보세요.
당신은 혼자가 아니며, 그 어떤 날의 모습이든 그 자체로 소중합니다.
오늘 밤은 온전히 당신만을 위해 다정해지는 시간이 되기를 응원할게요.`;
      }
      return res.json({ success: true, reply: fallbackReply, fallback: true });
    }
  } catch (error: any) {
    console.error("Counseling API Error:", error);
    res.status(500).json({
      success: false,
      error: "상담 메시지를 생성하는 중 오류가 발생했습니다.",
      reply: "당신의 이야기에 감사해요. 마음을 가다듬고 다시 한 번 소통해요.",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`마음 상담소 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
