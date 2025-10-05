
import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import {ProyectosSection} from "@/components/ProyectosSection";
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <ProyectosSection />
      <AboutSection />
      <FaqSection />
      <ContactForm />
      <Footer />
    </>
  );
}
