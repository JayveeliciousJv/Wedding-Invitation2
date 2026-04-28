import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { WEDDING } from "@/lib/wedding-config";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(WEDDING.musicUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Try autoplay; most browsers will block until user interacts
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border border-gold/40 backdrop-blur-md shadow-soft transition-colors"
      style={{
        backgroundColor: "color-mix(in oklab, var(--charcoal) 70%, transparent)",
        color: "var(--gold)",
      }}
    >
      {playing ? <Music size={18} /> : <VolumeX size={18} />}
    </motion.button>
  );
}
