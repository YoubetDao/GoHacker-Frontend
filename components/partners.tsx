import Image from "next/image";
import accordingLogo from "../assets/accordingWork.png";
import virtualLogo from "../assets/virtuals.svg";

const partners = [
  {
    name: "According.Work",
    image: accordingLogo,
  },
  {
    name: "Virtual",
    image: virtualLogo,
  },
];

export default function Partners() {
  return (
    <div className="py-25 px-10 bg-black">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-4xl font-bold max-w-[1000px] text-center text-white md:text-6xl">
          Our Partners
        </div>
        <div className="flex flex-wrap gap-10 mt-10">
          {partners.map((partner) => (
            <Image
              key={partner.name}
              src={partner.image}
              alt={partner.name}
              width={200}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
