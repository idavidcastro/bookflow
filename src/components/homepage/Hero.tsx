"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import banner from "@/assets/home/hero.jpg";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-[90vh] items-center gap-x-10">
      <div className="ml-20 font-monserrat">
        <p className="font-monserrat font-bold">
          LA MEJOR BIBLIOTECA QUE TENDRÁS
        </p>
        <br />
        <h1 className="font-spectral font-bold text-7xl">BookFlow - App</h1>
        <br />
        <p className="font-monserrat">
          Con BookBlow, facilita la administración de tu biblioteca de manera
          sencilla. Controla libros, usuarios y préstamos en una plataforma
          fácil de usar, mejorando la organización de tu día a día. Ideal para
          bibliotecas que buscan una solución práctica y accesible.
        </p>
        <br />
        <div className="flex gap-x-2">
          <Link href="/auth/login" passHref>
            <Button variant="primary" className="ml-auto">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/auth/register" passHref>
            <Button
              variant="primary"
              className="ml-auto bg-white text-primary border border-primary hover:bg-primary hover:text-white"
            >
              Regístrate
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image src={banner} alt="banner" className="w-[500px] flex" />
      </div>
    </div>
  );
};

export default Hero;
