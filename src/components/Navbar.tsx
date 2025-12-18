import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, User, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav when scrolled past the navbar (approx 100px)
      setShowFloatingNav(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show floating nav on contact page
  const isContactPage = location.pathname === "/contact";

  const navigationLinks = [
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle Get Started / Find Your Vakeel click - check auth first
  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (isAuthenticated) {
      // User is logged in, go directly to submit
      navigate('/submit');
    } else {
      // User not logged in, redirect to login with return URL
      navigate('/login', { state: { from: '/submit' } });
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <nav className="border-b border-border backdrop-blur-sm bg-background/95 relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img src="/axsyntech_fav.png" alt="Axsyn Tech" className="w-8 h-8" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-foreground">Axsyn Tech</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="default"
                  className="rounded-full bg-primary hover:bg-primary/90"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Button variant="ghost" className="rounded-full" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
                <Button
                  variant="default"
                  className="rounded-full bg-primary hover:bg-primary/90"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center">
                    <img src="/axsyntech_fav.png" alt="Axsyn Tech" className="w-8 h-8" />
                    <span className="ml-2 text-xl font-bold">Axsyn Tech</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-secondary/50"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-6 border-t space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        Signed in as <span className="font-medium text-foreground">{user?.name || user?.email}</span>
                      </div>
                      <Button
                        className="w-full"
                        variant="outline"
                        asChild
                      >
                        <Link to="/profile" onClick={handleLinkClick}>
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Link>
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        asChild
                      >
                        <Link to="/dashboard" onClick={handleLinkClick}>
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        size="lg"
                        onClick={handleGetStartedClick}
                      >
                        Get Started
                      </Button>
                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        asChild
                      >
                        <Link to="/login" onClick={handleLinkClick}>
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        size="lg"
                        onClick={handleGetStartedClick}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>

      {/* Floating Navigation Button */}
      <AnimatePresence>
        {showFloatingNav && !isContactPage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -20, scale: 0.8, x: '-50%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 sm:top-8 left-1/2 z-50 w-[90%] sm:w-auto max-w-md"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 overflow-hidden">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <Link to="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
                  <img src="/axsyntech_fav.png" alt="Axsyn Tech" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-xs sm:text-sm text-foreground whitespace-nowrap">
                    AXSYN TECH
                  </span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-3 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-8 sm:h-9"
                  onClick={handleGetStartedClick}
                >
                  Find Your Vakeel
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
