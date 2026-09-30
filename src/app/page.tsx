import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-15%,rgba(255,255,255,0.07),transparent_25%)] bg-[#050505] text-[#fafafa]">
      <Navigation />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}
