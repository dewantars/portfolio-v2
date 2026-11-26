import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HomeInteractiveBackground } from "@/components/home-interactive-background";

import { buildContactChannels, getSiteConfig } from "@/lib/data/site-config";
import { getExperiences } from "@/lib/data/experience";
import { getProjects } from "@/lib/data/projects";
import { getSkillGroups } from "@/lib/data/skills";
import { getCertifications } from "@/lib/data/certifications";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [siteConfig, experiences, projects, skillGroups, certifications] =
    await Promise.all([
      getSiteConfig(),
      getExperiences({ featuredOnly: true }),
      getProjects({ featuredOnly: true }),
      getSkillGroups(),
      getCertifications({ featuredOnly: true }),
    ]);

  const channels = buildContactChannels(siteConfig);

  return (
    <>
      <HomeInteractiveBackground />
      <main id="top">
        <Hero siteConfig={siteConfig} />
        <About siteConfig={siteConfig} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills skillGroups={skillGroups} />
        <Achievements certifications={certifications} />
        <Contact siteConfig={siteConfig} channels={channels} />
      </main>
      <ScrollReveal />
    </>
  );
}
