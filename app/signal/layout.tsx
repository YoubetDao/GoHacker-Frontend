import Nav from "@/components/common/Nav";
import Footer from "@/components/common/footer";

export default function VirtualsTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url(/bg.png)",
        backgroundColor: "#0a0f1c", // 深色背景作为兜底
        fontFamily: "CenturyGothic, sans-serif",
      }}
    >
      <div className="relative max-w-[1440px] z-10 px-4 sm:px-3 md:px-8 lg:px-12 xl:px-20 mx-auto text-white pb-12">
        <Nav />
        {children}
        <Footer />
      </div>
    </div>
  );
}
