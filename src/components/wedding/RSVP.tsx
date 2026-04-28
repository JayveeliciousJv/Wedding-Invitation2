import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Heart, X as XIcon } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

type Mode = "accept" | "decline";
type Status = "idle" | "loading" | "success" | "error";

export function RSVP() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      response: mode ?? "accept",
      timestamp: new Date().toISOString(),
    };
    fd.forEach((v, k) => (payload[k] = String(v).trim()));

    // Required validation: name + phone
    if (!payload.name || !payload.phone) {
      setStatus("error");
      setErrorMsg("Name and phone number are required.");
      return;
    }

    try {
      if (!WEDDING.rsvpEndpoint) {
        await new Promise((r) => setTimeout(r, 800));
        setStatus("success");
        return;
      }
      await fetch(WEDDING.rsvpEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="rsvp" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          eyebrow="Kindly Respond"
          title="Will You Attend?"
          subtitle={`Please reply by ${WEDDING.rsvpDeadline}`}
        />

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-warm-white border border-gold/30 rounded-2xl p-10 md:p-14 text-center shadow-soft"
          >
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 border border-gold/30"
              style={{ backgroundColor: "color-mix(in oklab, var(--gold) 12%, transparent)" }}
            >
              <Check className="text-gold" size={28} />
            </div>
            <h3 className="font-script text-4xl text-gold">Thank You!</h3>
            <p className="mt-3 text-muted-foreground">
              {mode === "accept"
                ? "We can't wait to celebrate with you."
                : "We'll miss you, but appreciate your reply."}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setMode(null);
              }}
              className="mt-6 text-xs tracking-[0.3em] uppercase text-gold hover:text-gold-hover transition-colors"
            >
              Submit another response
            </button>
          </motion.div>
        ) : mode === null ? (
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            <ChoiceCard
              icon={<Heart size={22} />}
              eyebrow="Joyfully"
              title="Accept"
              description="I'll be there to celebrate"
              variant="accept"
              onClick={() => setMode("accept")}
            />
            <ChoiceCard
              icon={<XIcon size={22} />}
              eyebrow="Regretfully"
              title="Decline"
              description="I'm unable to attend"
              variant="decline"
              onClick={() => setMode("decline")}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="bg-warm-white rounded-2xl shadow-soft border border-border p-6 sm:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
                    {mode === "accept" ? "Joyfully Accept" : "Regretfully Decline"}
                  </p>
                  <h3 className="font-serif text-2xl mt-1">Your Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMode(null);
                    setStatus("idle");
                    setErrorMsg("");
                  }}
                  className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors"
                >
                  ← Change
                </button>
              </div>

              <form onSubmit={submit} className="space-y-6" noValidate>
                <Field label="Full Name *" name="name" required maxLength={100} />
                <Field label="Phone Number *" name="phone" type="tel" required maxLength={30} />
                <Field label="Email" name="email" type="email" maxLength={120} />

                {mode === "decline" && (
                  <Field label="Reason" name="reason" placeholder="Optional" maxLength={200} />
                )}
                <TextField label="Note" name="note" placeholder="A message for us" maxLength={500} />

                {status === "error" && (
                  <p className="text-sm text-destructive">{errorMsg || "Submission failed."}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 py-4 rounded-full font-medium tracking-[0.3em] text-xs uppercase shadow-soft transition-all duration-300 hover-glow disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2 ${
                      mode === "accept"
                        ? "bg-gold hover:bg-gold-hover"
                        : "bg-transparent border border-gold text-gold hover:bg-gold hover:text-[#1a1a1a]"
                    }`}
                    style={mode === "accept" ? { color: "#1a1a1a" } : undefined}
                  >
                    {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                    Send Response
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

function ChoiceCard({
  icon,
  eyebrow,
  title,
  description,
  variant,
  onClick,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  variant: "accept" | "decline";
  onClick: () => void;
}) {
  const isAccept = variant === "accept";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative cursor-pointer text-left rounded-2xl border p-7 sm:p-9 transition-all duration-300 hover:shadow-glow-gold ${
        isAccept ? "bg-warm-white border-gold/40" : "bg-warm-white border-border"
      }`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border ${
          isAccept ? "border-gold/40 text-gold" : "border-border text-muted-foreground"
        }`}
        style={
          isAccept
            ? { backgroundColor: "color-mix(in oklab, var(--gold) 12%, transparent)" }
            : { backgroundColor: "color-mix(in oklab, var(--charcoal) 5%, transparent)" }
        }
      >
        {icon}
      </div>
      <p className={`mt-5 text-[10px] tracking-[0.3em] uppercase ${isAccept ? "text-gold" : "text-muted-foreground"}`}>
        {eyebrow}
      </p>
      <h3 className="font-serif text-3xl mt-1">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <span
        className={`inline-flex items-center gap-2 mt-5 text-[10px] tracking-[0.3em] uppercase transition-colors ${
          isAccept ? "text-gold" : "text-muted-foreground group-hover:text-gold"
        }`}
      >
        Select →
      </span>
    </motion.button>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        {...rest}
        className="w-full bg-background border border-input rounded-full px-5 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300"
      />
    </label>
  );
}

function TextField({
  label,
  name,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
        {label}
      </span>
      <textarea
        name={name}
        rows={3}
        {...rest}
        className="w-full bg-background border border-input rounded-2xl px-5 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 resize-none"
      />
    </label>
  );
}
