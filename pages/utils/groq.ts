import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing env var from Groq ai");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const reqGroqAI = async (content: string) => {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  return res;
};
