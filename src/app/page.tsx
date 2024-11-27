import Image from "next/image";
import banner from "@/assets/home/banner.png";
import Hero from "@/components/homepage/Hero";
import NavBar from "@/components/homepage/NavBar";

export default function Home() {
  return (
    <div className="relative">
      <Image
        src={banner}
        alt="banner"
        className="w-[100vh] h-auto absolute bottom-0 right-0 z-[-1]"
      />
      <div className=" relative z-10">
        <NavBar />
        <Hero />
      </div>
    </div>
  );
}
