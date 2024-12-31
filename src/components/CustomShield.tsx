import React from 'react';

interface CustomShieldProps {
  className?: string;
  size?: number;
}

const CustomShield: React.FC<CustomShieldProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield Base */}
      <path
        d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
        fill="url(#shield-gradient)"
        stroke="url(#shield-stroke)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      {/* Shield Highlight Overlay */}
      <path
        d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
        fill="url(#shield-highlight)"
        fillOpacity="0.3"
        style={{ mixBlendMode: 'overlay' }}
      />
      {/* Lightning Bolt */}
      <path
        d="M12 7L8.5 12H12L11 17L15.5 11H12L12 7Z"
        fill="url(#lightning-gradient)"
        filter="url(#glow)"
      />
      <defs>
        {/* Shield Gradients */}
        <linearGradient id="shield-gradient" x1="4" y1="2" x2="20" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFDB51" />
          <stop offset="50%" stopColor="#FFE584" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient id="shield-stroke" x1="4" y1="2" x2="20" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE584" />
          <stop offset="100%" stopColor="#FFDB51" />
        </linearGradient>
        <linearGradient id="shield-highlight" x1="12" y1="2" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* Lightning Bolt Gradient */}
        <linearGradient id="lightning-gradient" x1="8.5" y1="7" x2="15.5" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFE584" />
        </linearGradient>
        {/* Enhanced Glow Effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feFlood floodColor="#FFDB51" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default CustomShield;