"use client";

import { useState } from "react";
import { useForm } from "@/components/useForm";

/** Prayer request form. Posts to /api/form (kind "prayer"). `dark` flips label colours for green sections. */
export default function PrayerForm({ dark = false }: { dark?: boolean }) {
  const { submit, status, error } = useForm("prayer");
  const [wantsCall, setWantsCall] = useState(false);
  const label = `label ${dark ? "text-cream" : ""}`;

  if (status === "sent") {
    return (
      <div className={`rounded-sm border-2 border-gold p-8 ${dark ? "text-cream" : ""}`} role="status">
        <p className="display text-3xl">We’ve got it.</p>
        <p className="mt-3">Your request is with our pastors and the prayer team. You don’t have to carry it by yourself.</p>
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
          request: f.get("request"),
          name: f.get("name"),
          contact: f.get("contact"),
          confidential: f.get("confidential") === "on",
          wantsCall,
          website: f.get("website"),
        });
      }}
    >
      <div>
        <label className={label} htmlFor="pr-request">
          What can we pray about?
        </label>
        <textarea id="pr-request" name="request" required rows={5} className="field" placeholder="Say as much or as little as you like." />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="pr-name">
            Your name <span className="font-normal opacity-70">(optional)</span>
          </label>
          <input id="pr-name" name="name" className="field" autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="pr-contact">
            Phone or email <span className="font-normal opacity-70">{wantsCall ? "(so we can reach you)" : "(optional)"}</span>
          </label>
          <input id="pr-contact" name="contact" className="field" required={wantsCall} />
        </div>
      </div>
      {/* Honeypot: people never see or fill this. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className={`flex items-start gap-3 text-[0.95rem] ${dark ? "text-cream" : ""}`}>
        <input type="checkbox" name="confidential" className="mt-1 h-5 w-5 accent-[#d2a43a]" />
        Keep this between me and the pastors
      </label>
      <label className={`flex items-start gap-3 text-[0.95rem] ${dark ? "text-cream" : ""}`}>
        <input type="checkbox" checked={wantsCall} onChange={(e) => setWantsCall(e.target.checked)} className="mt-1 h-5 w-5 accent-[#d2a43a]" />
        I’d like someone to call and pray with me
      </label>
      {status === "error" && (
        <p className="rounded-sm bg-wine px-4 py-3 text-sm text-cream" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-gold justify-self-start disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send prayer request"}
      </button>
    </form>
  );
}
