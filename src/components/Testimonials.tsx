import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Founder & CEO",
    company: "TechNova Solutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=b6e3f4",
    content: "Find My Vakeel transformed how we handle legal compliance. Within 24 hours, we were matched with an expert who understood our SaaS business model. The document management system alone saved us countless hours.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Co-founder",
    company: "GreenTech Innovations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=c0aede",
    content: "As a first-time founder, navigating legal requirements felt overwhelming. Axsyn Tech's platform connected us with a vakeel who specializes in climate tech startups. Their guidance during our seed round was invaluable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali Reddy",
    role: "Legal Advisor",
    company: "Independent Practice",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali&backgroundColor=ffdfbf",
    content: "Joining Axsyn Tech's network was the best decision for my practice. The platform connects me with quality clients who genuinely need my startup law expertise. The process is seamless and professional.",
    rating: 5,
  },
  {
    id: 4,
    name: "Arjun Kapoor",
    role: "CTO",
    company: "FinFlow Systems",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=ffd5dc",
    content: "We needed IP protection and contract review urgently before our product launch. Find My Vakeel matched us with the perfect advisor within hours. Fast, reliable, and exactly what early-stage startups need.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Patel",
    role: "Founder",
    company: "HealthBridge AI",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=d1d4f9",
    content: "The transparency in pricing and the quality of legal experts is outstanding. We've worked with three different vakeels through the platform for different needs - all have been exceptional. Highly recommend!",
    rating: 5,
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Head of Operations",
    company: "LogiChain Pro",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=c7f6c7",
    content: "From incorporation to our Series A, Find My Vakeel has been our trusted legal partner. The platform makes it easy to find specialized expertise for every stage of growth. A must-have for any startup.",
    rating: 5,
  },
];

const Testimonials = () => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-cream overflow-hidden relative">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 mb-4 sm:mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real feedback from startups and legal experts we've helped
          </p>
        </div>

        {/* Scrolling container */}
        <div className="relative">
          <div className="flex gap-4 md:gap-6 animate-scroll hover:pause-animation">
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="p-4 md:p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px]"
              >
                <Quote className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 text-primary/20" />
                
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary/20"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-foreground">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-2 md:mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
