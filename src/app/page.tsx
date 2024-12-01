import Image from "next/image";
import banner from "@/assets/home/hero.jpg";
import Hero from "@/components/homepage/Hero";
import NavBar from "@/components/homepage/NavBar";

export default function Home() {
  return (
    <div>
      <div className=" relative z-10">
        <NavBar />
        <Hero />
      </div>
    </div>
  );
}
