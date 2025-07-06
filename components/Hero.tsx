"use client";
import Button from "./common/Button";
import { ArrowRight } from "lucide-react";
import Starfield from "./Starfield";
// import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import { PartnersSection } from "./partners";
// import GlowBackground from "./GlowBackground";

export default function Hero() {
  const router = useRouter();
  return (
    <section
      id="home"
      className="pt-[180px] px-10 pb-10 xl:pb-[100px] h-screen flex flex-col justify-between items-center relative overflow-x-hidden"
    >
      {/* <GlowBackground /> */}
      <Starfield starCount={200} speed={0.3} className="absolute inset-0" />
      <div className="flex flex-col justify-center items-center gap-7.5">
        <div className="border border-[#FFFFFF1A] rounded-full p-2 font-semibold text-sm flex items-center gap-1 w-fit bg-[#110D11]">
          <div className="bg-gradient-to-r from-[#004FFF] to-[#8C00FF] rounded-full w-7 h-7 flex items-center justify-center text-sm">
            🏆
          </div>
          Virtuals Hackathon top 10 & BNB AI Hacker Winner
        </div>
        <h1 className="text-4xl font-bold max-w-[1200px] text-center text-white md:text-7xl">
          {/* <TypeAnimation
            sequence={["Follow the Builders. Find the Alpha.", 1000]}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={0}
          /> */}
          Follow the Builders. <br /> Find the Alpha.
        </h1>
        <div className="text-center text-lg max-w-[700px]  text-white/70 ">
          We identify real builders powering open-source projects—so investors
          gain signal, not noise, and developers get the credit they deserve.
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
