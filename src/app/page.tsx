import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import {
  buildHomePageSchema,
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
} from "@/lib/seo";

const ServiceSection = dynamic(() =>
  import("@/components/ServiceSection").then((mod) => mod.ServiceSection)
);
const ProyectosSection = dynamic(() =>
  import("@/components/ProyectosSection").then((mod) => mod.ProyectosSection)
);
const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then((mod) => mod.AboutSection)
);
const FaqSection = dynamic(() =>
  import("@/components/FaqSection").then((mod) => mod.FaqSection)
);
const ContactForm = dynamic(() =>
  import("@/components/ContactForm").then((mod) => mod.ContactForm)
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer)
);

export const metadata: Metadata = {
  title: {
    absolute: SITE_DEFAULT_TITLE,
  },
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomePageSchema()} />
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
