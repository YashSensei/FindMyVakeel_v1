"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Linkedin, Twitter } from "lucide-react";
import founderImage from "@/assets/founder_image_axsyn.jpg";

export function FounderCard() {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-gradient-to-br from-secondary/20 via-background to-primary/10 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full max-w-5xl h-auto rounded-xl p-6 sm:p-8 border">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          {/* Left Side - Image */}
          <CardItem translateZ="100" className="w-full md:w-2/5 flex-shrink-0">
            <img
              src={founderImage}
              height="400"
              width="400"
              className="h-64 sm:h-80 md:h-96 w-full object-cover rounded-xl group-hover/card:shadow-xl border border-primary/20"
              alt="Mehar Parnami - CEO & Founder of Axsyn Tech"
            />
          </CardItem>

          {/* Right Side - Details */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <CardItem
                translateZ="50"
                className="text-2xl sm:text-3xl font-bold text-foreground"
              >
                Mehar Parnami
              </CardItem>
              <CardItem
                translateZ="50"
                className="text-lg sm:text-xl font-semibold text-primary mt-1"
              >
                CEO & Founder
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed"
              >
                Leading Axsyn Tech with a vision to revolutionize legal accessibility for startups across India through innovative AI-powered solutions.
              </CardItem>
            </div>
            
            {/* Skills & Expertise */}
            <CardItem
              translateZ="60"
              className="space-y-3"
            >
              <h3 className="text-sm sm:text-base font-semibold text-foreground">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  Strategic Leadership
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  Technology Innovation
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  AI & Machine Learning
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  Business Development
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  LegalTech Disruption
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                  Product Strategy
                </span>
              </div>
            </CardItem>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <CardItem
                translateZ={20}
                as="a"
                href="https://www.linkedin.com/in/mehar-parnami-152594273/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 border border-primary/20 hover:border-primary/60"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </CardItem>
              <CardItem
                translateZ={20}
                as="a"
                href="https://x.com/meharparnami14"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-brand text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Follow on X
              </CardItem>
            </div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
