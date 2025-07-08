import React, { useState, useEffect } from 'react';

const Landing = () => {
  // State for animations and interactions
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Setup animations and mouse tracking when component loads
  useEffect(() => {
    // Trigger fade-in animation
    setIsVisible(true);
    
    // Track mouse movement for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create floating particles for background animation
  const createFloatingParticles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
  };

  // Animation classes for fade-in effects
  const fadeInClass = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
  const delayedFadeInClass = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0';

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <BackgroundEffects floatingParticles={createFloatingParticles()} />
      
      {/* MOUSE FOLLOWER EFFECT */}
      <MouseFollower position={mousePosition} />
      
      {/* MAIN CONTENT */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className={`text-center transform transition-all duration-1000 ${fadeInClass}`}>
          
          {/* ADFLUENCE TITLE */}
          <BrandTitle />
          
          {/* MAIN HEADLINE */}
          <MainHeadline />
          
          {/* SUBTITLE */}
          <Subtitle fadeClass={delayedFadeInClass} />
          
          {/* GET STARTED BUTTON */}
          <CallToActionButton fadeClass={delayedFadeInClass} />
          
          {/* DECORATIVE ELEMENTS */}
          <DecorativeElements />
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* CUSTOM ANIMATIONS */}
      <FloatingAnimationStyles />
    </div>
  );
};

// Background with glowing orbs and floating particles
const BackgroundEffects = ({ floatingParticles }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Large Glowing Orbs */}
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-pulse blur-3xl"></div>
    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-20 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-10 animate-pulse blur-3xl" style={{ animationDelay: '2s' }}></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0">
      {floatingParticles}
    </div>
  </div>
);

// Interactive mouse follower effect
const MouseFollower = ({ position }) => (
  <div
    className="absolute w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 blur-2xl pointer-events-none transition-all duration-300"
    style={{
      left: position.x - 64,
      top: position.y - 64,
      transform: 'translate(-50%, -50%)'
    }}
  />
);

// ADFLUENCE brand title with hover effects
const BrandTitle = () => (
  <div className="relative mb-40">
    <h1 className="text-6xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
      ADFLUENCE
    </h1>
    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg opacity-0 hover:opacity-20 blur transition-opacity duration-300"></div>
  </div>
);

// Main headline with MySocial highlight
const MainHeadline = () => (
  <div className="relative mb-6">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
      Connect, Share & Grow with{' '}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
          MySocial
        </span>
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-orange-400 rounded opacity-20 blur animate-pulse"></div>
      </span>
    </h1>
  </div>
);

// Subtitle with delayed animation
const Subtitle = ({ fadeClass }) => (
  <p className={`text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${fadeClass}`}>
    The ultimate platform to meet new friends, share your thoughts, and join vibrant communities.
  </p>
);

// Call to action button with multiple effects
const CallToActionButton = ({ fadeClass }) => (
  <div className={`transform transition-all duration-1000 delay-500 ${fadeClass}`}>
    <a
      href="/login"
      className="group relative inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 transform"
    >
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-30 group-hover:opacity-60 blur transition-opacity duration-300"></div>
    </a>
  </div>
);

// Decorative animated circles
const DecorativeElements = () => (
  <>
    <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-10 animate-ping" style={{ animationDuration: '3s' }}></div>
    <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-10 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
  </>
);

// Custom CSS animations for floating elements
const FloatingAnimationStyles = () => (
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .absolute:nth-child(odd) {
      animation: float 6s ease-in-out infinite;
    }
    
    .absolute:nth-child(even) {
      animation: float 8s ease-in-out infinite reverse;
    }
  `}</style>
);

export default Landing;