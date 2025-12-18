/**
 * @author: @dorian_baffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2, Scale, FileText, TrendingUp, type LucideIcon } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
    icon?: LucideIcon;
}

export default function CardFlip({
    title = "Design Systems",
    subtitle = "Explore the fundamentals",
    description = "Dive deep into the world of modern UI/UX design.",
    features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
    icon: Icon = Scale,
}: CardFlipProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full max-w-[380px] h-[420px] mx-auto group [perspective:2000px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={cn(
                    "relative w-full h-full",
                    "[transform-style:preserve-3d]",
                    "transition-all duration-700",
                    isFlipped
                        ? "[transform:rotateY(180deg)]"
                        : "[transform:rotateY(0deg)]"
                )}
            >
                {/* Front of card */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(0deg)]",
                        "overflow-hidden rounded-2xl",
                        "bg-white dark:bg-zinc-900",
                        "border-2 border-zinc-200 dark:border-zinc-800",
                        "shadow-lg dark:shadow-xl",
                        "transition-all duration-700",
                        "group-hover:shadow-2xl dark:group-hover:shadow-2xl",
                        "group-hover:border-primary/50",
                        isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-br from-secondary/20 via-background to-primary/5">
                        {/* Icon Section */}
                        <div className="flex-1 flex items-center justify-center pt-8 pb-4">
                            <div className="relative w-28 h-28 bg-gradient-brand rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                {Icon && <Icon className="w-14 h-14 text-white" strokeWidth={2.5} />}
                            </div>
                        </div>
                        
                        {/* Text Section */}
                        <div className="px-6 pb-8 text-center space-y-3">
                            <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
                                {title}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {subtitle}
                            </p>
                            
                            {/* Hover indicator */}
                            <div className="pt-4 flex items-center justify-center gap-2 text-sm text-primary font-medium">
                                <Repeat2 className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                <span>Hover to explore</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                        "p-8 rounded-2xl",
                        "bg-gradient-to-br from-white via-secondary/10 to-primary/5 dark:from-zinc-900 dark:to-black",
                        "border-2 border-primary/30 dark:border-zinc-800",
                        "shadow-xl dark:shadow-2xl",
                        "flex flex-col",
                        "transition-all duration-700",
                        "group-hover:shadow-2xl dark:group-hover:shadow-2xl",
                        "group-hover:border-primary/60",
                        !isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    {/* Header with icon */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-primary/20">
                        <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            {Icon && <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground leading-tight">
                                {title}
                            </h3>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 flex-1">
                        {features.map((feature, index) => (
                            <div
                                key={feature}
                                className="flex items-start gap-3 text-sm text-foreground transition-all duration-500"
                                style={{
                                    transform: isFlipped
                                        ? "translateX(0)"
                                        : "translateX(-10px)",
                                    opacity: isFlipped ? 1 : 0,
                                    transitionDelay: `${index * 100 + 200}ms`,
                                }}
                            >
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 text-primary" strokeWidth={3} />
                                </div>
                                <span className="leading-snug font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scale {
                    0% {
                        transform: scale(2);
                        opacity: 0;
                        box-shadow: 0px 0px 50px rgba(127, 200, 146, 0.5);
                    }
                    50% {
                        transform: translate(0px, -5px) scale(1);
                        opacity: 1;
                        box-shadow: 0px 8px 20px rgba(127, 200, 146, 0.5);
                    }
                    100% {
                        transform: translate(0px, 5px) scale(0.1);
                        opacity: 0;
                        box-shadow: 0px 10px 20px rgba(127, 200, 146, 0);
                    }
                }
            `}</style>
        </div>
    );
}
