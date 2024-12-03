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
import { Settings } from "lucide-react";
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setType(parsedUser.role);
      } catch {
        setType(storedUser);
      }
    }
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
    <div className="fixed flex flex-col  w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <NavHeader />
      </div>
      <div className="grow mt-4">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {views.map((view, key) => (
              <CommandItem key={key} className="flex gap-2 cursor-pointer ">
                <Link href={view.to} className="flex gap-2">
                  <span className="text-primary">{view.icon}</span>
                  {view.title}
                </Link>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex">
        <NavUser />
      </div>
    </div>
  );
}
