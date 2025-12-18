"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-b from-secondary/20 to-background font-sans md:px-10 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 lg:px-10 relative">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            How It Works
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Your Journey With Us
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From problem to solution in three simple steps
          </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-24 md:pb-32">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:gap-12 md:pt-40 group"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg border-2 border-primary/20 md:left-3 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                <div className="h-6 w-6 rounded-full bg-gradient-brand shadow-inner" />
              </div>
              <h3 className="hidden text-2xl font-bold text-muted-foreground md:block md:pl-20 md:text-4xl lg:text-5xl group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="mb-6 p-6 md:p-8 bg-background/80 backdrop-blur rounded-2xl border-2 border-border hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="mb-6 block text-left text-2xl md:text-3xl font-bold text-foreground md:hidden">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[3px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8 rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};
