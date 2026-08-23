import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import About from "@/components/Home/About";
import HowItWorks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Testimonials from "@/components/Home/Testimonials";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <About />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
