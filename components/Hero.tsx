"use client";
import Button from "./common/Button";
import { ArrowRight } from "lucide-react";
import Starfield from "./Starfield";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import { PartnersSection } from "./partners";
import Orb from "./Orb";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="pt-[180px] px-10 pb-[100px] h-screen flex flex-col justify-between items-center relative overflow-x-hidden">
      <Starfield starCount={200} speed={0.3} className="absolute inset-0" />
      <div className="absolute w-full h-[500px]">
        <Orb />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <div className="border border-[#FFFFFF1A] rounded-full p-2 font-semibold text-sm flex items-center gap-1 mb-4 w-fit">
          <div className="bg-[#8C29FF] rounded-[30px] px-2 h-7 w-fit flex items-center justify-center">
            🏆
          </div>
          Virtuals Hackathon top 10 & BNB AI Hacker Winner
        </div>
        <h1 className="text-4xl font-bold max-w-[1200px] text-center text-white md:text-7xl">
          <TypeAnimation
            sequence={["Turn Open Source Activity Into Investment Alpha", 1000]}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={0}
          />
        </h1>
        <div className="text-center text-lg max-w-[700px] font-medium text-white/75 mt-4 mb-6">
          We surface real builders behind Web3 projects so investors can make
          better decisions and developers can gain fair recognition.
        </div>
        <div className="flex gap-4 z-10">
          <Button
            className="flex items-center gap-1"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Go to App <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              window.open(
                "https://www.youtube.com/watch?v=Dg1T8BpR5Kc",
                "_blank"
              );
            }}
          >
            Watch Demo
          </Button>
        </div>
      </div>

      <PartnersSection />
    </section>
  );
}
