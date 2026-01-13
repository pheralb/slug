import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/Hero";
import FeatureSection from "@/components/landing/FeatureSection";
import Stats from "@/components/landing/Stats";
import LogoCloud from "@/components/landing/LogoCloud";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export default async function Home() {
  return (
    <main className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-neutral-900" />
      <Hero />
      <FeatureSection />
    <Stats />
    <LogoCloud />
    <Testimonials />
    <CTA />
      <Footer className="fixed bottom-0 mt-4 py-4" />
    </main>
  );
}
