import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomShield from '../components/CustomShield';

const services = [
  { id: 'unarmed-guard', name: 'UNARMED GUARD', icon: CustomShield },
  { id: 'armed-guard', name: 'ARMED GUARD', icon: CustomShield },
  { id: 'armed-response', name: 'ARMED RESPONSE OFFICER', icon: CustomShield },
  { id: 'control-room', name: 'CONTROL ROOM OPERATOR', icon: CustomShield },
  { id: 'cash-transit', name: 'CASH-IN-TRANSIT OFFICER', icon: CustomShield },
  { id: 'close-protection', name: 'CLOSE PROTECTION OFFICER', icon: CustomShield },
  { id: 'k9-handler', name: 'K9 HANDLER', icon: CustomShield },
  { id: 'drone-operator', name: 'DRONE OPERATOR', icon: CustomShield },
  { id: 'cctv-tech', name: 'CCTV TECHNICIAN', icon: CustomShield },
  { id: 'alarm-tech', name: 'ALARM TECHNICIAN', icon: CustomShield },
  { id: 'cctv-alarm-tech', name: 'CCTV AND ALARM TECHNICIAN', icon: CustomShield },
  { id: 'operations-manager', name: 'OPERATIONS MANAGER', icon: CustomShield },
  { id: 'control-room-manager', name: 'CONTROL ROOM MANAGER', icon: CustomShield },
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'linear-gradient(rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.8)), url("https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=2070")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="relative h-full flex items-center justify-center px-4">
          <div 
            className="text-center"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 500),
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
              Recruiting Security Personnel
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gold-primary/90">
              Are you looking for a job in the security industry?
            </p>
            <a
              href="#services"
              className="btn-gold inline-flex items-center space-x-2"
            >
              <span>SECURITY POSITIONS</span>
              <CustomShield size={24} className="ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="relative min-h-screen pb-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div 
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight) * 0.1)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - window.innerHeight + 400) / 400))
            }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
              Which position are you qualified for and have experience in?
            </h2>
            <p className="text-lg text-gold-primary/80 max-w-3xl mx-auto">
              You are allowed to choose only one position to apply for. Select the position for which you have the most experience and qualifications
            </p>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight) * 0.05)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - window.innerHeight + 600) / 400))
            }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => navigate(`/apply/${service.id}`)}
                  className="service-card group transition-all duration-300 transform hover:scale-105"
                >
                  {typeof Icon === 'function' ? (
                    <Icon size={58} className="mb-4 filter drop-shadow-gold" />
                  ) : (
                    <Icon className="h-12 w-12 text-gold-primary mb-4 group-hover:text-gold-secondary transition-colors duration-300 stroke-[2]" />
                  )}
                  <h3 className="text-xl font-bold text-gold-primary tracking-wide no-text-shadow">
                    {service.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;