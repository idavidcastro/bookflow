import React from "react";
import { IoBookSharp } from "react-icons/io5";

export default function NavHeader() {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className=" rounded-md h-8 w-8 bg-primary text-white font-[700] flex items-center justify-center">
        <IoBookSharp />
      </div>
      <div className="grow">
        <p className="text-xl font-semibold font-roboto">BookFlow</p>
      </div>
    </div>
  );
}
