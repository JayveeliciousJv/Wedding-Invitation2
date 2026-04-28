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

  const form = e.currentTarget; // ✅ SAVE REFERENCE HERE
  const fd = new FormData(form);

  const payload: Record<string, string> = {
    status: mode === "accept" ? "Accept" : "Decline",
    fullName: "",
    phone: "",
    email: "",
    note: "",
    reason: "",
    timestamp: new Date().toISOString(),
  };

  fd.forEach((value, key) => {
    const v = String(value).trim();

    switch (key) {
      case "name":
        payload.fullName = v;
        break;
      case "phone":
        payload.phone = v;
        break;
      case "email":
        payload.email = v;
        break;
      case "note":
        payload.note = v;
        break;
      case "reason":
        payload.reason = v;
        break;
    }
  });

  try {
    await fetch(WEDDING.rsvpEndpoint, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });

    setStatus("success");

    // ✅ SAFE RESET
    form.reset();
  } catch (err) {
    setStatus("error");
    setErrorMsg("Something went wrong");
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
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 border border-gold/30 bg-gold/10">
              <Check className="text-gold" size={28} />
            </div>

            <h3 className="font-script text-4xl text-gold">Thank You!</h3>

            <p className="mt-3 text-muted-foreground">
              {mode === "accept"
                ? "We can't wait to celebrate with you."
                : "We'll miss you, but appreciate your response."}
            </p>

            <button
              onClick={() => {
                setStatus("idle");
                setMode(null);
              }}
              className="mt-6 text-xs tracking-[0.3em] uppercase text-gold hover:text-gold-hover"
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
              className="bg-warm-white rounded-2xl shadow-soft border border-border p-6 sm:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
                    {mode === "accept" ? "Accept Invitation" : "Decline Invitation"}
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
                  className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  ← Back
                </button>
              </div>

              <form onSubmit={submit} className="space-y-6">
                <Field label="Full Name *" name="name" required />
                <Field label="Phone Number *" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" />

                {mode === "decline" && (
                  <Field label="Reason" name="reason" placeholder="Optional" />
                )}

                <TextField label="Note" name="note" placeholder="Message for us" />

                {status === "error" && (
                  <p className="text-sm text-red-500">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full py-4 rounded-full uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 transition-all ${
                    mode === "accept"
                      ? "bg-gold text-black hover:bg-gold/80"
                      : "border border-gold text-gold hover:bg-gold hover:text-black"
                  }`}
                >
                  {status === "loading" && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  Send Response
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

/* -------------------- UI COMPONENTS -------------------- */

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
      className={`rounded-2xl border p-7 text-left ${
        isAccept ? "border-gold/40" : "border-border"
      }`}
    >
      <div className="mb-4">{icon}</div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="text-2xl font-serif mt-1">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </motion.button>
  );
}

function Field({
  label,
  name,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        {...props}
        className="w-full mt-2 border rounded-full px-4 py-3 focus:ring-2 focus:ring-gold"
      />
    </label>
  );
}

function TextField({
  label,
  name,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <textarea
        name={name}
        rows={3}
        {...props}
        className="w-full mt-2 border rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-gold"
      />
    </label>
  );
}
