import { Card } from "@/components/ui/card";
import { Award, Code2, Zap } from "lucide-react";

const BackedBy = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div>
          <Card className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-background to-secondary/50 border-2 border-primary/20">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Left side - Badge */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-brand rounded-xl flex items-center justify-center shadow-lg">
                    <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Backed by</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Founder Forge</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Powered by cutting-edge technology and innovation to deliver seamless legal solutions for the startup ecosystem.
                </p>
              </div>

              {/* Right side - Features */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-primary/10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">Tech-First Approach</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Built with modern technology stack for reliability and speed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-primary/10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">Trusted Partnership</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Strategic backing to ensure quality and continuous innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BackedBy;
