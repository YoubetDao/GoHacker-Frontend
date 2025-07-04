"use client";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Image from "next/image";

// 导入图片
import animocaLogo from "@/assets/logos/animoca.png";
import openCampusLogo from "@/assets/logos/openCampus.png";
import socialLayerLogo from "@/assets/logos/socialLayer.png";
import virtualsLogo from "@/assets/logos/virtuals.png";
import cosetLogo from "@/assets/logos/cosetLogo.png";
import accordingWorkLogo from "@/assets/logos/accordingWork.png";
import superfluidLogo from "@/assets/logos/superfluid.png";
import openbuildLogo from "@/assets/logos/openbuild.png";
import bewaterLogo from "@/assets/logos/bewater.png";

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
  {
    name: "Superfluid",
    logo: superfluidLogo,
  },
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

export const PartnersSection = () => {
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
    <div className="ml-4 mr-4">
      <div className="text-center text-xs sm:text-sm md:text-base text-white/95 mb-3 md:mb-4 max-w-md md:max-w-none mx-auto">
        We&apos;re proud to work with industry leaders to deliver the best
        experience.
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto w-[1200px] max-w-full"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="w-[120px] md:w-[150px] lg:w-[200px] flex-shrink-0 pl-3 md:pl-4 lg:pl-6"
              >
                <div className="flex h-[60px] md:h-[80px] items-center justify-center p-2 md:p-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-[24px] md:h-[30px] lg:h-[40px] w-auto max-w-[80px] md:max-w-[100px] object-contain"
                  />
                </div>
              </div>
            ))}
            {partners.map((partner, index) => (
              <div
                key={`duplicate-${index}`}
                className="w-[120px] md:w-[150px] lg:w-[200px] flex-shrink-0 pl-3 md:pl-4 lg:pl-6"
              >
                <div className="flex h-[60px] md:h-[80px] items-center justify-center p-2 md:p-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-[24px] md:h-[30px] lg:h-[40px] w-auto max-w-[80px] md:max-w-[100px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
