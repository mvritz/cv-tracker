"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Clock,
  BarChart4,
  Search,
  Bell,
  Smartphone,
  ChevronDown,
  Github,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WavyBackground } from "@/components/ui/background";

const features = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "CV Storage",
    description:
      "Securely store all your CVs in one place with easy access whenever you need them.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Status Tracking",
    description:
      "Track application statuses from planned to accepted with our intuitive workflow.",
  },
  {
    icon: <BarChart4 className="h-6 w-6 text-primary" />,
    title: "Analytics Dashboard",
    description:
      "Get insights into your job search with visual analytics and progress tracking.",
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Advanced Search",
    description:
      "Quickly find applications with powerful search and filtering capabilities.",
  },
  {
    icon: <Bell className="h-6 w-6 text-primary" />,
    title: "Reminders & Alerts",
    description:
      "Never miss an interview with timely reminders and application deadline alerts.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: "Mobile Friendly",
    description:
      "Access your applications on the go with our responsive design that works on any device.",
  },
];

export function LandingFeatures() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section
        className="py-24 md:py-32 relative overflow-hidden min-h-[calc(100vh-12rem)] flex items-center"
        id="hero"
      >
        <div className="w-full flex justify-center items-center">
          <WavyBackground>
            <div className="px-10 flex flex-col items-center justify-center text-center space-y-8">
              <motion.div
                className="flex items-center gap-2 text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
                  100% Free & Open Source
                </span>
              </motion.div>
              <motion.div
                className="max-w-3xl mx-auto space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-black">
                  Powerful Features for Applicants
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
                  Everything you need to organize your job search in one
                  application. Free forever, open source, and built for the
                  community.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="min-w-[200px] bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px]"
                  asChild
                >
                  <Link
                    href="https://github.com/yourusername/cvtracker"
                    target="_blank"
                  >
                    <StarIcon className="mr-2 h-5 w-5" />
                    Star on GitHub
                  </Link>
                </Button>
              </motion.div>
            </div>
          </WavyBackground>
        </div>
      </section>
      <section className="py-32" id="features">
        <div className="flex flex-col items-center max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-black">
              Why Choose CVTracker?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful open source tools that will streamline your
              job search journey
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative rounded-xl border bg-background/50 backdrop-blur-sm p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="mb-3 inline-block rounded-lg bg-primary/10 p-2 text-primary ring-1 ring-primary/25">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
