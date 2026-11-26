"use client";

import { variantA } from "@/lib/content-v2a";
import { VariantProvider } from "@/components/v2/variant";

/** Wraps a page in version 2-A's photographs and words. */
export default function ProviderA({ children }: { children: React.ReactNode }) {
  return <VariantProvider value={variantA}>{children}</VariantProvider>;
}
