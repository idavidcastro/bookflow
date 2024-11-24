"use client";
import React, { useEffect, useState } from "react";
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
import NavUser from "./components/NavUser";
import NavHeader from "./components/NavHeader";
import { View } from "@/models";
import { adminRoutes } from "@/config/admin.routes";
import { userRoutes } from "@/config/user.routes";

export default function SideBar() {
  const [views, setViews] = useState<View[]>([]);
  const [type, setType] = useState<string | null>(null);
  useEffect(() => {
    const storedType = localStorage.getItem("type");
    setType(storedType);
  }, []);

  useEffect(() => {
    if (type === "admin") {
      setViews(adminRoutes);
    } else if (type === "user") {
      setViews(userRoutes);
    } else {
      setViews([]);
    }
  }, [type]);

  return (
    <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <NavHeader />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {views.map((view, key) => (
              <CommandItem key={key} className="flex gap-2 cursor-pointer">
                <Link href={view.to} className="flex gap-2">
                  <span className="text-primary">{view.icon}</span>
                  {view.title}
                </Link>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>

      {/* <div>
        <Link href="/dashboard/inventory" className="flex items-center gap-2">
          <Settings />
          <span>Inventario</span>
        </Link>
        </div> */}
      <div className="flex">
        <NavUser />
      </div>
    </div>
  );
}
