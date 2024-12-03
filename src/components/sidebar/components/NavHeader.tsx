"use client";

import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { IoBookSharp } from "react-icons/io5";

export default function NavHeader() {
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

  console.log("tipo de usuario:", type);

  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="rounded-md h-10 w-10 bg-primary text-white font-[700] flex items-center justify-center">
        <IoBookSharp className="text-xl" />
      </div>
      <div className="grow">
        <p className="text-2xl font-semibold font-roboto">BookFlow</p>
      </div>

      <Badge
        className={`font-roboto font-normal text-[13px] ${
          type === "admin"
            ? "bg-green-500 text-white"
            : "bg-yellow-400 text-black"
        }`}
        variant="outline"
      >
        {type === "admin" ? "Admin" : "Usuario"}
      </Badge>
      <div></div>
    </div>
  );
}
