"use client";

import { useForm } from "@/components/useForm";

const TOPICS = ["A question about visiting", "Zoom link for Thursday Bible study", "Winter coat drive / holiday drives", "God Hears Her women’s ministry", "Kingdom Kulture Kidz & Krew", "Something else"];

/** General contact form. Posts to /api/form (kind "contact"). */
export default function ContactForm({ topic }: { topic?: string }) {
  const { submit, status, error } = useForm("contact");

  if (status === "sent") {
    return (
      <div className="rounded-sm border-2 border-gold p-8" role="status">
        <p className="display text-3xl">Message sent.</p>
        <p className="mt-3">Thank you for reaching out. Someone from Kingdom Impact will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        submit({
          name: f.get("name"),
          email: f.get("email"),
          phone: f.get("phone"),
          topic: f.get("topic"),
          message: f.get("message"),
          company: f.get("company"),
        });
      }}
    >
      <div>
        <label className="label" htmlFor="c-name">
          First and last name
        </label>
        <input id="c-name" name="name" required className="field" autoComplete="name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-email">
            Email
          </label>
          <input id="c-email" name="email" type="email" className="field" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">
            Phone
          </label>
          <input id="c-phone" name="phone" type="tel" className="field" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="c-topic">
          What is this about?
        </label>
        <select id="c-topic" name="topic" className="field" defaultValue={topic && TOPICS.includes(topic) ? topic : TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="c-message">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={5} className="field" />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {status === "error" && (
        <p className="rounded-sm bg-wine px-4 py-3 text-sm text-cream" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-forest justify-self-start disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
