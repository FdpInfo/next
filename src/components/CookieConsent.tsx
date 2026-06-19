"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

// GDPR consent gate: Google Analytics (gtag) is NOT loaded until the visitor
// explicitly accepts. The choice is remembered in localStorage so the banner
// only shows once. Declining means no analytics scripts are ever injected.
const KEY = "fdp-cookie-consent";
const GA_ID = "G-3QHFR8NBFS";

type Consent = "granted" | "denied";

const CSS = `
.cookie-consent{position:fixed;bottom:1.5rem;left:1.5rem;z-index:150;max-width:24rem;display:flex;flex-direction:column;gap:0.8rem;background:rgba(15,10,30,0.96);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(168,85,247,0.35);border-radius:0.75rem;padding:1rem 1.1rem;box-shadow:0 12px 40px rgba(0,0,0,0.5);animation:ccIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;}
@keyframes ccIn{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:translateY(0);}}
.cookie-consent-text{display:flex;flex-direction:column;gap:0.3rem;font-size:0.8rem;color:#cbd5e1;line-height:1.45;}
.cookie-consent-text strong{color:#f1f5f9;font-size:0.92rem;}
.cookie-consent-text a{color:#c4b5fd;text-decoration:underline;}
.cookie-consent-actions{display:flex;gap:0.5rem;justify-content:flex-end;}
.cc-btn{font-size:0.8rem;font-weight:600;border-radius:0.45rem;padding:0.45rem 0.95rem;cursor:pointer;border:1px solid transparent;font-family:inherit;transition:background .15s,color .15s,border-color .15s,filter .15s;}
.cc-decline{background:transparent;border-color:rgba(148,163,184,0.35);color:#cbd5e1;}
.cc-decline:hover{background:rgba(148,163,184,0.15);color:#fff;}
.cc-accept{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;}
.cc-accept:hover{filter:brightness(1.12);}
@media (max-width:640px){.cookie-consent{left:1rem;right:1rem;bottom:1rem;max-width:none;}}
@media (prefers-reduced-motion:reduce){.cookie-consent{animation:none;}}
`;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "granted" || stored === "denied") setConsent(stored);
    } catch {
      /* localStorage unavailable (private mode) — just show the banner */
    }
    setReady(true);
  }, []);

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <>
          <style>{CSS}</style>
          <div
            className="cookie-consent"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
          >
            <div className="cookie-consent-text">
              <strong>We value your privacy</strong>
              <span>
                We use cookies and Google Analytics to understand site traffic.
                Analytics only run if you allow them. Read our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </div>
            <div className="cookie-consent-actions">
              <button
                type="button"
                className="cc-btn cc-decline"
                onClick={() => choose("denied")}
              >
                Decline
              </button>
              <button
                type="button"
                className="cc-btn cc-accept"
                onClick={() => choose("granted")}
              >
                Accept
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
