import Link from "next/link";
import Github from "./GitHub";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="text-2xl text-blue-500 font-bold tracking-tight">
          Linkedin-bio
        </h1>
      </Link>
      <a
        className="flex max-w-fit items-center justify-center font-medium space-x-2 rounded-md border border-blue-500 bg-blue-100 px-4 py-2 text-sm text-blue-500 shadow-md transition-colors hover:bg-blue-500 hover:text-white"
        href="https://github.com/irfan-za/linkedin-bio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>GitHub</p>
      </a>
    </header>
  );
}
