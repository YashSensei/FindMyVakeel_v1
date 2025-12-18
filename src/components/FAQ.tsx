import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does Find My Vakeel match me with the right legal expert?",
    answer: "Our intelligent matching system analyzes your specific requirements including your industry, legal needs, location, and business stage. We then connect you with verified legal experts who specialize in those exact areas, ensuring you get relevant and experienced guidance."
  },
  {
    question: "What types of legal services are available on the platform?",
    answer: "We offer comprehensive legal support including company incorporation, contract drafting and review, intellectual property protection, compliance management, fundraising documentation, employment law, and general startup advisory. Our experts cover all aspects of startup legal needs."
  },
  {
    question: "How quickly can I get connected with a legal expert?",
    answer: "Most matches are made within 2-4 hours of submitting your request. For urgent matters, we offer priority matching that can connect you with an available expert within 30 minutes. Our 24/7 support ensures you're never left waiting when legal matters arise."
  },
  {
    question: "Is my information secure on the platform?",
    answer: "Absolutely. We use bank-level encryption for all data transmission and storage. Your legal documents are stored in secure, compliant servers with access limited only to you and your designated legal expert. We're fully compliant with data protection regulations and maintain strict confidentiality protocols."
  },
  {
    question: "What are the pricing options?",
    answer: "We offer transparent, founder-friendly pricing with three models: hourly consultations, project-based fixed pricing, and monthly retainer packages for ongoing support. All pricing is discussed upfront with no hidden fees. Your first consultation is free to help you get started."
  },
  {
    question: "Can I work with multiple legal experts for different needs?",
    answer: "Yes! Many startups work with different experts for specialized needs - one for IP matters, another for contracts, and another for compliance. Our platform makes it easy to manage multiple relationships and keep all your legal documentation organized in one place."
  },
  {
    question: "What if I'm not satisfied with my matched expert?",
    answer: "Your satisfaction is our priority. If you're not happy with your match, simply let us know and we'll connect you with a different expert at no additional cost. We also offer a satisfaction guarantee on our services and will work with you to ensure you get the support you need."
  },
  {
    question: "Do you support multilingual consultations?",
    answer: "Yes! Our platform supports consultations in multiple Indian languages including Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, and more. Our AI-powered system can understand your needs in your preferred language and match you with experts who can communicate effectively with you."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Image/Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" 
                  alt="Person reviewing documents on tablet"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>

            {/* Right side - FAQ Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-12">
                <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                  FAQ
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                  Frequently Asked <br />
                  <span className="text-primary">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Everything you need to know about Find My Vakeel
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div 
                    key={index}
                    className="border-b border-border pb-4 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-start justify-between gap-4 text-left group py-4 hover:opacity-70 transition-opacity"
                    >
                      <span className="text-lg font-semibold text-foreground pr-4 leading-relaxed">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 text-primary" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground leading-relaxed pb-4 pr-12">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default FAQ;
