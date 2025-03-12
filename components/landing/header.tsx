"use client";

import React from "react";
import Link from "next/link";
import { IconMenu2, IconX, IconBriefcase } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Status Tracking", href: "#tracking" },
  { name: "Integrations", href: "#integrations" },
  { name: "FAQ", href: "#faq" },
];

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Height of the header
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur transition-all duration-200 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-20 items-center px-8">
        <div className="flex items-center gap-2 mr-auto">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">CV-Tracker</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 justify-end">
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-sm font-medium text-gray-900 transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </nav>

        <button
          className="flex items-center justify-center rounded-md p-2 text-gray-900 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden px-8">
          <div className="flex flex-col space-y-6 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-sm font-medium text-gray-900 transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-2">
              <Button variant="outline" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
