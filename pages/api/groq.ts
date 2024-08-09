import { reqGroqAI } from "../utils/groq";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response("Tidak ada prompt yang dikirim", { status: 400 });
  }

  try {
    const chatCompletion = await reqGroqAI(prompt);
    return Response.json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" });
  }
};

export default handler;
