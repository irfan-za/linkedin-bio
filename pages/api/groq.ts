import { reqGroqAI } from "../../utils/groq";

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
    return new Response(
      JSON.stringify({
        bios: chatCompletion.choices[0]?.message?.content || "",
      }),
      {
        headers: new Headers({
          "Cache-Control": "no-cache",
        }),
      }
    );
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

export default handler;
