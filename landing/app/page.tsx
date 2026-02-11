import { Hero } from "@/components/Hero";
import { PricingSection } from "@/components/PricingSection";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-w-0 w-full">
      <Hero />
      <PricingSection />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
