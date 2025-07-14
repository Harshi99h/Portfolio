import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import dp from './dp.png'
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ['Harshita', 'Developer', 'Creator', 'Designer'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects','socials','contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < currentWord.length) {
        setDisplayText(currentWord.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(currentWord.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentWordIndex, words]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      demo: "#",
      github: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      demo: "#",
      github: "#"
    },
    {
      title: "Weather Analytics Dashboard",
      description: "Interactive weather dashboard with data visualization, forecasting, and location-based weather tracking using external APIs.",
      tech: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      demo: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-400">Portfolio</span>
            </div>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-baseline space-x-8">
                {['home', 'about', 'projects', 'socials', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 capitalize rounded-lg ${
                      activeSection === section
                        ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-green-400 hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'about', 'projects', 'socials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 capitalize rounded-lg ${
                    activeSection === section
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Picture */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-1 shadow-2xl">
                  <img 
                    src={dp}
                    alt="Alex - Developer"
                    className="w-full h-full rounded-full object-cover border-2 border-green-400/30"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-300 rounded-full animate-bounce"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm <span className="text-green-400">{displayText}</span>
              <span className="animate-pulse text-green-400">|</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A passionate full-stack developer crafting beautiful and functional web experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-green-500 text-green-400 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-all duration-200 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Crafting digital experiences with passion and precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Full-stack developer passionate about creating seamless digital experiences. 
                I transform ideas into elegant, functional solutions.
              </p>
              
              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="group text-center p-4 bg-gray-900/30 rounded-xl border border-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-green-400 group-hover:animate-pulse">50+</div>
                  <div className="text-sm text-gray-400 group-hover:text-green-300 transition-colors">Projects</div>
                </div>
                <div className="group text-center p-4 bg-gray-900/30 rounded-xl border border-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-green-400 group-hover:animate-pulse">3+</div>
                  <div className="text-sm text-gray-400 group-hover:text-green-300 transition-colors">Years</div>
                </div>
                <div className="group text-center p-4 bg-gray-900/30 rounded-xl border border-green-500/20 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-green-400 group-hover:animate-bounce">∞</div>
                  <div className="text-sm text-gray-400 group-hover:text-green-300 transition-colors">Ideas</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Interactive Skills Grid */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                      <span className="text-green-400 font-bold text-lg">{'</>'}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Frontend</h3>
                    <div className="space-y-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="hover:text-green-400 transition-colors cursor-pointer">React • Next.js</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">TypeScript</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">Tailwind CSS</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                      <span className="text-green-400 font-bold text-lg">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Backend</h3>
                    <div className="space-y-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="hover:text-green-400 transition-colors cursor-pointer">Node.js • Python</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">PostgreSQL</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">MongoDB</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                      <span className="text-green-400 font-bold text-lg">☁</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Cloud</h3>
                    <div className="space-y-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="hover:text-green-400 transition-colors cursor-pointer">AWS • Vercel</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">Docker</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">CI/CD</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                      <span className="text-green-400 font-bold text-lg">🎨</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Design</h3>
                    <div className="space-y-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="hover:text-green-400 transition-colors cursor-pointer">UI/UX Design</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">Figma</div>
                      <div className="hover:text-green-400 transition-colors cursor-pointer">Prototyping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Featured work that showcases my skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:scale-105 border border-gray-700 hover:border-green-500/50">
                <div className="aspect-video bg-gray-700 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30 hover:bg-green-500/30 hover:scale-110 transition-all duration-200 cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-105"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="socials" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Connect With Me</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let's create something amazing together
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Interactive Social Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <a
                href="mailto:harshi9351@gmail.com"
                className="group bg-gray-900/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-green-500/20 hover:rotate-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 group-hover:animate-pulse">
                    <Mail className="text-green-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Email</h3>
                    <p className="text-gray-300 group-hover:text-green-400 transition-colors text-sm">Let's discuss your project</p>
                  </div>
                </div>
              </a>
              
              <a
                href="https://github.com/Harshi99h"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/20 hover:-rotate-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-all duration-300 group-hover:animate-pulse">
                    <Github className="text-gray-300 group-hover:text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">GitHub</h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors text-sm">Check out my code</p>
                  </div>
                </div>
              </a>
              
              <a
                href="https://www.linkedin.com/in/harshita-choudhary-676314326 "
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 hover:rotate-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300 group-hover:animate-pulse">
                    <Linkedin className="text-blue-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">LinkedIn</h3>
                    <p className="text-gray-300 group-hover:text-blue-400 transition-colors text-sm">Let's connect professionally</p>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-gray-900/50 to-green-900/20 p-8 rounded-2xl border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to collaborate?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Always excited to work on innovative projects and connect with fellow creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:harshi9351@gmail.com"
                  className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 inline-flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Send Email
                </a>
                <a
                  href="https://github.com/Harshi99h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-green-500 text-green-400 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 inline-flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="group">
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-green-400 transition-colors">Let's Connect</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    I'm always excited to take on new challenges and collaborate on innovative projects. 
                    Whether you have a specific idea or just want to explore possibilities, I'd love to hear from you.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                        <Mail className="text-green-400 group-hover:scale-125 transition-all duration-300" size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-green-300 transition-colors">Email</p>
                        <p className="text-gray-400 group-hover:text-green-400 transition-colors">harshi9351@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 group-hover:rotate-12">
                        <span className="text-green-400 font-bold group-hover:scale-125 transition-all duration-300">📍</span>
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-green-300 transition-colors">Location</p>
                        <p className="text-gray-400 group-hover:text-green-400 transition-colors">Available Worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-500">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-300 hover:border-gray-500"
                      placeholder="Project discussion"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-300 hover:border-gray-500 resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Harshita Developer. Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;