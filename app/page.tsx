"use client";

import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LandingFAQ } from "@/components/landing/faq";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  PlusCircle,
  Search,
  FolderKanban,
  Mail,
  Calendar,
  Briefcase,
  Github,
  FileSpreadsheet,
  LinkedinIcon,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/background";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const Chart = dynamic(() => import("@/components/chart/pie-chart"), {
  ssr: false,
});

const demoData = [
  { name: "Planned", value: 3, fill: "#3b82f6" },
  { name: "Pending", value: 4, fill: "#eab308" },
  { name: "Interview", value: 2, fill: "#a855f7" },
  { name: "Practical", value: 1, fill: "#6366f1" },
  { name: "Accepted", value: 2, fill: "#22c55e" },
  { name: "Declined", value: 1, fill: "#ef4444" },
];

const features = [
  {
    title: "Track Applications",
    description:
      "Keep all your job, college, internship and many more applications organized in one place",
    icon: FileText,
  },
  {
    title: "Status Management",
    description:
      "Track the progress of each application with visual status indicators",
    icon: FolderKanban,
  },
  {
    title: "CV Storage",
    description: "Securely store and manage different versions of your CV",
    icon: PlusCircle,
  },
  {
    title: "Smart Search",
    description: "Quickly find applications by company or position",
    icon: Search,
  },
];

const integrations = [
  {
    icon: Mail,
    title: "Email Integration",
    description: "Automatically track applications from your email inbox",
  },
  {
    icon: Calendar,
    title: "Calendar Sync",
    description:
      "Schedule interviews and set reminders with your preferred calendar",
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn Import",
    description: "Import job applications directly from LinkedIn",
  },
  {
    icon: Briefcase,
    title: "Job Board Sync",
    description: "Connect with major job boards for seamless tracking",
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Link your GitHub projects to applications",
  },
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet Export",
    description: "Export your data to Excel or Google Sheets",
  },
];

const statusBadges = [
  {
    label: "Planned",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    label: "Interview",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    label: "Practical",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  {
    label: "Accepted",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    label: "Declined",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeader />
      <main className="flex-1">
        <WavyBackground
          className="max-w-4xl mx-auto"
          containerClassName="py-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center justify-center"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Professional Application Management
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Streamline your job search process with our comprehensive
            application tracking system. Stay organized, informed, and in
            control of your career journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/sign-up" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
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
        </WavyBackground>

        <section className="py-20 bg-white" id="features">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Comprehensive Application Management Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-white rounded-lg shadow-sm border"
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-slate-50" id="tracking">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Intelligent Status Tracking
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Monitor your applications with our sophisticated status
                  tracking system. Get real-time insights into your application
                  progress and make data-driven decisions about your job search
                  strategy.
                </p>
                <div className="flex flex-wrap gap-2">
                  {statusBadges.map((badge) => (
                    <Badge key={badge.label} className={badge.color}>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-center bg-white p-8 rounded-lg shadow-sm">
                <div className="w-[400px] h-[400px]">
                  <Chart data={demoData} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" id="integrations">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Powerful Integrations
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 ml-2 align-middle">
                  Coming Soon
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with your favorite tools and services to streamline your
                workflow
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-2 text-primary">
                    <integration.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {integration.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <LandingFAQ />
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Take Control of Your Job Search
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join professionals who are managing their applications efficiently
              and effectively.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-up" className="flex items-center gap-2">
                Start Now <IconArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
