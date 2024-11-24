import React from "react";
import UserItem from "./components/UserItem";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Settings, SquareLibrary, User } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/",
          icon: <SquareLibrary />,
          text: "Inventario",
        },
        {
          link: "/",
          icon: <User />,
          text: "Usuarios",
        },
      ],
    },
    {
      group: "Configuración",
      items: [
        {
          link: "/",
          text: "Perfil",
        },
        {
          link: "/",
          text: "Notificaciones",
        },
      ],
    },
  ];
  return (
    <div className="fixed flex flex-col gap-4 W-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <CommandItem
                    key={optionKey}
                    className="flex gap-2 cursor-pointer"
                  >
                    {option.icon}
                    {option.text}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>
        <Link href="/dashboard/inventory" className="flex items-center gap-2">
          <Settings />
          <span>Inventario</span>
        </Link>
      </div>
    </div>
  );
}
