import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, BarChart3, Users, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import JoinUsDialog from "@/components/JoinUsDialog";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip-card";
import { BackgroundBoxesCore } from "@/components/ui/background-boxes";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Handle Describe Your Problem click - check auth first
  const handleDescribeProblemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/submit');
    } else {
      navigate('/login', { state: { from: '/submit' } });
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#7FC892]/10 via-background to-background overflow-hidden min-h-[700px] lg:min-h-[800px]">
        {/* Background Boxes */}
        <BackgroundBoxesCore />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left side - Hero text */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
                <span className="text-xs sm:text-sm font-semibold text-foreground">Backed by</span>
                <Tooltip
                  content={
                    <div>
                      <p className="font-semibold mb-2">Founder Forge</p>
                      <p className="text-xs text-muted-foreground">A leading startup accelerator and investment firm that supports early-stage technology companies in India with funding, mentorship, and resources.</p>
                    </div>
                  }
                >
                  <span className="text-xs sm:text-sm font-bold text-primary cursor-help">FOUNDER FORGE</span>
                </Tooltip>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
                Be <span className="text-primary">Legal Ready</span> Before You Step In
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                Answer guided questions, upload your documents, and get a comprehensive legal summary instantly. Save time, avoid repetition, and get faster support.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 shadow-lg text-base sm:text-lg px-8 py-6 rounded-full group"
                  onClick={handleDescribeProblemClick}
                >
                  <span className="flex items-center gap-2">
                    Describe Your Problem
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </span>
                </Button>
                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base sm:text-lg px-8 py-6 rounded-full"
                    asChild
                  >
                    <Link to="/login">
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right side - Floating Cards with Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {/* Main person image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="Professional using legal services on phone"
                  className="w-full h-[500px] lg:h-[600px] object-cover rounded-3xl"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Card 1 - Doctor's Report */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute top-8 -left-4 lg:left-0 z-20"
              >
                <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-xl border-2 border-primary/10 max-w-[200px]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Legal Report</p>
                      <p className="text-xs text-muted-foreground">Compliance Analysis</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Floating Card 2 - Document Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute top-32 -right-4 lg:-right-8 z-20"
              >
                <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-xl border-2 border-primary/10 max-w-[180px]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">Document Status</span>
                      <div className="px-2 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-semibold text-primary">Verified</span>
                      </div>
                    </div>
                    <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full" />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Floating Card 3 - Audio Waveform */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-32 right-4 lg:right-8 z-20"
              >
                <Card className="bg-white/95 backdrop-blur-sm p-3 shadow-xl border-2 border-primary/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-0.5 h-8">
                      {[3, 5, 4, 6, 5, 7, 4, 6, 3, 5].map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-primary rounded-full"
                          style={{ height: `${height * 3}px` }}
                          animate={{ height: [`${height * 3}px`, `${height * 4}px`, `${height * 3}px`] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Floating Card 4 - Medical Record */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 -left-4 lg:left-0 z-20"
              >
                <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-xl border-2 border-primary/10 max-w-[200px]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Case Analytics</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-1 bg-primary/20 rounded-full" />
                      <div className="flex-1 h-1 bg-primary rounded-full" />
                      <div className="flex-1 h-1 bg-primary/20 rounded-full" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    
      <JoinUsDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </>
  );
};

export default Hero;
