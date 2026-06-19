"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Informational cookie notice. Analytics are loaded globally in layout.tsx
// regardless of this notice; dismissing it just hides the bar (remembered).
const KEY = "fdp-cookie-notice";

const CSS = `
.cookie-consent{position:fixed;bottom:1.5rem;left:1.5rem;z-index:150;max-width:24rem;display:flex;flex-direction:column;gap:0.8rem;background:rgba(15,10,30,0.96);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(168,85,247,0.35);border-radius:0.75rem;padding:1rem 1.1rem;box-shadow:0 12px 40px rgba(0,0,0,0.5);animation:ccIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;}
@keyframes ccIn{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:translateY(0);}}
.cookie-consent-text{display:flex;flex-direction:column;gap:0.3rem;font-size:0.8rem;color:#cbd5e1;line-height:1.45;}
.cookie-consent-text strong{color:#f1f5f9;font-size:0.92rem;}
.cookie-consent-text a{color:#c4b5fd;text-decoration:underline;}
.cookie-consent-actions{display:flex;gap:0.5rem;justify-content:flex-end;}
.cc-btn{font-size:0.8rem;font-weight:600;border-radius:0.45rem;padding:0.45rem 0.95rem;cursor:pointer;border:1px solid transparent;font-family:inherit;transition:background .15s,color .15s,border-color .15s,filter .15s;}
.cc-accept{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;}
.cc-accept:hover{filter:brightness(1.12);}
@media (max-width:640px){.cookie-consent{left:1rem;right:1rem;bottom:1rem;max-width:none;}}
@media (prefers-reduced-motion:reduce){.cookie-consent{animation:none;}}
`;

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setReady(true);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  if (!ready || dismissed) return null;

  return (
    <>
      <style>{CSS}</style>
      <div className="cookie-consent" role="dialog" aria-label="Cookie notice">
        <div className="cookie-consent-text">
          <strong>Cookies &amp; analytics</strong>
          <span>
            We use cookies and Google Analytics to understand traffic and improve
            FDP Client. By using this site you agree. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </span>
        </div>
        <div className="cookie-consent-actions">
          <button type="button" className="cc-btn cc-accept" onClick={dismiss}>
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
