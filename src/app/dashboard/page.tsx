"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);
  return <div>Home</div>;
}
