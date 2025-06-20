"use client";
import Button from "./common/Button";
import { ArrowRight } from "lucide-react";
import Starfield from "./Starfield";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="pt-[180px] px-10 pb-[100px] h-screen flex flex-col justify-center items-center relative">
      <Starfield starCount={200} speed={0.3} className="absolute inset-0" />
      <div className="text-center text-sm  text-white bg-[#814ac8] px-4 py-2 rounded-full mb-4">
        Virtuals Hackathon top 10
      </div>
      <h1 className="text-4xl font-bold max-w-[900px] text-center text-white md:text-6xl">
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
        <Button className="flex items-center gap-1">
          Go to App <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="secondary">Contact Us</Button>
      </div>
    </section>
  );
}
