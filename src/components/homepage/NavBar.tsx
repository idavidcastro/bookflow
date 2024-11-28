import { IoBookSharp } from "react-icons/io5";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="pl-20 pr-20 flex items-center justify-between px-6 py-4 bg-white border shadow-lg font-monserrat font-bold h-[10vh]">
      <div className="flex gap-2 items-center">
        <div className="rounded-md h-8 w-8 bg-primary text-white font-[700] flex items-center justify-center">
          <IoBookSharp />
        </div>
        <div className="grow">
          <p className="text-xl font-semibold font-roboto">BookFlow</p>
        </div>
      </div>

      <div className="hidden md:flex space-x-6 text-sm">
        <a href="/home" className=" hover:text-primary">
          Inicio
        </a>
        <a href="/services" className="hover:text-primary">
          Servicios
        </a>
        <a href="/about" className="hover:text-primary">
          Nosotros
        </a>
        <a href="/contact" className="hover:text-primary">
          Contacto
        </a>
      </div>

      {/* Botones */}
      <div className="flex items-center space-x-4 text-sm">
        <Button variant={"primary"} className="ml-auto">
          Iniciar sesión
        </Button>
        <Button
          variant="primary"
          className="ml-auto bg-white text-primary border border-primary hover:bg-primary hover:text-white"
        >
          Regístrate
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
