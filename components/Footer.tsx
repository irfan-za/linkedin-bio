import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex  justify-center items-center px-3 space-y-3 sm:mb-0 mb-3">
      <p>
        Powered by{" "}
        <a
          href="https://groq.com"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-500 hover:underline transition underline-offset-2"
        >
          Groq AI
        </a>
        {" | "}
        Developed by{" "}
        <a
          href="https://portfolio-irfan-za.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-500 hover:underline transition underline-offset-2"
        >
          irfan-za
        </a>
      </p>
    </footer>
  );
}
