/*
 * Centered Dark Quiet developer portfolio.
 * Design reminder: keep the hero centered and spacious, make the animated particle
 * field a visible focal layer, and use TextType at key section anchors without
 * sacrificing static readability. GitHub activity is public-data-first; the token
 * in .env.local is intentionally never imported into client code.
 */

import Particles from "@/components/Particles";
import type { FlowingMenuItem } from "@/components/FlowingMenu";
import PillMarquee from "@/components/PillMarquee";
import TextType from "@/components/TextType";
import { ReactBitsCarousel, type ReactBitsCarouselItem } from "@/components/ui/react-bits-carousel";
import { InView } from "@/components/motion-primitives/in-view";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Check, ChevronDown, Code2, Copy, Database, ExternalLink, Eye, Github, GraduationCap, LayoutGrid, Linkedin, Mail, Menu, Network, Sliders, Sparkles, Users, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { createPlaceholderActivity, getConfiguredGithubUsername, loadGithubActivity, type GitHubActivity } from "@/lib/github";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiGit,
  SiMysql,
  SiGithub,
  SiSupabase,
  SiFigma,
} from "react-icons/si";
const skillIcons: Record<string, ReactNode> = {
  Python: <SiPython />,
  "C++": <SiCplusplus />,
  Javascript: <SiJavascript />,
  HTML: <SiHtml5 />,
  React: <SiReact />,
  Express: <SiExpress />,
  "Node.js": <SiNodedotjs />,
  SQL: <Database size={13} />, // no single "SQL" brand logo — keep the existing lucide icon
  Git: <SiGit />,
  MySQL: <SiMysql />,
  GitHub: <SiGithub />,
  Supabase: <SiSupabase />,
  Figma: <SiFigma />,
  // "other" group has no real logos — fall back to a neutral icon
  Leadership: <Sparkles size={13} />,
  "Public Speaking": <Sparkles size={13} />,
  "Active Listening": <Sparkles size={13} />,
  Communication: <Sparkles size={13} />,
  Adaptability: <Sparkles size={13} />,
  "Problem Solving": <Sparkles size={13} />,
};



const profile = {
  name: "Pete Alexander Piangco",
  role: "BSCS - 3",
  intro: "Passionate about making the world an efficient and better place through technology.",
  email: "petepiangco.school@gmail.com",
  interests: ["AI", "Web Development", "Full-Stack Development"],
};

const skillGroups = [
  { id: "languages", label: "Languages / Frameworks", icon: <Code2 size={15} />, items: ["Python", "C++", "Javascript", "HTML", "CSS", "React", "Express", "Node.js", "SQL", "Git"] },
  { id: "tools", label: "Tools", icon: <Database size={15} />, items: ["MySQL", "GitHub", "Supabase", "Figma"] },
  { id: "other", label: "Other skills", icon: <Users size={15} />, items: ["Leadership", "Public Speaking", "Active Listening", "Communication", "Adaptability", "Problem Solving"] },
];

const skillPills = skillGroups.flatMap((group) =>
  group.items.map((item, index) => ({
    id: `${group.id}-${index}`,
    label: item,
    meta: group.label,
    href: "#skills",
    icon: skillIcons[item],
  }))
);
const projects: ReactBitsCarouselItem[] = [
  { id: "project-one", title: "VERIS Site", description: "The official marketing and information site of VERIS.", icon: <Network size={17} />, meta: "Web Development", role: "Project Lead", stack: "Next.js, Supabase, Tailwind CSS, TypeScript, Vercel", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", href: "#replace-with-project-link" },
  { id: "project-two", title: "VSU E-Pasaporte", description: "Digital campus itinerary for the VSU student onboarding.", icon: <Code2 size={17} />, meta: "Front-End Development", role: "Front-End Developer", stack: "Tailwind CSS", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop", href: "#replace-with-github-link" },
  { id: "project-three", title: "ARAW.ai", description: "Student Virtual Assistant and Management Portal for VSU.", icon: <Sparkles size={17} />, meta: "AI & Web Development", role: "Full-Stack Developer", stack: "Next.js, Supabase, Tailwind CSS, TypeScript, Vercel", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", href: "#replace-with-project-link" },
];

const organizationItems = [
  { id: "org-1", year: "2025 — Present", role: "Frontend Developer", organization: "VERIS", icon: <Network size={13} />, description: "Led the creation of the VERIS site, the organization's official marketing and information platform." },
  { id: "org-2", year: "2025 — Present", role: "Treasurer", organization: "FC SSC", icon: <Users size={13} />, description: "Responsible for the organization's financial management and bookkeeping." },
  { id: "org-3", year: "2024-2025", role: "Quality Assurance", organization: "VERIS", icon: <Network size={13} />, description: "Monitored and maintained the integrity and functionality of the VERIS platform." },
  { id: "org-4", year: "2024-2025", role: "Board of Director — Socio-Cultural Affairs & Sports", organization: "FC SSC", icon: <Users size={13} />, description: "Managed and organized around 500 student athlete profiles during the Salingkusog 2025 Luring as Sirens Faction Assistant General Athletics Manager." },
  { id: "org-5", year: "2024-2025", role: "Alternative Education Committee Mentor", organization: "FC SSC", icon: <BookOpen size={13} />, description: "Mentored 30 students and collaborated with 3 fellow mentors to create a supportive study group." },
];

const educationRecord = {
  icon: <GraduationCap size={18} />,
  title: "Bachelors of Science in Computer Science",
  organization: "Visayas State University",
  detail: "2024 — Present",
};

const credentialGroups = [
  {
    id: "achievements",
    title: "Achievements",
    icon: <Award size={16} />,
    items: [
      { icon: <Award size={14} />, title: "ByteForward Hackathon 2024", organization: "Rev 21 Labs", detail: "1st Runner Up" },
      { icon: <Award size={14} />, title: "CS Week Hackathon 2025", organization: "CS3", detail: "2nd Runner Up" },
    ],
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: <Check size={16} />,
    items: [
      { icon: <Award size={14} />, title: "Introduction to Data Science", organization: "Cisco Networking Academy", detail: "Aug 18, 2026 - 6 hours" },
    ],
  },
];

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

type ActivityStatus = "placeholder" | "loading" | "live" | "error";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <InView className={className} once variants={fadeUp} transition={{ duration: 0.38, delay }} viewOptions={{ amount: 0.15 }}>{children}</InView>;
}

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  const reduceMotion = useReducedMotion();
  return <div className="section-heading"><div className="section-heading-meta"></div><div className="section-heading-main"><h2>{reduceMotion ? title : <TextType as="span" text={title} typingSpeed={24} pauseDuration={4200} deletingSpeed={12} loop={false} showCursor={true} cursorCharacter="_" startOnVisible />}</h2></div></div>;
}

function PlaceholderBadge({ children }: { children: ReactNode }) {
  return <Badge variant="outline" className="dark-badge">{children}</Badge>;
}

function formatActivityStatus(status: ActivityStatus, activity: GitHubActivity) {
  if (status === "loading") return "fetching / github contribution calendar";
  if (status === "live") return `live / github.com/${activity.login}`;
  if (status === "error") return "unavailable / showing placeholder activity";
  return "setup / add VITE_GITHUB_USERNAME in .env.local";
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSkillGroup, setActiveSkillGroup] = useState<string | null>("languages");
  const [activeCredentialGroup, setActiveCredentialGroup] = useState<string | null>(null);
  const [projectsView, setProjectsView] = useState<"carousel" | "grid">("carousel");
  const [modalProject, setModalProject] = useState<ReactBitsCarouselItem | null>(null);
  const [activity, setActivity] = useState<GitHubActivity>(() => createPlaceholderActivity(getConfiguredGithubUsername() || "yourusername"));
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>(() => getConfiguredGithubUsername() ? "loading" : "placeholder");

  useEffect(() => {
    const username = getConfiguredGithubUsername();
    if (!username) {
      setActivity(createPlaceholderActivity());
      setActivityStatus("placeholder");
      return;
    }

    const controller = new AbortController();
    setActivityStatus("loading");
    loadGithubActivity(username, controller.signal)
      .then((nextActivity) => {
        setActivity(nextActivity);
        setActivityStatus(nextActivity.source === "live" ? "live" : "placeholder");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setActivity(createPlaceholderActivity(username));
        setActivityStatus("error");
      });

    return () => controller.abort();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    setMobileOpen(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const visibleWeeks = activity.weeks.slice(-20);
  const contributionSummary = activityStatus === "live" ? `${activity.totalContributions.toLocaleString()} contributions in the last year for ${activity.login}.` : "A contribution calendar will appear here after you add a public GitHub username.";

  return (
    <div className="dark-shell">
      <header className="dark-header">
        <nav className={`dark-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Portfolio sections">
          <button type="button" onClick={() => scrollTo("about")}>Home</button>
          <button type="button" onClick={() => scrollTo("experience")}>Experience</button>
          <button type="button" onClick={() => scrollTo("organization")}>Organization Work</button>
          <button type="button" onClick={() => scrollTo("skills")}>Skills</button>
          <button type="button" onClick={() => scrollTo("projects")}>Projects</button>
          <button type="button" onClick={() => scrollTo("education-credentials")}>Education</button>
          <button type="button" onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
      </header>

      <main>
        <section id="about" className="dark-section about-section centered-landing">
          {!reduceMotion && <div className="hero-particles" aria-hidden="true"><Particles particleColors={["#ffffff", "#92928f", "#555552"]} particleCount={180} particleSpread={12} speed={0.08} moveParticlesOnHover particleHoverFactor={0.65} alphaParticles={false} particleBaseSize={48} sizeRandomness={1.2} cameraDistance={20} disableRotation={false} pixelRatio={1} /></div>}
          <div className="hero-veil" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="profile-intro centered-hero-content">
            <Reveal delay={0.12}><h1 className="hero-display"><span className="hero-name">{profile.name}</span>{reduceMotion ? <span className="hero-static-type">[building thoughtful software]</span> : <TextType as="span" text={["[building thoughtful software]", "[exploring data and interfaces]", "[learning in public]"]} typingSpeed={47} pauseDuration={1500} deletingSpeed={24} loop showCursor cursorCharacter="_" cursorClassName="hero-cursor" startOnVisible />}</h1></Reveal>
            <Reveal delay={0.18}><p className="about-lede centered-lede">{profile.intro}</p></Reveal>
            <Reveal delay={0.24}><div className="about-links centered-links"><Magnetic range={110}><a className="text-link strong-link" href="#projects" onClick={(event) => { event.preventDefault(); scrollTo("projects"); }}>View selected work <ArrowDown size={14} /></a></Magnetic><button className="text-link" type="button" onClick={() => scrollTo("contact")}>Get in touch <ArrowRight size={14} /></button></div></Reveal>
            <Reveal delay={0.3}><div className="about-facts centered-facts"><div><span>program / level</span><strong>{profile.role}</strong></div><div><span>interests / goals</span><strong>{profile.interests[0]}</strong></div><div><span>working style</span><strong>[curious, consistent, learning in public]</strong></div></div></Reveal>
          </div>
          <Reveal delay={0.1}><div className="activity-strip hero-activity"><div className="activity-heading"><div className="activity-handle"><span className="github-mark"><Github size={15} /></span><div><strong>{activity.login === "yourusername" ? "[github-username]" : activity.login}</strong><small>{formatActivityStatus(activityStatus, activity)}</small></div></div><div className="activity-total"><strong>{activityStatus === "live" ? activity.totalContributions.toLocaleString() : "000"}</strong><span>contributions</span></div></div><div className="activity-grid-frame"><div className="activity-grid" role="img" aria-label={contributionSummary}>{visibleWeeks.map((week, weekIndex) => <div className="activity-week" key={`week-${weekIndex}`}>{week.days.map((day) => <span key={day.date} aria-hidden="true" title={`${day.date}: ${day.count} contributions`} className={`activity-cell level-${day.level}`} />)}</div>)}</div></div><div className="activity-footer"><span>less to more activity</span>{activityStatus === "live" ? <a href={activity.profileUrl} target="_blank" rel="noreferrer">open github profile <ExternalLink size={11} /></a> : <span>{formatActivityStatus(activityStatus, activity)}</span>}</div><p className="sr-only">{contributionSummary}</p></div></Reveal>
        </section>

        <section id="organization" className="dark-section timeline-section">
          <SectionHeading number="02" title="Organization Work" description="Show how you contribute beyond code: student groups, committees, communities, and events." />
          <div className="timeline-container" style={{ marginTop: 55, borderLeft: '1px solid var(--line-strong)', marginLeft: 15, paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 40 }}>
            {organizationItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1}>
                <div className="timeline-item" style={{ position: 'relative' }}>
                  <div className="timeline-marker" style={{ position: 'absolute', left: -36, top: 4, width: 22, height: 22, borderRadius: '50%', background: '#1c1c1b', border: '1px solid var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--quiet)' }}>
                    {item.icon}
                  </div>
                  <div className="timeline-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: 'var(--faint)', fontFamily: "'DM Mono', monospace", fontSize: 9 }}>{item.year}</span>
                      <span style={{ width: 20, height: '1px', background: 'var(--line-strong)' }} />
                      <span style={{ color: 'var(--quiet)', fontFamily: "'DM Mono', monospace", fontSize: 9, textTransform: 'uppercase' as const }}>{item.organization}</span>
                    </div>
                    <h3 style={{ margin: '9px 0 0', color: 'var(--text)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>{item.role}</h3>
                    <p style={{ marginTop: 10, color: 'var(--quiet)', fontSize: 12, lineHeight: 1.55, maxWidth: 520 }}>{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="dark-section skills-section">
          <SectionHeading number="03" title="Skills" description="A compact inventory of the languages, data tools, and technical skills you are building." />
          <Reveal delay={0.08}>
            <div className="skills-accordion-list">
              {skillGroups.map((group) => {
                const isOpen = activeSkillGroup === group.id;
                const groupPills = group.items.map((item, index) => ({
                  id: `${group.id}-${index}`,
                  label: item,
                  meta: group.label,
                  href: "#skills",
                  icon: skillIcons[item],
                }));

                return (
                  <div key={group.id} className={`skills-accordion-item ${isOpen ? "is-active" : ""}`}>
                    <button
                      type="button"
                      className="skills-accordion-trigger"
                      onClick={() => setActiveSkillGroup(isOpen ? null : group.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="skills-accordion-label">
                        <span className="skills-accordion-icon">{group.icon}</span>
                        <span className="skills-accordion-title">{group.label}</span>
                      </div>
                      <span className="skills-accordion-arrow">
                        {isOpen ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="skills-accordion-content">
                            <PillMarquee items={groupPills} ariaLabel={`${group.label} moving skills track`} duration={24} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section id="projects" className="dark-section projects-section">
          <SectionHeading number="04" title="Projects" description="A visual showcase and interactive gallery for the work you want to show off." />

          <div className="projects-header-actions">
            <Reveal delay={0.05}>
              <div className="projects-view-toggle" role="tablist" aria-label="Project view mode">
                <button
                  type="button"
                  className={`projects-view-btn ${projectsView === "carousel" ? "is-active" : ""}`}
                  onClick={() => setProjectsView("carousel")}
                  role="tab"
                  aria-selected={projectsView === "carousel"}
                >
                  <Sliders size={13} /> Carousel Showcase
                </button>
                <button
                  type="button"
                  className={`projects-view-btn ${projectsView === "grid" ? "is-active" : ""}`}
                  onClick={() => setProjectsView("grid")}
                  role="tab"
                  aria-selected={projectsView === "grid"}
                >
                  <LayoutGrid size={13} /> Visual Grid
                </button>
              </div>
            </Reveal>
          </div>

          {projectsView === "carousel" ? (
            <Reveal delay={0.08}>
              <ReactBitsCarousel
                items={projects}
                baseWidth={780}
                loop
                autoplay={false}
                pauseOnHover
                onImageClick={(item) => setModalProject(item)}
              />
            </Reveal>
          ) : (
            <Reveal delay={0.08}>
              <div className="project-gallery-grid">
                {projects.map((project) => (
                  <article key={project.id} className="project-card">
                    {project.image && (
                      <div
                        className="project-card-image-wrap"
                        onClick={() => setModalProject(project)}
                        role="button"
                        tabIndex={0}
                        title="Click to view screenshot"
                      >
                        <img src={project.image} alt={project.title} />
                        {project.meta && <span className="project-card-tag">{project.meta}</span>}
                      </div>
                    )}
                    <div className="project-card-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      {project.stack && (
                        <div className="project-card-stack">
                          {project.stack.split(",").map((tech, i) => (
                            <span key={i} className="project-stack-pill">{tech.trim()}</span>
                          ))}
                        </div>
                      )}
                      <div className="project-card-footer">
                        {project.image && (
                          <button type="button" onClick={() => setModalProject(project)}>
                            <Eye size={13} /> Preview Image
                          </button>
                        )}
                        {project.href && (
                          <a href={project.href} target="_blank" rel="noreferrer">
                            View Details <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.12}>
            <p className="component-caption">
              <span /> Visual project showcase / click any image to enlarge <span />
            </p>
          </Reveal>
        </section>

        <section id="education-credentials" className="dark-section education-section">
          <SectionHeading number="05" title="Education & Credentials" description="Keep your degree, achievements, and certifications in one concise record." />

          <Reveal delay={0.08}>
            <article className="education-card">
              <div className="education-card-main">
                <span className="education-card-icon">{educationRecord.icon}</span>
                <div className="education-card-copy">
                  <span className="education-card-label">current program</span>
                  <h3>{educationRecord.title}</h3>
                  <p>{educationRecord.organization}</p>
                </div>
              </div>
              <div className="education-card-footer"><span>{educationRecord.detail}</span><PlaceholderBadge>in progress</PlaceholderBadge></div>
            </article>
          </Reveal>

          <div className="credential-dropdown-list">
            {credentialGroups.map((group, groupIndex) => {
              const isOpen = activeCredentialGroup === group.id;
              return (
                <Reveal key={group.id} delay={0.14 + groupIndex * 0.06}>
                  <div className={`credential-dropdown ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="credential-dropdown-trigger"
                      onClick={() => setActiveCredentialGroup(isOpen ? null : group.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${group.id}-content`}
                    >
                      <span className="credential-dropdown-label"><span className="credential-dropdown-icon">{group.icon}</span><span>{group.title}</span></span>
                      <ChevronDown className="credential-dropdown-arrow" size={17} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`${group.id}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="credential-dropdown-content">
                            {group.items.map((item, index) => (
                              <article className="credential-item" key={`${group.id}-${index}`}>
                                <span className="credential-item-icon">{item.icon}</span>
                                <div className="credential-item-primary"><strong>{item.title}</strong><span>{item.organization}</span></div>
                              </article>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="contact" className="dark-section contact-section">
          <SectionHeading number="06" title="Contact" description="Use this closing line as your professional invitation to connect." />
          <Reveal delay={0.08}><div className="contact-line"><div className="contact-copy"><span className="contact-kicker"><Mail size={14} /> contact / open to a conversation</span><h3>Let&apos;s build something useful.</h3><p>Open to opportunities.  </p></div><div className="contact-actions"><button className="email-link" type="button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "[email copied]" : profile.email}</button><div className="social-links"><a href="https://www.linkedin.com/in/pete-piangco/"><Linkedin size={14} /> LinkedIn <ExternalLink size={11} /></a><a href="https://github.com/Filch119"><Github size={14} /> GitHub <ExternalLink size={11} /></a></div></div></div></Reveal>
          <footer className="dark-footer"><span>Pete Alexander Piangco / portfolio</span><span>© 2026 Pete Alexander N. Piangco</span><button type="button" onClick={() => scrollTo("about")}>back to top ↑</button></footer>
        </section>
      </main>

      <AnimatePresence>{mobileOpen && <motion.div className="mobile-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="lightbox-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
          >
            <motion.div
              className="lightbox-dialog"
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close-btn"
                type="button"
                onClick={() => setModalProject(null)}
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>
              {modalProject.image && (
                <div className="lightbox-media-wrap">
                  <img src={modalProject.image} alt={modalProject.title} />
                </div>
              )}
              <div className="lightbox-info">
                <h3>{modalProject.title}</h3>
                <p>{modalProject.description}</p>
                {modalProject.stack && <p style={{ marginTop: 8, color: "var(--faint)", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>Tools: {modalProject.stack}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
