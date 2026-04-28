import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/wedding/Envelope";
import { Navbar } from "@/components/wedding/Navbar";
import { Hero } from "@/components/wedding/Hero";
import { Timeline } from "@/components/wedding/Timeline";
import { Details } from "@/components/wedding/Details";
import { Venue } from "@/components/wedding/Venue";
import { FAQ } from "@/components/wedding/FAQ";
import { Registry } from "@/components/wedding/Registry";
import { Entourage } from "@/components/wedding/Entourage";
import { RSVP } from "@/components/wedding/RSVP";
import { Footer } from "@/components/wedding/Footer";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { ScrollHint } from "@/components/wedding/ScrollHint";
import { MusicToggle } from "@/components/wedding/MusicToggle";

const Index = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.title = "Dexter & Joy — Wedding Invitation · June 13, 2026";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Join Dexter & Joy on June 13, 2026 at 1:30 PM (PHT) to celebrate their wedding in Goa, Camarines Sur. RSVP, view venue details, and the day's timeline."
      );
    }
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="envelope" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Envelope onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <Timeline />
              <Details />
              <Venue />
              <Registry />
              <Entourage />
              <FAQ />
              <RSVP />
            </main>
            <Footer />
            <ScrollHint />
            <MusicToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
