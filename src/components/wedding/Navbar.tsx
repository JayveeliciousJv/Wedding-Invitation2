import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WEDDING } from "@/lib/wedding-config";

const links = [
  { href: "#home", label: "Home" },
  { href: "#timeline", label: "Timeline" },
  { href: "#details", label: "Details" },
  { href: "#venue", label: "Venue" },
  { href: "#faq", label: "FAQ" },
  { href: "#rsvp", label: "RSVP" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? "py-3 backdrop-blur-md border-b border-white/10" : "py-5"
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in oklab, var(--charcoal) 88%, transparent)"
            : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#home" className="font-script text-2xl md:text-3xl text-gold transition-all duration-300 hover:opacity-80">
            {WEDDING.monogram}
          </a>
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-[0.2em] uppercase text-secondary-soft hover:text-gold transition-all duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-4/5 max-w-xs shadow-soft md:hidden flex flex-col border-l border-white/10"
              style={{ backgroundColor: "var(--charcoal)" }}
            >
              <div className="flex justify-end p-5">
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
                  <X size={26} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-8 mt-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl py-4 border-b border-white/10 text-white hover:text-gold transition-all duration-300"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-8 text-center">
                <p className="font-script text-3xl text-gold">
                  {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
