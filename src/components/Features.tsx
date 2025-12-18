import CardFlip from "@/components/ui/card-flip";
import { Scale, FileText, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Scale,
    title: "Legal Compliance",
    subtitle: "Stay compliant, stay secure",
    description: "Ensure your startup meets all legal requirements with automated compliance tracking and expert guidance.",
    features: [
      "Automated compliance tracking",
      "Regulatory updates & alerts",
      "Expert legal guidance",
      "Risk assessment tools"
    ]
  },
  {
    icon: FileText,
    title: "Document Management",
    subtitle: "Organize with confidence",
    description: "Manage and store important legal documents in one secure, accessible location with smart organization.",
    features: [
      "Secure cloud storage",
      "Smart document search",
      "Version control & history",
      "Easy sharing & collaboration"
    ]
  },
  {
    icon: TrendingUp,
    title: "Startup Growth",
    subtitle: "Scale without barriers",
    description: "Legal support designed to scale your business from seed stage to Series A and beyond.",
    features: [
      "Fundraising documentation",
      "Contract templates library",
      "IP protection strategies",
      "Growth stage advisory"
    ]
  },
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            Core Features
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and support to manage your startup's legal needs seamlessly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 place-items-center min-h-[500px]">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in w-full flex justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardFlip
                icon={feature.icon}
                title={feature.title}
                subtitle={feature.subtitle}
                description={feature.description}
                features={feature.features}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
