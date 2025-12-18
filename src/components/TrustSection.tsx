import { Card } from "@/components/ui/card";
import { Users, Shield, Clock, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Users", value: "500+" },
  { icon: Shield, label: "Legal Experts", value: "200+" },
  { icon: Clock, label: "Avg. Response Time", value: "< 2hrs" },
  { icon: Star, label: "Success Rate", value: "98%" },
];

const TrustSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-primary bg-primary/10 rounded-full">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
            Trusted Nationwide
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Join hundreds of startups simplifying their legal journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="group p-4 sm:p-6 md:p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in border-2 hover:border-primary/50 bg-background/50 backdrop-blur"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-brand rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-brand bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
