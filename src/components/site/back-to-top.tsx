"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-20 right-4 z-40 size-11 rounded-full bg-brand-accent text-brand-navy-dark shadow-lg hover:bg-sky-300 sm:right-6 lg:right-8"
      aria-label="Back to top"
    >
      <ArrowUp className="size-5" />
    </Button>
  );
}
