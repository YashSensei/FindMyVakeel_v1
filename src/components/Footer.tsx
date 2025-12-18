import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { SiMedium } from "react-icons/si";
import { Spotlight } from "@/components/ui/spotlight-new";

const Footer = () => {
  return (
    <footer className="text-white py-12 relative overflow-hidden bg-neutral-800 antialiased bg-grid-white/[0.02] backdrop-blur-sm">
      <Spotlight fill="#7FC892" className="left-0 md:left-60 md:-top-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7FC892] to-[#5FB574] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-2 text-xl font-bold">Axsyn Tech</span>
            </div>
            <p className="text-neutral-400 max-w-xs mb-4">
              Making legal help in India simple, multilingual, and transparent.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/axsyn-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#7FC892] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/AxsynTech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#7FC892] transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/axsyn.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#7FC892] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://medium.com/@axsyntech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#7FC892] transition-colors"
                aria-label="Medium"
              >
                <SiMedium className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  Find My Vakeel
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-[#7FC892] transition-colors text-sm sm:text-base">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Axsyn Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
