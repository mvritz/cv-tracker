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
      href: "https://github.com/mvritz/cv-tracker/blob/main/CONTRIBUTING.md",
    },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/mvritz/cv-tracker",
    icon: Github,
  },
  { name: "Twitter", href: "https://twitter.com/mvritz", icon: Twitter },
  { name: "Email", href: "mailto:contact@cv-tracker.com", icon: Mail },
];

export function LandingFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-12 md:py-16 lg:px-8">
          <div className="col-span-12 md:col-span-4 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">CV-Tracker</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              The open source solution for managing your applications and
              tracking your career progress. Built with modern technologies and
              best practices.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5 text-slate-600" />
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Product
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Community
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.community.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target="_blank"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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

        <div className="border-t px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CV-Tracker. MIT License.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/mvritz/cv-tracker"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Star className="h-4 w-4" />
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
