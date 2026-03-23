
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userPrompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "Конфигурация API не завершена. Пожалуйста, свяжитесь с владельцем.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text;
    return text || "Извините, я не смог сформулировать ответ. Попробуйте еще раз.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Обработка специфической ошибки ключа
    if (error.message?.includes("entity was not found")) {
      return "Ошибка авторизации API. Пожалуйста, проверьте ключ доступа.";
    }
    return "Произошла ошибка при связи с ИИ. Свяжитесь с нами напрямую через WhatsApp.";
  }
};
