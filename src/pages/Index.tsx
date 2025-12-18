import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import BackedBy from "@/components/BackedBy";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Find My Vakeel - AI-Powered Legal Services Platform for Indian Startups"
        description="Find My Vakeel by Axsyn Tech connects Indian startups with expert lawyers through AI-powered matching. Get multilingual legal support, compliance tracking, and real-time case management. Trusted by 500+ startups across India."
        keywords="find my vakeel, startup legal services india, AI lawyer matching, legal compliance software, business law India, startup attorney finder, legal tech platform, vakeel online, lawyer for startups, legal advisory India, multilingual legal services, startup compliance, legal document management"
        canonicalUrl="https://axsyn-tech.onrender.com"
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Features />
        <TrustSection />
        <BackedBy />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
