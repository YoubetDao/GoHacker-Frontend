"use client";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Image from "next/image";

// 导入图片
import animocaLogo from "@/assets/logos/animoca.png";
import openCampusLogo from "@/assets/logos/openCampus.png";
import openbuildLogo from "@/assets/logos/openbuild.svg";
import socialLayerLogo from "@/assets/logos/social_layer.svg";
import virtualsLogo from "@/assets/logos/virtuals.svg";
import bewaterLogo from "@/assets/logos/bewater.jpeg";
import cosetLogo from "@/assets/logos/coset.svg";
import accordingWorkLogo from "@/assets/logos/accordingWork.png";

const partners = [
  {
    name: "Animoca",
    logo: animocaLogo,
  },
  {
    name: "Coset",
    logo: cosetLogo,
  },
  {
    name: "OpenCampus",
    logo: openCampusLogo,
  },
  {
    name: "Openbuild",
    logo: openbuildLogo,
  },
  {
    name: "Social Layer",
    logo: socialLayerLogo,
  },
  // {
  //   name: 'Superfluid',
  //   logo: superfluidLogo,
  // },
  {
    name: "Virtuals",
    logo: virtualsLogo,
  },
  {
    name: "bewater",
    logo: bewaterLogo,
  },
  {
    name: "According.Work",
    logo: accordingWorkLogo,
  },
];

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    skipSnaps: false,
  });

  useEffect(() => {
    let autoplay: NodeJS.Timeout;
    if (emblaApi) {
      const startAutoplay = () => {
        autoplay = setInterval(() => {
          emblaApi.scrollNext();
        }, 2000); // 每2秒滚动一次
      };

      const stopAutoplay = () => {
        clearInterval(autoplay);
      };

      // 开始自动播放
      startAutoplay();

      // 当用户手动操作时暂停自动播放
      emblaApi.on("pointerDown", stopAutoplay);
      emblaApi.on("pointerUp", startAutoplay);
    }

    return () => clearInterval(autoplay);
  }, [emblaApi]);
  return (
    <div id="partners" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4  text-2xl font-bold  text-white md:text-4xl">
            About Us
          </h2>

          <p className="text-center max-w-[800px] mx-auto text-lg font-medium text-white/75  mb-4">
            We’re a team of Web3 builders on a mission to create fair incentives
            for open-source contributors. Our background spans Apache, CNCF,
            Linux Foundation, and top companies like Alibaba Cloud, ByteDance,
            Tencent — with academic roots at NUS, UC Berkeley, Harvard, SJTU,
            and HIT.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="text-lg font-bold text-white mb-4">
            Trusted by crypto leaders
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px]"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="w-[150px] flex-shrink-0 pl-4 md:w-[200px] md:pl-6"
                  >
                    <div className="flex h-[80px] items-center justify-center p-4">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-[40px] w-auto max-w-[100px] object-contain"
                      />
                    </div>
                  </div>
                ))}
                {/* 复制一遍内容以确保无缝循环 */}
                {partners.map((partner, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="w-[150px] flex-shrink-0 pl-4 md:w-[200px] md:pl-6"
                  >
                    <div className="flex h-[80px] items-center justify-center p-4">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-[30px] w-auto max-w-[100px] object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
