import type { Metadata } from "next"

import "./prototype.css"
import { Shell } from "./_components/shell"

export const metadata: Metadata = {
  title: "FairShift · employer setup (prototype)",
  description:
    "A clickable prototype of FairShift employer onboarding. Sample data only.",
}

export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Shell>{children}</Shell>
}
