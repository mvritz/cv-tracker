"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Github } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "100% Free & Open Source",
  "Self-hosted & Privacy-focused",
  "Community-driven Development",
];

export function LandingCTA() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-primary to-primary/90 overflow-hidden relative w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative p-8 md:p-12 lg:px-20 lg:py-16">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join Our Open Source Community
              </motion.h2>
              <motion.p
                className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Be part of a community of developers and job seekers building
                the future of application tracking together.
              </motion.p>
              <motion.div
                className="grid sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary bg-white hover:bg-white/90 min-w-[200px]"
                  asChild
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary bg-white hover:bg-white/90 min-w-[200px]"
                  asChild
                >
                  <Link
                    href="https://github.com/yourusername/cvtracker"
                    target="_blank"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
