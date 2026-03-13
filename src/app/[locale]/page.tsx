import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import PlatformBanner from "@/components/landing/PlatformBanner";
import Demo from "@/components/landing/Demo";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CTAFinal from "@/components/landing/CTAFinal";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PlatformBanner />
      <Demo />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </main>
  );
}
