import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

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

      // Form elements animation
      const formElements = formRef.current?.querySelectorAll('.form-element');
      gsap.fromTo(formElements || [], 
        { 
          x: -50,
          opacity: 0,
          filter: 'blur(10px)'
        }, 
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const animateButton = (btn: Element | null) => {
    if (!btn) return;
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`.trim();
    const subject = `New Contact Form Submission from ${formData.name}`;
    const toAddress = 'himanshulokhande41@gmail.com'; // update if needed

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const mailtoLink = `mailto:${toAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;
      setStatus('Opening email app...');
    } else {
      const gmailComposeUrl = new URL('https://mail.google.com/mail/');
      gmailComposeUrl.searchParams.set('view', 'cm');
      gmailComposeUrl.searchParams.set('fs', '1');
      gmailComposeUrl.searchParams.set('to', toAddress);
      gmailComposeUrl.searchParams.set('su', subject);
      gmailComposeUrl.searchParams.set('body', emailBody);
      gmailComposeUrl.searchParams.set('cc', formData.email);

      const gmailWindow = window.open(gmailComposeUrl.toString(), '_blank');
      if (!gmailWindow) {
        const mailtoLink = `mailto:${toAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;
        window.location.href = mailtoLink;
      }
      setStatus('Preparing email...');
    }

    animateButton((e.currentTarget as HTMLFormElement).querySelector('.email-btn'));
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formattedMessage = `*New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Message:*\n${formData.message}`;
    const encodedMessage = encodeURIComponent(formattedMessage);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = '917489849784';
    try {
      const primaryUrl = isMobile
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      const fallbackUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      if (!isMobile) {
        window.open(primaryUrl, '_blank');
      } else {
        window.location.href = primaryUrl;
        setTimeout(() => {
          window.location.href = fallbackUrl;
        }, 2500);
      }
      setStatus('Opening WhatsApp...');
    } catch (err) {
      console.error('Error creating WhatsApp link:', err);
      window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
    }
    animateButton(document.querySelector('.whatsapp-btn'));
  };

  const socialLinks = [
    { name: 'GitHub', icon: GithubLogo, url: 'https://github.com' },
    { name: 'LinkedIn', icon: LinkedinLogo, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: TwitterLogo, url: 'https://twitter.com' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-6 text-glow"
            >
              Get In{' '}
              <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Have a project in mind or just want to say hello? Drop me a message
            </p>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleEmailSubmit}
            className="space-y-6 mb-12"
            noValidate
          >
            {/* Name Input */}
            <div className="form-element">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl glass-card border border-border focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 bg-transparent text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="form-element">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl glass-card border border-border focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 bg-transparent text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div className="form-element">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl glass-card border border-border focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 bg-transparent text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none"
                placeholder="Your phone number"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
            </div>

            {/* Message Input */}
            <div className="form-element">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl glass-card border border-border focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 bg-transparent text-foreground placeholder-muted-foreground transition-all duration-300 focus:outline-none resize-none"
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="form-element flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                className="email-btn btn-neon flex-1 group inline-flex items-center justify-center space-x-3 text-lg"
              >
                <span>Send Email</span>
                <PaperPlaneTilt
                  size={24}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="whatsapp-btn btn-neon flex-1 group inline-flex items-center justify-center space-x-3 text-lg"
              >
                <span>WhatsApp</span>
                <PaperPlaneTilt
                  size={24}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
            {status && <p className="text-center text-sm text-muted-foreground">{status}</p>}
          </form>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Or connect with me on</p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:scale-110 transition-all duration-300 group"
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-neon-purple/5 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default ContactSection;