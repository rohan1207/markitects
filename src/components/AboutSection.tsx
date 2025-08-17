import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Lightning 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current, 
        { 
          x: -100, 
          opacity: 0,
          filter: 'blur(10px)'
        }, 
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [], 
        { 
          y: 50, 
          opacity: 0,
          filter: 'blur(10px)'
        }, 
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo(skillsRef.current?.children || [], 
        { 
          scale: 0.8,
          opacity: 0,
          y: 30
        }, 
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'Frontend', icon: Code, description: 'React, Vue, Angular' },
    { name: 'Design', icon: Palette, description: 'UI/UX, Figma, Adobe' },
    { name: 'Animation', icon: Lightning, description: 'GSAP, Framer Motion' },
    { name: 'Performance', icon: Rocket, description: 'Optimization, SEO' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="w-72 h-72 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center text-6xl font-bold text-glow">
                    M
                  </div>
                </div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-neon-cyan/40 blur-sm animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-neon-purple/40 blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-neon-pink/40 blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
                About{' '}
                <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                  Us
                </span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We're a passionate web developer specializing in creating immersive 
                  digital experiences that push the boundaries of what's possible on the web.
                </p>
                <p>
                  With expertise in modern frameworks and cutting-edge animation libraries, 
                  we bring ideas to life through clean code, stunning visuals, and 
                  seamless user interactions.
                </p>
                <p>
                  When we're not coding, you'll find us exploring new technologies, 
                  contributing to open source projects, or experimenting with 3D graphics 
                  and creative coding.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="glass-card p-4 interactive-card group"
                  >
                    <IconComponent 
                      size={32} 
                      className="text-neon-cyan mb-3 group-hover:text-neon-purple transition-colors" 
                    />
                    <h3 className="font-semibold text-foreground mb-1">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-neon-purple/5 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default AboutSection;
