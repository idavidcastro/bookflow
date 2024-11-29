"use client";
import React, { useEffect, useState } from "react";
import ivan from "@/assets/profile/ivan.jpg"; // Imagen por defecto si no hay avatar
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Info, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Cookies from "js-cookie";

export default function NavUser() {
  const router = useRouter();

  const [userData, setUserData] = useState<{
    name: string;
    lastName: string;
    email: string;
    photo?: string | null;
  }>({
    name: "Usuario",
    lastName: "Usuario",
    email: "Sin correo",
    photo: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          name: parsedUser.name || "Usuario",
          lastName: parsedUser.lastName || "Usuario",
          email: parsedUser.email || "Sin correo",
          photo: parsedUser.photo || null,
        });
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );

    if (confirmed) {
      localStorage.removeItem("user");
      Cookies.remove("user", { path: "/" });

      const { error } = await supabase.auth.signOut();

      if (!error) {
        router.push("/auth/login");
      } else {
        console.error("Error al cerrar sesión:", error.message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full p-2 h-[60px] items-center justify-start"
        >
          <div className="flex gap-2">
            <div className="avatar rounded-full h-10 w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
              <Avatar>
                {userData.photo ? (
                  <AvatarImage src={userData.photo} />
                ) : (
                  <AvatarImage src={ivan.src} /> // Imagen por defecto
                )}
                <AvatarFallback>
                  {userData.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grow">
              <p className="text-[16px] font-semibold text-start">
                {userData.name} {userData.lastName}
              </p>
              <p className="text-[12px] text-neutral-500 text-start">
                {userData.email}
              </p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between items-center">
            <Link
              href={"/dashboard/profile"}
              className="flex w-full justify-between items-center"
            >
              <span>Perfil</span>
              <DropdownMenuShortcut>
                <User className="w-[18px]" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between items-center">
            <Link
              href={"/dashboard/settings"}
              className="flex w-full justify-between items-center"
            >
              <span>Ajustes</span>
              <DropdownMenuShortcut>
                <Settings className="w-[18px]" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between items-center">
            <Link
              href={"/dashboard/help"}
              className="flex w-full justify-between items-center"
            >
              <span>Ayuda</span>
              <DropdownMenuShortcut>
                <Info className="w-[18px]" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          style={{ color: "#dc2626" }}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
