import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip-card";

const DetailedInfo = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
        <div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-10">
              <div>
                <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                  Our Approach
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                  Simplifying Legal Complexity for Startups
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Navigating the legal landscape can be one of the most daunting challenges for startup founders. From{" "}
                  <Tooltip
                    content="The process of officially registering your company as a legal business entity with government authorities."
                    containerClassName="text-muted-foreground"
                  >
                    <span className="font-semibold cursor-help border-b border-dotted border-muted-foreground/50">incorporation</span>
                  </Tooltip>{" "}
                  and contract drafting to{" "}
                  <Tooltip
                    content="IP (Intellectual Property) protection includes patents, trademarks, copyrights, and trade secrets that safeguard your company's innovations and brand."
                    containerClassName="text-muted-foreground"
                  >
                    <span className="font-semibold cursor-help border-b border-dotted border-muted-foreground/50">intellectual property protection</span>
                  </Tooltip>{" "}
                  and compliance management, the legal requirements can quickly become overwhelming. Find My Vakeel was created to bridge this gap.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform connects you with experienced legal professionals who specialize in startup law. These experts understand the unique challenges of early-stage companies—limited budgets, rapid growth, and the need for agile legal solutions. Whether you're launching your first product, raising capital, or expanding into new markets, our network of{" "}
                  <Tooltip
                    content={
                      <div>
                        <p className="font-semibold mb-2">What is a Vakeel?</p>
                        <p className="text-xs text-muted-foreground">Vakeel is the Hindi/Urdu word for lawyer or legal advocate. In India, vakeels are qualified legal professionals who represent clients in courts and provide legal advice.</p>
                      </div>
                    }
                    containerClassName="text-muted-foreground"
                  >
                    <span className="font-semibold cursor-help border-b border-dotted border-muted-foreground/50">vakeels</span>
                  </Tooltip>{" "}
                  is ready to guide you through every legal milestone.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Why Startups Choose Us
                </h3>
                {[
                  "Pre-vetted legal experts with startup experience",
                  "Transparent, founder-friendly pricing structures",
                  "Fast turnaround on critical legal documents",
                  "Ongoing compliance monitoring and alerts",
                  "Dedicated support throughout your growth journey",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg text-foreground leading-relaxed pt-0.5">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6 lg:space-y-8">
              <Card className="group p-8 border-l-4 border-l-primary hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  For Startup Founders
                </h3>
                <p className="text-muted-foreground mb-4">
                  Focus on building your product while we handle the legal complexity. Our platform gives you instant access to legal experts who understand the startup ecosystem, competitive pricing, and rapid response times that match your pace of growth.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Company formation & structuring</li>
                  <li>• Fundraising & investor agreements</li>
                  <li>• Employment contracts & equity</li>
                  <li>• IP protection & licensing</li>
                </ul>
              </Card>

              <Card className="group p-8 border-l-4 border-l-accent hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  For Legal Advisors
                </h3>
                <p className="text-muted-foreground mb-4">
                  Join our network of trusted legal professionals and connect with ambitious startups seeking expert guidance. Grow your practice with a steady stream of clients who value your specialized expertise in startup law.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access to vetted startup clients</li>
                  <li>• Flexible engagement models</li>
                  <li>• Secure document management</li>
                  <li>• Professional reputation building</li>
                </ul>
              </Card>

              <Card className="group p-8 bg-gradient-brand text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <h3 className="text-2xl font-bold mb-4 relative">
                  Industry Recognition
                </h3>
                <p className="text-white/90 text-base leading-relaxed relative">
                  Find My Vakeel has been featured in leading startup publications and recognized for innovation in legal tech. Our commitment to making legal services accessible has earned the trust of founders and advisors across the country.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedInfo;
