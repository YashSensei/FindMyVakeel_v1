import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, FileText, Users, Award, CheckCircle2, LayoutDashboard, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import JoinUsDialog from "@/components/JoinUsDialog";
import TrustSection from "@/components/TrustSection";
import DetailedInfo from "@/components/DetailedInfo";
import { Timeline } from "@/components/ui/timeline";
import { Tooltip } from "@/components/ui/tooltip-card";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    icon: ShieldCheck,
    title: "Legal Compliance",
    description: "Stay compliant with all regulations and legal requirements for startups",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Securely store and manage all your legal documents in one place",
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Access a network of verified legal experts specialized in startup law",
  },
  {
    icon: Award,
    title: "Startup Advisory",
    description: "Get personalized legal advice tailored to your startup's growth stage",
  },
  {
    icon: LayoutDashboard,
    title: "Case Dashboard",
    description: "Track updates, deadlines, and documents—no guesswork.",
  },
  {
    icon: MessageSquare,
    title: "Multilingual AI Chatbot",
    description: "Describe your issue in any Indian language. Get clarity fast",
  },
];

const benefits = [
  "Fast matching with qualified legal experts",
  "Transparent pricing with no hidden fees",
  "Specialized in startup legal needs",
  "Secure document sharing platform",
  "24/7 customer support",
  "Free initial consultation",
];

const Products = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Handle Get Started click - check auth first
  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/submit');
    } else {
      navigate('/login', { state: { from: '/submit' } });
    }
  };

  const timelineData = [
    {
      title: "Step 1: Explain Your Problem",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Describe your legal challenge in simple terms. Whether it's compliance, contracts, or legal advice - our AI-powered system understands your needs in any Indian language.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <MessageSquare className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Easy Communication</p>
              </div>
            </div>
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <FileText className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Multilingual Support</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Get Connected",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            We match you with the perfect legal expert based on your specific needs, industry, and location. Connect instantly with verified professionals.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <Users className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Smart Matching</p>
              </div>
            </div>
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <Award className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Verified Experts</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Get It Solved",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Your legal expert works on resolving your issue while you track everything through our intuitive dashboard. From consultation to resolution - we've got you covered.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Real-time progress tracking
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Transparent pricing & timelines
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Secure document handling
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ 24/7 support available
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Complete resolution guarantee
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <CheckCircle2 className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Problem Solved</p>
              </div>
            </div>
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-4 shadow-lg md:h-44 lg:h-60">
              <div className="flex h-full flex-col justify-center text-white">
                <ShieldCheck className="mb-2 h-8 w-8" />
                <p className="text-sm font-semibold">Peace of Mind</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Product Features - AI Legal Matching & Compliance Platform | Find My Vakeel"
        description="Explore Find My Vakeel's comprehensive features: AI-powered lawyer matching, multilingual intake, real-time case dashboard, secure document management, and 24/7 compliance tracking. Built specifically for Indian startups and SMEs."
        keywords="AI lawyer matching, legal compliance software, document management system, startup legal platform, multilingual legal services, case tracking dashboard, lawyer finder India, legal tech features, startup compliance tools, vakeel matching algorithm, real-time legal updates"
        canonicalUrl="https://axsyn-tech.onrender.com/products"
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
            <div className="text-center">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-white bg-white/20 backdrop-blur rounded-full">
                Legal Solutions Platform
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight">Find My Vakeel</h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed px-4">
                Your trusted platform to connect with{" "}
                <Tooltip
                  content={
                    <div>
                      <p className="font-semibold mb-2">Expert Legal Professionals</p>
                      <p className="text-xs text-muted-foreground">Our network includes experienced lawyers, advocates, and legal consultants who specialize in startup law, with expertise in incorporation, contracts, IP, compliance, and fundraising.</p>
                    </div>
                  }
                  containerClassName="text-white/90"
                >
                  <span className="font-semibold cursor-help border-b border-dotted border-white/50">legal experts</span>
                </Tooltip>{" "}
                who understand startup challenges
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={handleGetStartedClick}>
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary font-semibold w-full sm:w-auto"
                  onClick={() => setJoinDialogOpen(true)}
                >
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* Detailed Information */}
        <DetailedInfo />

        {/* Features Section */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                Platform Features
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6 tracking-tight">
                Comprehensive Legal Support
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage your startup's legal needs efficiently
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Card key={feature.title} className="group p-8 hover-lift animate-fade-in border-2 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-secondary/30">
          <div className="relative w-full overflow-clip">
            <Timeline data={timelineData} />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6 tracking-tight">
                  Built for Startups
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Experience the benefits that set us apart
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-lg text-foreground leading-relaxed pt-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-brand text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative max-w-7xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of startups who trust Find My Vakeel for their legal needs
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setJoinDialogOpen(true)}
            >
              Join Us Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <JoinUsDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
    </div>
  );
};

export default Products;
