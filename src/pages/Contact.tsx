import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BentoGrid from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTACT_INFO, EXTERNAL_URLS } from "@/constants";
import { Mail, Phone, MapPin, ExternalLink, MessageSquare } from "lucide-react";

const Contact = () => {
  const handleOpenForm = () => {
    window.open(EXTERNAL_URLS.tallyForm, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Axsyn Tech - Get Legal Support for Your Startup | Find My Vakeel"
        description="Contact Axsyn Tech for startup legal services. Schedule a consultation, request a demo, or ask about partnerships. Available across India with multilingual support. Response time: 24 hours."
        keywords="contact axsyn tech, startup legal consultation, request demo find my vakeel, legal support India, contact vakeel service, partnership inquiry, customer support legal tech, schedule legal consultation, startup lawyer contact"
        canonicalUrl="https://axsyn-tech.onrender.com/contact"
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-white/90">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 flex items-start space-x-4 hover:shadow-card transition-all">
                    <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">{CONTACT_INFO.email}</p>
                    </div>
                  </Card>

                  <Card className="p-6 flex items-start space-x-4 hover:shadow-card transition-all">
                    <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">{CONTACT_INFO.phone}</p>
                    </div>
                  </Card>

                  <Card className="p-6 flex items-start space-x-4 hover:shadow-card transition-all">
                    <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Office</h3>
                      <p className="text-muted-foreground">
                        {CONTACT_INFO.address.street}<br />
                        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contact Form CTA */}
              <Card className="p-8 border-2 border-primary/20">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Let's Start a Conversation
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Fill out our quick form and we'll get back to you within 24 hours. 
                      Tell us about your legal needs and we'll match you with the right expert.
                    </p>
                  </div>

                  <div className="space-y-3 text-left bg-secondary/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-foreground">What to expect:</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Quick 2-minute form</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Response within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>Free initial consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>No commitment required</span>
                      </li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleOpenForm}
                    className="w-full bg-gradient-brand hover:opacity-90" 
                    size="lg"
                  >
                    Open Contact Form
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Secure form powered by Tally
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
