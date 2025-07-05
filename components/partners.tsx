"use client";
import { motion } from "framer-motion";
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
  return (
    <div className="ml-4 mr-4">
      <div className="text-center text-xs sm:text-sm md:text-base text-white/95 mb-3 md:mb-6 max-w-md md:max-w-none mx-auto">
        Over 10+ Business Trust Us
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto w-[1000px] max-w-full"
      >
        <div className="overflow-hidden relative carousel-container">
          <div className="flex animate-scroll">
            {/* 第一组 */}
            {partners.map((partner, index) => (
              <div
                key={index}
                className="w-[120px] md:w-[150px] lg:w-[200px] flex-shrink-0 pl-3 md:pl-4 lg:pl-6"
              >
                <div className="flex h-[50px] items-center justify-center px-2 md:px-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-[24px] md:h-[30px] lg:h-[40px] w-auto max-w-[80px] md:max-w-[100px] object-contain"
                  />
                </div>
              </div>
            ))}
            {/* 第二组 */}
            {partners.map((partner, index) => (
              <div
                key={`duplicate-${index}`}
                className="w-[120px] md:w-[150px] lg:w-[200px] flex-shrink-0 pl-3 md:pl-4 lg:pl-6"
              >
                <div className="flex h-[50px] items-center justify-center px-2 md:px-4">
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

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .carousel-container::before,
        .carousel-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 80px;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }

        .carousel-container::before {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            transparent 100%
          );
        }

        .carousel-container::after {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            transparent 100%
          );
        }

        @media (min-width: 768px) {
          .carousel-container::before,
          .carousel-container::after {
            width: 120px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-container::before,
          .carousel-container::after {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};
