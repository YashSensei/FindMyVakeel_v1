import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackedBy from "@/components/BackedBy";
import SEO from "@/components/SEO";
import SmoothTab from "@/components/ui/smooth-tab";
import { Card } from "@/components/ui/card";
import { Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import JoinUsDialog from "@/components/JoinUsDialog";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip-card";
import { FounderCard } from "@/components/FounderCard";

const WaveformPath = () => (
  <motion.path
    d="M0 50 
       C 20 40, 40 30, 60 50
       C 80 70, 100 60, 120 50
       C 140 40, 160 30, 180 50
       C 200 70, 220 60, 240 50
       C 260 40, 280 30, 300 50
       C 320 70, 340 60, 360 50
       C 380 40, 400 30, 420 50
       L 420 100 L 0 100 Z"
    initial={false}
    animate={{
      x: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    }}
  />
);

const tabItems = [
  {
    id: "mission",
    title: "Mission",
    color: "bg-blue-500 hover:bg-blue-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-32"
            viewBox="0 0 420 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.5 }}
              className="fill-blue-500 stroke-blue-500"
              style={{ strokeWidth: 1 }}
            >
              <WaveformPath />
            </motion.g>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
              className="fill-blue-500 stroke-blue-500"
              style={{
                strokeWidth: 1,
                transform: "translateY(10px)",
              }}
            >
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-4 sm:p-6 md:p-8 h-full relative flex flex-col justify-center">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              We're building{" "}
              <Tooltip
                content={
                  <div>
                    <p className="font-semibold mb-2">Find My Vakeel</p>
                    <p className="text-xs text-muted-foreground">Our AI-powered platform that connects Indian startups and businesses with qualified legal professionals (vakeels) who specialize in their specific needs.</p>
                  </div>
                }
                containerClassName="text-muted-foreground"
              >
                <span className="font-semibold cursor-help border-b border-dotted border-muted-foreground/50">FindMyVakeel</span>
              </Tooltip>{" "}
              to make legal help in India simple, multilingual, and transparent—so anyone can get the right support, faster.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    title: "Problem",
    color: "bg-rose-500 hover:bg-rose-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-32"
            viewBox="0 0 420 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.5 }}
              className="fill-rose-500 stroke-rose-500"
              style={{ strokeWidth: 1 }}
            >
              <WaveformPath />
            </motion.g>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
              className="fill-rose-500 stroke-rose-500"
              style={{
                strokeWidth: 1,
                transform: "translateY(10px)",
              }}
            >
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-4 sm:p-6 md:p-8 h-full relative flex flex-col justify-center">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              The Problem
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Today, language barriers, opaque processes, and poor matching make legal help frustrating and slow. Many people struggle to find the right legal support due to communication challenges and lack of transparency.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "solution",
    title: "Solution",
    color: "bg-emerald-500 hover:bg-emerald-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-32"
            viewBox="0 0 420 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.5 }}
              className="fill-emerald-500 stroke-emerald-500"
              style={{ strokeWidth: 1 }}
            >
              <WaveformPath />
            </motion.g>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
              className="fill-emerald-500 stroke-emerald-500"
              style={{
                strokeWidth: 1,
                transform: "translateY(10px)",
              }}
            >
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-4 sm:p-6 md:p-8 h-full relative flex flex-col justify-center">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Our Solution
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              <Tooltip
                content="Our AI system understands and processes legal queries in multiple Indian languages including Hindi, English, Tamil, Telugu, Bengali, and more - making legal help accessible to everyone."
                containerClassName="text-muted-foreground"
              >
                <span className="font-semibold cursor-help border-b border-dotted border-muted-foreground/50">Multilingual AI intake</span>
              </Tooltip>
              , intelligent lawyer matching, and a real-time case dashboard—so clarity and momentum come standard.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <span className="text-base sm:text-xl">🗣️</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">Multilingual AI</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <span className="text-base sm:text-xl">🎯</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">Smart Matching</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <span className="text-base sm:text-xl">📊</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">Live Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "values",
    title: "Values",
    color: "bg-amber-500 hover:bg-amber-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-32"
            viewBox="0 0 420 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.5 }}
              className="fill-amber-500 stroke-amber-500"
              style={{ strokeWidth: 1 }}
            >
              <WaveformPath />
            </motion.g>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
              className="fill-amber-500 stroke-amber-500"
              style={{
                strokeWidth: 1,
                transform: "translateY(10px)",
              }}
            >
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-4 sm:p-6 md:p-8 h-full relative flex flex-col justify-center">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Our Values
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 sm:mb-2">Mission-Driven</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Accessible to all</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 sm:mb-2">Customer-Centric</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Your priority</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 sm:mb-2">Excellence</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Quality standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Making legal services accessible to every startup",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "Your success is our priority",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to the highest quality standards",
  },
];

const About = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="About Axsyn Tech - AI-Powered Legal Technology for Indian Startups | Backed by Founder Forge"
        description="Axsyn Tech is revolutionizing legal services in India with Find My Vakeel. Founded in 2024, backed by Founder Forge, we use AI to connect startups with the right lawyers. Our mission: make legal help accessible, affordable, and multilingual for every Indian entrepreneur."
        keywords="about axsyn tech, startup legal technology India, founder forge backed, AI legal platform, find my vakeel company, legal tech startup India, multilingual legal services, startup mission, legal innovation India, entrepreneur legal support"
        canonicalUrl="https://axsyn-tech.onrender.com/about"
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Mission, Problem, Solution, Values - Smooth Tab */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 sm:mb-10 md:mb-12">
                About Axsyn Tech
              </h2>
              <SmoothTab items={tabItems} defaultTabId="mission" />
            </div>
          </div>
        </section>

        {/* Backed By Section */}
        <BackedBy />

        {/* Know Our Founder Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Know Our Founder
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the visionary leader driving innovation in legal technology and empowering startups across India.
              </p>
            </div>
            <div className="flex justify-center">
              <FounderCard />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">
                Leadership Team
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 px-4">
                Our team brings together expertise in technology, law, and startup ecosystems to create innovative solutions for modern businesses.
              </p>
              <Card className="p-6 sm:p-8 md:p-12 bg-primary text-primary-foreground mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl">
                  We're a passionate team of technologists, legal experts, and startup enthusiasts dedicated to making legal services accessible, affordable, and efficient for every startup.
                </p>
              </Card>
              <Button 
                size="lg" 
                className="bg-gradient-brand hover:opacity-90 w-full sm:w-auto"
                onClick={() => setJoinDialogOpen(true)}
              >
                Join Our Network
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JoinUsDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </div>
  );
};

export default About;
