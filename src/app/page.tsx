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

import { getProfile } from "@/lib/data/profile";
import { getExperiences } from "@/lib/data/experience";
import { getProjects } from "@/lib/data/projects";
import { getSkillGroups } from "@/lib/data/skills";
import { getAchievements } from "@/lib/data/achievements";
import { getSocialLinks } from "@/lib/data/socials";

export default async function Home() {
  const [profile, experiences, projects, skillGroups, achievements, socials] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getProjects(),
      getSkillGroups(),
      getAchievements(),
      getSocialLinks(),
    ]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-15%,rgba(255,255,255,0.07),transparent_25%)] bg-[#050505] text-[#fafafa]">
      <Navigation />
      <main id="top">
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills skillGroups={skillGroups} />
        <Achievements achievements={achievements} />
        <Contact socials={socials} />
      </main>
      <Footer name={profile?.name} />
      <ScrollReveal />
    </div>
  );
}
