import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Deliverables from "@/components/Deliverables";
import Vision from "@/components/Vision";
import Principles from "@/components/Principles";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Deliverables />
      <Vision />
      <Principles />
      <Studio />
      <Contact />
    </main>
  );
}