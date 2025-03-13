"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does CV-Tracker help with my job search?",
    answer:
      "CV-Tracker helps you organize all aspects of your job search in one place. You can store different versions of your CV, track application statuses, set reminders for interviews, and analyze your application success rates through our comprehensive dashboard - all completely free and open source.",
  },
  {
    question: "Is CV-Tracker really free?",
    answer:
      "Yes, CV-Tracker is 100% free and open source! We believe in providing powerful tools to job seekers without any cost. You can use all features without limitations, and the code is available on GitHub for transparency and community contributions.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Your data privacy is our priority. CV-Tracker is self-hosted, meaning you have complete control over your data. All data is stored locally on your chosen infrastructure, and you can review our security practices in our open source codebase.",
  },
  {
    question: "Can I contribute to CV-Tracker?",
    answer:
      "Absolutely! CV-Tracker is an open source project and we welcome contributions from the community. Whether it's bug fixes, new features, or documentation improvements, you can find our contribution guidelines on our GitHub repository.",
  },
  {
    question: "Can I export my application data?",
    answer:
      "Yes, you have full control over your data. You can export your application data and analytics in the PDF format for your records or analysis. Being open source means you can also customize the export format to your needs.",
  },
  {
    question: "Do you offer integrations with job boards?",
    answer:
      "We're actively developing integrations with major job boards and professional networks. As an open source project, you can also contribute to building new integrations or customize existing ones to fit your workflow.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LandingFAQ() {
  return (
    <section className="py-16 sm:py-20 bg-muted/50" id="faq">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground">
            Everything you need to know about CV-Tracker
          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-3xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={item}>
              <Disclosure
                as="div"
                className="mt-4 rounded-lg bg-background border"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-4 text-base sm:text-lg font-medium hover:bg-muted/50">
                      <span className="text-left pr-2">{faq.question}</span>
                      <ChevronDown
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-primary transition-transform duration-200 flex-shrink-0`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-4 pt-2 text-sm sm:text-base text-muted-foreground">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
