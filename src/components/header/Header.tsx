"use client";
import React, { useState } from "react";
import { CommandDemo } from "../../common/command/Command";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

export default function Header() {
  const [notification, setNotification] = useState<any>([
    { text: "Thsi is a notf", date: "24/11/24", read: true },
    { text: "Thsi is another notf", date: "24/11/24", read: false },
  ]);
  return (
    <div className="flex gap-4 p-4 border-b justify-end">
      <div className=" ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* <Button className="relative" variant="outline" size="icon">
              <div
                className={`absolute -top-1 -right-1 h-3 w-3 rounded-full my-1 ${
                  notification.find((x: any) => x.read === true)
                    ? "bg-green-500"
                    : "bg-neutral-200"
                }`}
              ></div>
              <BellIcon className="h-4 w-4" />
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {notification.map((item: any, key: number) => (
              <DropdownMenuItem
                key={key}
                className="p-1 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2"
              >
                <div
                  className={`h-3 w-3 rounded-full my-1 ${
                    !item.read ? "bg-green-500" : "bg-neutral-200"
                  }`}
                ></div>
                <div>
                  <p>{item.text}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
