import type { Metadata } from "next";
import { TermsContent } from "./TermsContent";

export const metadata: Metadata = {
  title: "FDP Client Terms & Conditions",
  alternates: { canonical: "https://fdpinfo.github.io/next/terms" },
};

export default function TermsPage() {
  return <TermsContent />;
}
