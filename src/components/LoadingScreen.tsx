import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(progressRef.current, { width: "0%" });
    gsap.set(logoRef.current, { y: 50, opacity: 0 });

    // Animation sequence
    tl.to(logoRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
    .to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    }, "-=0.5")
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, "-=0.5")
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        onLoadingComplete();
      }
    }, "+=0.3");

  }, [onLoadingComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-neon-purple/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-neon-cyan/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-neon-pink/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-glow mb-4">
            <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Markitects
            </span>
          </h1>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            Crafting Digital Experiences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div
              ref={progressRef}
              className="progress-bar h-full"
            ></div>
          </div>
          <span ref={percentRef} className="text-sm text-muted-foreground font-mono">
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;