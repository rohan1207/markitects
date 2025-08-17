import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial states
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)'
    });

    // Animation sequence
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Floating orbs animation
    if (orbsRef.current) {
      const orbs = orbsRef.current.children;
      Array.from(orbs).forEach((orb, index) => {
        gsap.to(orb, {
          y: -30,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5
        });
      });
    }

  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="spline-container">
        <iframe 
          src="https://my.spline.design/orb-G2DMHGG6KJpYyHkxFGBppjD2/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-neon-purple/40 blur-sm float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-neon-cyan/40 blur-sm float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-neon-pink/40 blur-sm float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 rounded-full bg-neon-purple/30 blur-sm float-delayed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Hi, We're{' '}
          <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent text-glow">
            Markitects
          </span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-light">
            Web Developers
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light"
        >
          Crafting digital experiences that inspire and engage through innovative design 
          and cutting-edge technology.
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToProjects}
          className="btn-neon group inline-flex items-center space-x-3 text-lg"
        >
          <span>View My Work</span>
          <ArrowRight 
            size={24} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 bg-gradient-to-b from-neon-cyan to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
