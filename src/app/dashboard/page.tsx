"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import banner from "@/assets/home/hero.jpg";

export default function Dashboard() {
  const router = useRouter();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.h1
            className="text-3xl font-bold  tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bienvenido a{" "}
            <span className="font-roboto text-primary">BookFlow</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Facilita la administración de tu biblioteca de una manera sencilla.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image src={banner} alt="banner" className="w-[300px] flex" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
