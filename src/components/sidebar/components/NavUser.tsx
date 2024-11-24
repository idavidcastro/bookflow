import Image from "next/image";
import ivan from "@/assets/profile/ivan.jpg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function NavUser() {
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
                <AvatarImage src={ivan.src} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="grow">
              <p className="text-[16px] font-semibold text-start">
                Iván Castro
              </p>
              <p className="text-[12px] text-neutral-500 text-start">
                ivn@gmail.com
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
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between items-center">
            <Link
              href={"/dashboard/settings"}
              className="flex w-full justify-between items-center"
            >
              <span>Ajustes</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between items-center">
            <Link
              href={"/dashboard/help"}
              className="flex w-full justify-between items-center"
            >
              <span>Ayuda</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem style={{ color: "#dc2626" }}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
