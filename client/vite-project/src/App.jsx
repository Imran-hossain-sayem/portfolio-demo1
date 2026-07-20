import { useEffect, useMemo, useState } from "react";
import "./index.css";
import "./App.css";
import SectionTitle from "./components/SectionTitle";
import {
  achievements,
  interests,
  profile,
  projects,
  research,
  skills,
  timeline,
} from "./data/portfolioData";

const API_URL = import.meta.env.VITE_API_URL;
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedRole, setTypedRole] = useState(profile.headline.split(" • ")[0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const roles = useMemo(() => profile.headline.split(" • "), []);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % roles.length;
      setTypedRole(roles[index]);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [roles]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please complete all fields so I can respond thoughtfully.");
      return;
    }

    if (!API_URL) {
      setFormStatus(`Thanks for reaching out. Please email ${profile.email} directly for a faster reply.`);
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setFormStatus(data.message || data.error || "Message sent successfully.");

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error(error);
      setFormStatus("The contact service is unavailable right now. Please email me directly.");
    }
  };

  return (
    <div className="app-shell">
      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">◉</span>
          <span>{profile.name}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero content-section reveal" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Available for AI, research, and software opportunities</p>
            <p className="hero-role">{profile.role}</p>
            <h1>
              Hello,
              <br />
              I&apos;m <span>{profile.name}</span>
            </h1>
            <div className="typing-line" aria-live="polite">
              <span>{typedRole}</span>
              <span className="typing-cursor">|</span>
            </div>
            <p className="hero-intro">
              {profile.intro}
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={profile.resume || "#contact"}>
                Download Resume
              </a>
              <a className="btn btn-secondary" href="#projects">
                View Projects
              </a>
              <a className="btn btn-secondary" href="#contact">
                Contact Me
              </a>
            </div>

            <div className="social-row" aria-label="Social links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-shell">
              <img src={profile.photo} alt={profile.name} loading="eager" />
            </div>
          </div>
        </section>

        <section className="content-section reveal" id="about">
          <SectionTitle
            eyebrow="About"
            title="Crafting intelligent systems with curiosity and purpose"
            description="My journey blends research curiosity, software engineering, and a strong interest in AI that can create meaningful real-world impact."
          />

          <div className="about-grid">
            <article className="about-card about-highlight reveal">
              <p>
                I am <strong>{profile.name}</strong>, a Computer Science and Engineering student
                focused on machine learning, deep learning, computer vision, and building reliable
                software that turns ideas into practical tools.
              </p>
              <p>
                My work is guided by a simple belief: meaningful technology starts with clear
                problem-solving, continuous learning, and careful experimentation.
              </p>
              <p>
                I enjoy exploring the full lifecycle of AI products, from data preparation and
                model development to deployment workflows and user-facing experiences.
              </p>
            </article>
            <article className="about-card reveal">
              <div className="about-photo-card">
                <img src={profile.photo} alt="Portrait of Md. Imran Hossain Sayem" loading="lazy" />
              </div>
              <div className="about-bullets">
                <p><strong>Focus areas</strong></p>
                <ul>
                  <li>Artificial Intelligence</li>
                  <li>Machine Learning</li>
                  <li>Computer Vision</li>
                  <li>Software Development</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section reveal" id="skills">
          <SectionTitle
            eyebrow="Skills"
            title="Core strengths across software, AI, and research"
            description="A versatile mix of technical depth, product thinking, and a continuing commitment to learning."
          />

          <div className="skills-grid">
            {skills.map((skillGroup) => (
              <article className="skill-card reveal" key={skillGroup.category}>
                <div className="skill-card-head">
                  <h3>{skillGroup.category}</h3>
                  <span>{skillGroup.proficiency}%</span>
                </div>
                <div className="skill-bar" aria-hidden="true">
                  <div style={{ width: `${skillGroup.proficiency}%` }} />
                </div>
                <ul>
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section reveal" id="projects">
          <SectionTitle
            eyebrow="Featured Projects"
            title="Projects that bridge research, AI, and impact"
            description="Each project reflects a practical step toward building intelligent systems with clarity and purpose."
          />

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-badges">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section reveal" id="research">
          <SectionTitle
            eyebrow="Research"
            title="Focused on AI, learning systems, and responsible innovation"
            description="Current work and interests are centered on building depth in machine learning, computer vision, and research-driven problem solving."
          />

          <div className="research-grid">
            {research.map((item) => (
              <article className="research-card reveal" key={item.title}>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
            <article className="research-card highlight-card reveal">
              <h3>Research Interests</h3>
              <div className="tech-badges">
                {interests.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
              <p>Publication details will be added as work is shared publicly.</p>
            </article>
          </div>
        </section>

        <section className="content-section reveal" id="experience">
          <SectionTitle
            eyebrow="Experience"
            title="A growing path through learning, collaboration, and exploration"
            description="Experience is shaped through hands-on projects, research curiosity, teaching support, and community involvement."
          />

          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="timeline-item reveal" key={item.title}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <p className="timeline-period">{item.period}</p>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section reveal" id="achievements">
          <SectionTitle
            eyebrow="Achievements"
            title="Momentum built through curiosity, consistency, and growth"
            description="A snapshot of progress, confidence, and a commitment to becoming a stronger contributor in AI."
          />

          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card reveal" key={achievement.label}>
                <h3>{achievement.value}</h3>
                <p>{achievement.label}</p>
              </article>
            ))}
            <article className="achievement-card reveal">
              <h3>Open to</h3>
              <p>Research collaboration, internships, and AI-focused opportunities</p>
            </article>
          </div>
        </section>

        <section className="content-section reveal" id="contact">
          <SectionTitle
            eyebrow="Contact"
            title="Let’s build something meaningful together"
            description="Recruiters, collaborators, and researchers are welcome to connect."
          />

          <div className="contact-grid">
            <article className="contact-card reveal">
              <p className="contact-cta">
                I’m excited to connect with people working at the edge of AI, research, and software.
              </p>
              <div className="contact-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={`mailto:${profile.email}`}>Email</a>
              </div>
              <p className="contact-note">{profile.email}</p>
            </article>

            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} />
              </label>
              <button type="submit">Send Message</button>
              {formStatus ? <p className="form-status">{formStatus}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 {profile.name}. Designed for thoughtful AI-driven work.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
