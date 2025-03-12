"use client";

import {
  Mail,
  Calendar,
  Briefcase,
  LinkedinIcon,
  Github,
  FileSpreadsheet,
} from "lucide-react";
import { motion } from "framer-motion";

const integrations = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Integration",
    description: "Automatically track applications from your email inbox",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Calendar Sync",
    description:
      "Schedule interviews and set reminders with your preferred calendar",
  },
  {
    icon: <LinkedinIcon className="h-6 w-6" />,
    title: "LinkedIn Import",
    description: "Import job applications directly from LinkedIn",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Job Board Sync",
    description: "Connect with major job boards for seamless tracking",
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "GitHub Integration",
    description: "Link your GitHub projects to applications",
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6" />,
    title: "Spreadsheet Export",
    description: "Export your data to Excel or Google Sheets",
  },
];

export function LandingIntegrations() {
  return (
    <section className="py-24" id="integrations">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-black">
            Powerful Integrations
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 ml-2 align-middle">
              Coming Soon
            </span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with your favorite tools and services to streamline your
            workflow
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="group relative rounded-xl border bg-background/50 backdrop-blur-sm p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="mb-3 inline-block rounded-lg bg-primary/10 p-2 text-primary ring-1 ring-primary/25">
                {integration.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {integration.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
