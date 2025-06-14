import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import Partners from "@/components/partners";
import Problems from "@/components/Problems";
import Tools from "@/components/Tools";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-black h-screen text-white">
      <Header />
      <Hero />
      <Problems />
      <Tools />
      {/* <Partners /> */}
      <Footer />
    </div>
  );
}
