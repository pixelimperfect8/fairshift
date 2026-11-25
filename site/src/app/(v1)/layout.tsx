import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoRibbon from "@/components/v2/DemoRibbon";

// The v1 design system (design-systems/payday). A built copy is served by this
// site from public/ds/v1; set NEXT_PUBLIC_DS_URL_V1 to point somewhere else.
const dsUrl = process.env.NEXT_PUBLIC_DS_URL_V1 || "/ds/v1/index.html";

// Version one: the product-led page.
export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <DemoRibbon href={dsUrl} round />
    </>
  );
}
