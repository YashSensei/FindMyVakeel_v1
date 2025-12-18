"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  containerClassName?: string;
}

export const Tooltip = ({
  children,
  content,
  containerClassName,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn("inline-block", containerClassName)}
      >
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-background p-4 shadow-lg"
          >
            <div className="text-sm">{content}</div>
            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-8 border-transparent border-t-border" />
            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 -translate-y-px border-[7px] border-transparent border-t-background" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
