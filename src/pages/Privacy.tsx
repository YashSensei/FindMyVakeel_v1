import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, FileText, UserCheck, Bell, Cookie, Baby } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      id: 1,
      icon: Shield,
      title: "Introduction",
      content: "Welcome to Axsyn Tech (\"we,\" \"our,\" or \"us\"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use Find My Vakeel platform."
    },
    {
      id: 2,
      icon: FileText,
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, including:",
      list: [
        "Name and contact information (email address, phone number)",
        "Company information and business details",
        "Legal requirements and service preferences",
        "Communication history and support inquiries",
        "Usage data and analytics"
      ]
    },
    {
      id: 3,
      icon: Eye,
      title: "How We Use Your Information",
      content: "We use the information we collect to:",
      list: [
        "Provide and improve our services",
        "Match you with appropriate legal experts",
        "Communicate with you about our services",
        "Process your requests and transactions",
        "Send you updates and marketing communications (with your consent)",
        "Ensure platform security and prevent fraud"
      ]
    },
    {
      id: 4,
      icon: UserCheck,
      title: "Data Sharing and Disclosure",
      content: "We do not sell your personal data. We may share your information with:",
      list: [
        "Legal experts in our network (only with your consent)",
        "Service providers who assist in our operations",
        "Law enforcement when required by law",
        "Business partners for joint services (with your consent)"
      ]
    },
    {
      id: 5,
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      id: 6,
      icon: Shield,
      title: "Your Rights",
      content: "You have the right to:",
      list: [
        "Access and receive a copy of your personal data",
        "Correct inaccurate or incomplete information",
        "Request deletion of your personal data",
        "Object to or restrict processing of your data",
        "Withdraw consent at any time",
        "Data portability"
      ]
    },
    {
      id: 7,
      icon: Cookie,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to improve user experience, analyze usage patterns, and personalize content. You can control cookie preferences through your browser settings."
    },
    {
      id: 8,
      icon: Baby,
      title: "Children's Privacy",
      content: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children."
    },
    {
      id: 9,
      icon: Bell,
      title: "Changes to This Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the \"Last updated\" date."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy - Your Data Protection"
        description="Learn how Axsyn Tech protects your privacy and handles your personal information. We're committed to transparency and data security."
        keywords="privacy policy, data protection, gdpr, personal information"
      />
      <Navbar />
      <main id="main-content" className="flex-1 bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/10 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Privacy & Security
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Your privacy matters to us. Learn how we protect and handle your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: December 1, 2025
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div 
                  key={section.id}
                  className="group relative"
                >
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                  
                  <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                          {index + 1}. {section.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                          {section.content}
                        </p>
                        {section.list && (
                          <ul className="mt-4 space-y-3">
                            {section.list.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <span className="text-muted-foreground leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact Section */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
              
              <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-2xl p-6 md:p-8 border border-primary/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      10. Contact Us
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                      If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm rounded-xl p-6 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="text-foreground font-semibold text-lg">Axsyn Tech</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Email:</span> privacy@axsyntech.com
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Address:</span> 123 Tech Street, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center p-6 bg-secondary/30 rounded-xl">
            <p className="text-sm text-muted-foreground">
              This privacy policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
