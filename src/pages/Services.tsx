import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Phone, Camera, Dog, Plane, Wrench, Truck, User } from 'lucide-react';

const services = [
  { id: 'unarmed-guard', name: 'UNARMED GUARD', icon: Shield },
  { id: 'armed-guard', name: 'ARMED GUARD', icon: ShieldAlert },
  { id: 'armed-response', name: 'ARMED RESPONSE OFFICER', icon: ShieldAlert },
  { id: 'control-room', name: 'CONTROL ROOM OPERATOR', icon: Phone },
  { id: 'cash-transit', name: 'CASH-IN-TRANSIT OFFICER', icon: Truck },
  { id: 'close-protection', name: 'CLOSE PROTECTION OFFICER', icon: User },
  { id: 'k9-handler', name: 'K9 HANDLER', icon: Dog },
  { id: 'drone-operator', name: 'DRONE OPERATOR', icon: Plane },
  { id: 'cctv-tech', name: 'CCTV TECHNICIAN', icon: Camera },
  { id: 'alarm-tech', name: 'ALARM TECHNICIAN', icon: Wrench },
  { id: 'cctv-alarm-tech', name: 'CCTV AND ALARM TECHNICIAN', icon: Wrench },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Security Positions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => navigate(`/apply/${service.id}`)}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
            >
              <Icon className="h-12 w-12 text-blue-500 mb-4 group-hover:text-blue-400" />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm">Click to apply</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Services;