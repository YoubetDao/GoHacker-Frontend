import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tools from "@/components/Tools";
import Footer from "@/components/Footer";
import { PartnersSection } from "@/components/partners";

export default function Home() {
  return (
    <div className="bg-black h-screen text-white">
      <Header />
      <Hero />
      <Tools />
      <PartnersSection />
      <Footer />
    </div>
  );
}
