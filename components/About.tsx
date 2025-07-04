import aboutBg from "@/assets/images/aboutBg.png";
export default function About() {
  return (
    <div id="partners" className="py-16 md:py-24 bg-black">
      <div
        className="mb-6 w-[1200px] mx-auto max-w-full h-[360px] flex flex-col justify-center items-center text-left px-4"
        style={{
          backgroundImage: `url(${aboutBg.src})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-[50px] font-bold text-white text-center">
          About Us
        </h2>

        <p className="max-w-[800px] mx-auto text-sm md:text-lg font-medium text-white/75 mb-4 text-center leading-relaxed">
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
