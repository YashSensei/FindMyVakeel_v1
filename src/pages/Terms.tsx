import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms of Service - Legal Agreement"
        description="Read the terms and conditions for using Find My Vakeel platform. Understand your rights and responsibilities as a user of Axsyn Tech services."
        keywords="terms of service, terms and conditions, user agreement, legal terms"
      />
      <Navbar />
      <main id="main-content" className="flex-1 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 1, 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Find My Vakeel platform operated by Axsyn Tech, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Find My Vakeel is a platform that connects startups with legal experts. We provide a marketplace for legal services but do not directly provide legal advice. The relationship is between you and the legal professional you choose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To use our platform, you must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not have been previously banned from using our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                As a user, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide truthful and accurate information</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not engage in fraudulent or deceptive activities</li>
                <li>Not interfere with platform operations or security</li>
                <li>Maintain confidentiality of sensitive information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Legal Professional Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Legal professionals on our platform are independent contractors. Axsyn Tech does not employ them and is not responsible for their professional conduct, advice, or services. Any engagement with a legal professional is a direct relationship between you and that professional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Fees and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fees for services are set by the legal professionals. Platform fees, if applicable, will be clearly disclosed. All payments are processed securely through our payment partners. Refund policies are subject to the terms agreed upon with individual legal professionals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality on the platform, including but not limited to text, graphics, logos, and software, are owned by Axsyn Tech and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Disclaimers</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The platform is provided "as is" without warranties of any kind. We disclaim:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Responsibility for legal advice provided by professionals</li>
                <li>Guarantees of specific outcomes or results</li>
                <li>Liability for third-party content or services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Axsyn Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amount you paid to us in the preceding 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Axsyn Tech, its affiliates, and their respective officers, directors, and employees from any claims, damages, losses, or expenses arising from your use of the platform or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend your account at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Axsyn Tech operates, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes. Your continued use of the platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                <p className="text-foreground font-medium">Axsyn Tech</p>
                <p className="text-muted-foreground">Email: legal@axsyntech.com</p>
                <p className="text-muted-foreground">Address: 123 Tech Street, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
