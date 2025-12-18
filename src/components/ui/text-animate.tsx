"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

type AnimationType =
  | "blur"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "fade"
  | "bounce";

type TextAnimateProps = {
  children: string;
  className?: string;
  animation?: AnimationType;
  by?: "word" | "character";
  duration?: number;
  staggerDelay?: number;
};

const animationVariants: Record<AnimationType, Variants> = {
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  bounce: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  },
};

export function TextAnimate({
  children,
  className,
  animation = "slideUp",
  by = "word",
  duration = 0.5,
  staggerDelay = 0.1,
}: TextAnimateProps) {
  const segments = by === "word" ? children.split(" ") : children.split("");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: staggerDelay,
      }}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={animationVariants[animation]}
          transition={{ duration }}
        >
          {segment}
          {by === "word" && index < segments.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}
