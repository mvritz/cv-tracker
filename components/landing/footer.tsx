"use client";

import Link from "next/link";
import { FileText, Star, Github, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Status Tracking", href: "#tracking" },
    { name: "Integrations", href: "#integrations" },
    { name: "FAQ", href: "#faq" },
  ],
  community: [
    {
      name: "GitHub",
      href: "https://github.com/mvritz/cv-tracker",
      icon: Github,
    },
    { name: "Issues", href: "https://github.com/mvritz/cv-tracker/issues" },
    {
      name: "Discussions",
      href: "https://github.com/mvritz/cv-tracker/discussions",
    },
    {
      name: "Contributing",
      href: "https://github.com/mvritz/cv-tracker/blob/main/README.md",
    },
  ],
};

export function LandingFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-12 lg:px-8 lg:py-16">
          <div className="col-span-12 md:col-span-4 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
              </div>
              <span className="text-lg sm:text-xl font-bold">CV-Tracker</span>
            </Link>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xs mb-6">
              The open source solution for managing your applications and
              tracking your career progress. Built with modern technologies and
              best practices.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 sm:mb-0">
                  Product
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 sm:mb-0">
                  Community
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {footerLinks.community.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target="_blank"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
              &copy; {new Date().getFullYear()} CV-Tracker. MIT License.
            </p>
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/mvritz/cv-tracker"
                  target="_blank"
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Star className="h-3 sm:h-4 w-3 sm:w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
