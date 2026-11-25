import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import People from "@/components/People";
import How from "@/components/How";
import MathSection from "@/components/MathSection";
import Features from "@/components/Features";
import Who from "@/components/Who";
import Promises from "@/components/Promises";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stats />
      <People />
      <How />
      <MathSection />
      <Features />
      <Who />
      <Promises />
      <Pricing />
      <Faq />
      <Closing />
    </main>
  );
}
