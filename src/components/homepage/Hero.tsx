"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-[90vh] items-center gap-x-10">
      <div className="ml-20 font-monserrat">
        <p className="font-monserrat font-bold">
          LA MEJOR BIBLIOTECA QUE TENDRÁS
        </p>
        <br />
        <h1 className="font-spectral font-bold text-7xl">
          Organiza tus libros de la mejor manera
        </h1>
        <br />
        <p className="font-monserrat">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          voluptatem illo et eaque fugit! Modi sequi, possimus ipsum sed nam
          fugit nulla maxime consequatur officiis labore nemo non laudantium
          vitae.
        </p>
        <br />
        <div className="flex gap-x-2">
          {/* <OrangeButton
            text="Iniciar sesión"
            onClick={() => router.push("/login")}
          /> */}
          {/* <WhiteButton text="Regístrate" /> */}
          <Button type="submit" variant={"primary"}>
            Iniciar sesión
          </Button>
          <Button type="submit" variant={"primary"}>
            Regístrate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
