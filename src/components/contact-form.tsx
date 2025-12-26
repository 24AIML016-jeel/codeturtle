import React from "react";
import { Card } from "./ui/card";
import Checkbox from "./ui/torch";

const ContactForm = () => {

  return (
    <Card className="flex flex-row space-x-8 px-6">
      
      <div className="flex-1 first-item">
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Have questions or need assistance? Fill out the form below to contact
          our support team.
        </p>
        <div className="flex flex-col items-center justify-between mt-20">
            <Checkbox  />
    
        </div>
      </div>
      <div className="flex-1 second-item">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={5}
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </Card>
  );
};

export default ContactForm;
