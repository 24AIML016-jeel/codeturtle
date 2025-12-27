import React from "react";
import { Poppins } from "next/font/google";
import { Card } from "../ui/card";
import { Book, HeartPlus, PersonStanding } from "lucide-react";
import Link from "next/link";
import ContactForm from "../contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

const Support = () => {
  return (
    <div>
      <div
        className={`text-7xl font-semibold tracking-tight ${poppins.className}`}
      >
        support
      </div>
      <div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/docs">
            <Card className="p-6 border border-border/50 hover:border-border transition">
              <div className="flex items-center mb-4">
                <Book className="mb-4 mr-3 h-6 w-6 text-primary" />
                <div className="text-2xl font-semibold mb-4">Documentation</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Find in-depth information about CodeTurtle features and API.
              </div>
            </Card>
          </Link>
          <Card className="p-6 border border-border/50 hover:border-border transition">
            <div className="flex items-center mb-4">
              <HeartPlus className="mb-4 mr-3 h-6 w-6 text-primary" />
              <div className="text-2xl font-semibold mb-4">Community</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Join the community to ask questions and find answers.
            </div>
          </Card>
          <Card className="p-6 border border-border/50 hover:border-border transition">
            <div className="flex items-center mb-4">
              <PersonStanding className="mb-4 mr-3 h-6 w-6 text-primary" />
              <div className="text-2xl font-semibold mb-4">Contact Support</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Get in touch with our support team for assistance.
            </div>
          </Card>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
        <div className="mt-10">
          <div className="py-4">
            <h1 className="text-3xl font-bold">FAQs</h1>
          </div>
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
              <AccordionTrigger className='text-xl'>What is CodeTurtle?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance  text-muted-foreground">
                <p>
                CodeTurtle is a powerful coding assistant tool designed to help developers write, debug, and optimize code efficiently. It integrates seamlessly with popular IDEs and supports multiple programming languages.
                </p>
                <p>
                Key features include AI-powered code suggestions, real-time error detection, and collaborative coding environments for teams.
                </p>
              </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
              <AccordionTrigger className='text-xl'>How do I get started?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance  text-muted-foreground">
                <p>
                Getting started is easy! Sign up for a free account on our website, download the CodeTurtle extension for your preferred IDE, and follow our quick-start guide in the documentation.
                </p>
                <p>
                For advanced users, explore our API integrations and community forums to customize your workflow and connect with other developers.
                </p>
              </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
              <AccordionTrigger className='text-xl'>How can I get support?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance  text-muted-foreground">
                <p>
                Our support team is here to help. Check our comprehensive documentation for FAQs, or reach out via the contact form below for personalized assistance.
                </p>
                <p>
                Join our community forums to ask questions, share tips, and connect with fellow developers. We also offer premium support plans for enterprise users.
                </p>
              </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
