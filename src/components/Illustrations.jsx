import React from 'react';

export const UserAvatar = ({ name, role, size = 42, className = '' }) => {
  // Deterministic soft pastel gradient colors based on name
  const getGradient = (n = '') => {
    if (n.includes('Juhi')) return ['#F8719D', '#D9466F'];
    if (n.includes('Riya')) return ['#FB7185', '#F43F5E'];
    if (n.includes('Neha')) return ['#F472B6', '#EC4899'];
    if (n.includes('Ananya')) return ['#FB923C', '#F43F5E'];
    if (n.includes('Aman')) return ['#E879F9', '#C084FC'];
    return ['#F472B6', '#DB2777'];
  };

  const [col1, col2] = getGradient(name);
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TK';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full flex-shrink-0 shadow-sm ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${col1} 0%, ${col2} 100%)`,
        border: '2px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 4px 10px rgba(224, 83, 122, 0.25)'
      }}
    >
      <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: size * 0.38, fontFamily: 'Outfit, sans-serif' }}>
        {initials}
      </span>
    </div>
  );
};

export const OwnerHeroIllustration = () => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] h-auto">
    <circle cx="160" cy="110" r="95" fill="var(--brand-blush)" opacity="0.6" />
    <circle cx="230" cy="50" r="12" fill="var(--brand-pink)" opacity="0.15" />
    <circle cx="60" cy="160" r="8" fill="var(--brand-pink)" opacity="0.2" />
    
    {/* Floating sparkle icons */}
    <path d="M245 80L247 88L255 90L247 92L245 100L243 92L235 90L243 88L245 80Z" fill="var(--brand-pink)" />
    <path d="M75 55L76.5 61L82.5 62.5L76.5 64L75 70L73.5 64L67.5 62.5L73.5 61L75 55Z" fill="var(--brand-rose)" />

    {/* Desk surface */}
    <rect x="30" y="175" width="260" height="8" rx="4" fill="var(--border-strong)" />

    {/* Coffee cup */}
    <rect x="55" y="150" width="22" height="25" rx="5" fill="#FFE8ED" stroke="var(--brand-pink)" strokeWidth="1.5" />
    <path d="M77 156 C83 156 83 166 77 166" stroke="var(--brand-pink)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M62 144 C62 140 66 140 66 136" stroke="var(--text-dim)" strokeWidth="1" strokeLinecap="round" />

    {/* Laptop */}
    <rect x="100" y="130" width="75" height="45" rx="4" fill="#FFFFFF" stroke="var(--text-main)" strokeWidth="2" />
    <rect x="105" y="135" width="65" height="35" rx="2" fill="var(--bg-page)" />
    <path d="M137 148 L141 152 L137 156" stroke="var(--brand-pink)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Heart on laptop back/screen */}
    <path d="M137.5 152 C137.5 150 135.5 149 134 150.5 C132.5 149 130.5 150 130.5 152 C130.5 155 134 157.5 134 157.5 C134 157.5 137.5 155 137.5 152 Z" fill="var(--brand-pink)" />
    <polygon points="90,175 185,175 175,172 100,172" fill="#E2CCD5" stroke="var(--text-main)" strokeWidth="1.5" />

    {/* Woman (Juhi) */}
    {/* Hair back */}
    <ellipse cx="195" cy="115" rx="32" ry="38" fill="#2E1C22" />
    {/* Torso / chic blouse */}
    <path d="M165 175 C165 145 180 140 195 140 C210 140 225 145 225 175 Z" fill="var(--brand-pink)" />
    <path d="M190 140 L195 152 L200 140 Z" fill="#FCECE7" />
    {/* Neck */}
    <rect x="190" y="125" width="10" height="18" fill="#F9D2C2" rx="2" />
    {/* Head & face */}
    <ellipse cx="195" cy="108" rx="19" ry="22" fill="#F9D2C2" />
    {/* Hair front / stylish bob */}
    <path d="M176 102 C178 82 212 82 214 102 C214 112 210 120 210 120 C206 104 200 100 195 100 C190 100 184 104 180 120 C180 120 176 112 176 102 Z" fill="#2E1C22" />
    {/* Cheerful face details */}
    <ellipse cx="188" cy="112" rx="3" ry="1.5" fill="#F472B6" opacity="0.6" />
    <ellipse cx="202" cy="112" rx="3" ry="1.5" fill="#F472B6" opacity="0.6" />
    <path d="M187 106 C189 104 191 104 192 106" stroke="#2E1C22" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M198 106 C200 104 202 104 203 106" stroke="#2E1C22" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M192 115 C194 118 196 118 198 115" stroke="#C4365E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Arm typing */}
    <path d="M172 155 C160 162 145 168 135 172" stroke="#F9D2C2" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const DeniedActionIllustration = () => (
  <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[170px] h-auto mx-auto">
    <circle cx="100" cy="90" r="70" fill="var(--badge-red-bg)" opacity="0.8" />
    <circle cx="100" cy="90" r="55" fill="var(--brand-blush)" opacity="0.9" />

    {/* Sparkles */}
    <path d="M155 35L156.5 41L162.5 42.5L156.5 44L155 50L153.5 44L147.5 42.5L153.5 41L155 35Z" fill="var(--brand-pink)" />
    <path d="M35 115L36.5 120L41.5 121.5L36.5 123L35 128L33.5 123L28.5 121.5L33.5 120L35 115Z" fill="var(--badge-red-text)" />

    {/* Woman saying "Not Today" */}
    {/* Hair */}
    <ellipse cx="100" cy="85" rx="34" ry="40" fill="#2E1C22" />
    
    {/* Body / outfit */}
    <path d="M68 155 C68 125 82 120 100 120 C118 120 132 125 132 155 Z" fill="var(--brand-pink)" />
    
    {/* Neck */}
    <rect x="95" y="105" width="10" height="18" fill="#FCD3C1" rx="2" />
    
    {/* Head */}
    <ellipse cx="100" cy="88" rx="20" ry="24" fill="#FCD3C1" />
    
    {/* Hair front */}
    <path d="M80 80 C82 60 118 60 120 80 C120 90 115 100 115 100 C110 82 105 78 100 78 C95 78 90 82 85 100 C85 100 80 90 80 80 Z" fill="#2E1C22" />
    
    {/* Sassy confident smile & blush */}
    <ellipse cx="92" cy="93" rx="3" ry="1.5" fill="#F472B6" opacity="0.7" />
    <ellipse cx="108" cy="93" rx="3" ry="1.5" fill="#F472B6" opacity="0.7" />
    <path d="M91 86 C93 84 95 85 96 87" stroke="#2E1C22" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M104 87 C105 85 107 84 109 86" stroke="#2E1C22" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M96 97 C98 100 102 100 104 97" stroke="#C52233" strokeWidth="1.8" strokeLinecap="round" />

    {/* Hand raised politely halting */}
    <circle cx="138" cy="115" r="14" fill="#FCD3C1" stroke="var(--badge-red-border)" strokeWidth="1.5" />
    <path d="M133 111 C133 107 137 107 137 114" stroke="#C52233" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M137 110 C137 106 141 106 141 114" stroke="#C52233" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M141 111 C141 108 144 108 144 114" stroke="#C52233" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
