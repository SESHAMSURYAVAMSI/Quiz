import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
    </main>
  );
}