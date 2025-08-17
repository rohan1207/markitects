import React, { useState } from 'react';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="container mx-auto">
          <div className="glass-card px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div
                className="text-2xl font-bold text-glow cursor-pointer"
                onClick={() => scrollToSection('hero')}
              >
                <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                  Markitects
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  Contact
                </button>
              </div>

              {/* Social Links & Mobile Menu Button */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block text-foreground hover:text-neon-cyan transition-colors"
                >
                  <GithubLogo size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block text-foreground hover:text-neon-cyan transition-colors"
                >
                  <LinkedinLogo size={24} />
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-foreground hover:text-neon-cyan transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <List size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-2xl text-foreground hover:text-neon-cyan transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-2xl text-foreground hover:text-neon-cyan transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-2xl text-foreground hover:text-neon-cyan transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-2xl text-foreground hover:text-neon-cyan transition-colors"
              >
                Contact
              </button>

              {/* Mobile Social Links */}
              <div className="flex items-center space-x-6 pt-8">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  <GithubLogo size={32} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-neon-cyan transition-colors"
                >
                  <LinkedinLogo size={32} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;