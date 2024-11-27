import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="pl-20 pr-20 flex items-center justify-between px-6 py-4 bg-white border shadow-lg font-monserrat font-bold h-[10vh]">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <span className="text-lg font-bold">yourBook</span>
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
        <Button variant={"primary"} className="ml-auto">
          Regístrate
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
