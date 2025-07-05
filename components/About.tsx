import aboutBg from "@/assets/images/aboutBg.png";
import aboutSvg from "@/assets/svg/about.svg";
import Image from "next/image";

export default function About() {
  return (
    <div id="about" className="py-16 md:py-24 bg-black">
      <div
        className="mb-6 w-[1200px] mx-auto max-w-full h-[360px] flex flex-col justify-center px-15 text-left"
        style={{
          backgroundImage: `url(${aboutBg.src})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex gap-4 items-center mb-3 md:mb-10 ">
          <h2 className="text-xl md:text-2xl lg:text-[50px] font-bold text-white text-center">
            About Us
          </h2>
          <Image src={aboutSvg} alt="about" />
        </div>

        <p className="text-sm md:text-lg font-semibold text-white/75 mb-4 leading-relaxed">
          We&apos;re a team of Web3 builders on a mission to create fair
          incentives for open-source contributors. Our background spans Apache,
          CNCF, Linux Foundation, and top companies like Alibaba Cloud,
          ByteDance, Tencent — with academic roots at NUS, UC Berkeley, Harvard,
          SJTU, and HIT.
        </p>
      </div>
    </div>
  );
}
