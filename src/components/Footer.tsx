import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer content animation
      gsap.fromTo(footerRef.current?.children || [], 
        { 
          y: 60,
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
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // Floating particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: -20,
            duration: 3 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });

          gsap.to(particle, {
            opacity: 0.3,
            duration: 2 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-purple/30 blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-neon-cyan/30 blur-sm"></div>
        <div className="absolute bottom-1/2 left-1/2 w-1 h-1 rounded-full bg-neon-pink/30 blur-sm"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-neon-purple/20 blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-neon-cyan/20 blur-sm"></div>
        <div className="absolute top-2/3 right-1/2 w-1 h-1 rounded-full bg-neon-pink/40 blur-sm"></div>
      </div>

      <div ref={footerRef} className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div 
            className="text-3xl font-bold text-glow mb-6 cursor-pointer inline-block"
            onClick={scrollToTop}
          >
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Markitects
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center space-x-8 mb-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Crafting digital experiences that inspire and engage through 
            innovative design and cutting-edge technology.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Markitects. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-neon-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neon-cyan transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground/60">
            Built with React, GSAP, Tailwind CSS & lots of ☕
          </p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-neon-cyan/5 to-transparent blur-3xl"></div>
    </footer>
  );
};

export default Footer;
