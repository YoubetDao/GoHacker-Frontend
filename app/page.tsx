import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Tools from "./_components/Tools";
import About from "./_components/About";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Hero />
      <Tools />
      <About />
      <Footer />
    </div>
  );
}
