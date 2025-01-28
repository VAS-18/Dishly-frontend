"use client";

import Link from "next/link";
import { motion as m } from "framer-motion";
import { ParticlesDemo } from "./Particles";
import { DarkParticlesDemo } from "./DarkParticles.jsx";
import { useTheme } from "next-themes";


export default function Hero() {

  const {theme} = useTheme();

  console.log(theme);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black transition-colors">

      {theme === 'light' ? (
        <ParticlesDemo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        />
      ): (
        <DarkParticlesDemo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      /> 
      )}
      
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <m.h1
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight dark:text-white transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <span className="text-orange-500">Dishly</span>
          </m.h1>

          <m.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-medium transition-colors pb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create🌱   Connect🤝   Culinate🧑‍🍳
          </m.p>
          <div className="button-container">
          <m.div
            className="flex gap-10 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Join the Kitchen
              </Link>
            </m.button>

            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="bg-gray-100 text-gray-800 font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition text-wrap"
              >
                Return to Kitchen
              </Link>
            </m.button>
          </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
