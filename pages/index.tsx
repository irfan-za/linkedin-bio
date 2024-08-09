import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { LangType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [lang, setLang] = useState<LangType>("Indonesia" as LangType);
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 3 professional Linkedin biographies with no hashtags and clearly labeled "1.", "2.", and "3.". Only return these 3 Linkedin bios, nothing else. Make sure each generated biography is less than 300 characters, has short sentences that are found in Linkedin bios, and feel free to use this context as well: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }
  and use language ${lang}.`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    try {
      if (bio === "") {
        toast.error("Silahkan masukkan pekerjaanmu", {
          style: {
            background: "#ff5d5d",
            color: "#fff",
          },
          icon: "❌",
        });
        setLoading(false);
        return;
      }
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await res.json();
      console.log(data);
      setGeneratedBios(data.content);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      scrollToBios();
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>LinkedIn Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="LinkedIn Bio Generator Logo"
        />
        <h1 className="text-3xl mt-6 max-w-[708px] font-bold text-slate-900">
          Bikin bio LinkedIn profesional <br />
          dengan bantuan AI ✨
        </h1>
        <div className="mt-7"></div>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Masukkan pekerjaanmu{" "}
              <span className="text-slate-500">(atau skill, minat, hobi)</span>.
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"misal: CEO Gojek"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Pilih bahasa.</p>
          </div>
          <div className="block">
            <DropDown lang={lang} setLang={(newLang) => setLang(newLang)} />
          </div>

          {!loading && (
            <button
              className="bg-blue-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-blue-600 w-full"
              onClick={(e) => generateBio(e)}
            >
              Bikin biomu &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-blue-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-blue-600 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Bio yang dihasilkan
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio berhasil disalin", {
                            style: {
                              background: "#78ffa0",
                              color: "#333",
                            },
                            icon: "📋",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
