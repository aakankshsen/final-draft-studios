import Navbar from "@/components/Navbar";
import LogoIntro from "@/components/LogoIntro";
import OurWork from "@/components/OurWork";
import Hero from "@/components/Hero";
import ClientReel from "@/components/ClientReel";
import ArrowTransition from "@/components/ArrowTransition";
import Deliverables from "@/components/Deliverables";
import Vision from "@/components/Vision";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <LogoIntro />
      <OurWork />
      <Hero />
      <ClientReel />
      <ArrowTransition />
      <Deliverables />
      <Vision />
      <Studio />
      <Contact />
    </main>
  );
}