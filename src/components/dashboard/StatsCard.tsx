"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string;
}

const StatsCard = ({
  title,
  value,
}: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-purple-500/40
        hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-10
          right-0
          h-32
          w-32
          rounded-full
          bg-purple-500/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-purple-500/20
        "
      />

      <div className="relative z-10">
        
        <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
          {title}
        </p>

        <h2 className="mt-4 text-5xl font-black text-white">
          {value}
        </h2>
      </div>
    </motion.div>
  );
};

export default StatsCard;