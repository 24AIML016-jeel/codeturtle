"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Remove unwanted attributes added by browser extensions
    const body = document.body;
    if (body) {
      // Remove CodeStream attributes
      body.removeAttribute("cz-shortcut-listen");
      // Remove any other extension attributes that might cause hydration issues
      const attributes = Array.from(body.attributes);
      attributes.forEach(attr => {
        if (attr.name.startsWith("cz-") || attr.name.includes("extension")) {
          body.removeAttribute(attr.name);
        }
      });
    }
  }, []);

  return null;
}