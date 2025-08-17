import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          y: 50, 
          opacity: 0,
          filter: 'blur(10px)'
        }, 
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current?.children || [], 
        { 
          y: 80,
          opacity: 0,
          scale: 0.9,
          filter: 'blur(10px)'
        }, 
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "bottom 20%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "CA Consulting Firm",
      description: "Modern e-commerce solution with React, Node.js, and advanced animations",
      tech: ["React", "Node.js", "MongoDb", "Tailwind CSS","Responsive Design"],
      image: "/kkassociate.png",
      liveUrl: "https://kkassociate.com/",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Futureal Portfolio",
      description: "Enabled clients to discover our design capabilities, accelerating project inquiries and building trust from the first click",
      tech: [ "React", "Node.js", "Tailwind Css", "Framer Motion","MongoDB","Responsive Design"],
      image: "/futureal.png",
      liveUrl: "https://futureal.in/",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Aagaur Studio",
      description: "Improved lead quality and inquiries by offering a clear, curated view of our capabilities and a seamless path to connect with our team.",
    tech: [ "React", "Node.js", "Tailwind Css", "Framer Motion","MongoDB","Responsive Design"],
      image: "/aagaur.png",
      liveUrl: "https://aagaurstudio.com/",
      githubUrl: "#"
    }
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 text-glow"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card interactive-card group overflow-hidden relative z-10"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Project Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-neon-cyan hover:text-neon-purple transition-colors"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-neon-cyan hover:text-neon-purple transition-colors"
                  >
                    <GithubLogo size={20} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-muted/30 border border-border text-muted-foreground group-hover:border-neon-cyan/50 group-hover:text-neon-cyan transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
  <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-purple/3 blur-3xl pointer-events-none -z-10"></div>
  <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-neon-cyan/3 blur-3xl pointer-events-none -z-10"></div>
    </section>
  );
};

export default ProjectsSection;
