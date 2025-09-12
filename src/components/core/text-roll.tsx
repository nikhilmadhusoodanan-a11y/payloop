
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const RollableCharacter = ({
  char,
  className,
}: {
  char: string;
  className?: string;
}) => {
  return (
    <div className="relative inline-block h-auto overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn("inline-block", className)}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const TextRoll = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className={cn("inline-block", className)}>
      {children.split("").map((char, i) => (
        <RollableCharacter key={`${char}-${i}`} char={char} />
      ))}
    </div>
  );
};
