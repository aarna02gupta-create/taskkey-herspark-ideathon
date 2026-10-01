import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Bell, 
  ChevronDown, 
  Code, 
  LayoutGrid, 
  SplitSquareVertical, 
  Compass, 
  Award,
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Lock,
  UserCheck,
  Play,
  Menu,
  X
} from 'lucide-react';

export const HeaderNav = ({ 
  theme, 
  onToggleTheme, 
  activeNav = 'home', 
  onSelectNav,
  activeView, 
  onSelectView, 
  onOpenPayload, 
  onOpenCriteriaModal,
  onOpenDelegateModal,
  onOpenDemo
}) => {
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const demoMenuRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (demoMenuRef.current && !demoMenuRef.current.contains(e.target)) {
        setShowDemoMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'delegations', label: 'Delegations' },
    { id: 'team', label: 'Team' },
    { id: 'security', label: 'Security' },
    { id: 'audit', label: 'Audit' },
  ];

  const handleNavClick = (id) => {
    if (onSelectNav) onSelectNav(id);
    if (id === 'home' && onSelectView) onSelectView('home');
    if (id === 'delegations' && onSelectView) onSelectView('delegations');
    if (id === 'team' && onSelectView) onSelectView('team');
    if (id === 'security' && onSelectView) onSelectView('security');
    if (id === 'audit' && onSelectView) onSelectView('audit');
    
    // Smooth scroll if on home page and matching section exists
    if (activeView === 'home') {
      if (id === 'team') {
        const el = document.getElementById('security-overview-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'security') {
        const el = document.getElementById('access-comparison-section') || document.getElementById('security-overview-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'audit') {
        const el = document.getElementById('live-activity-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-all" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)', opacity: 0.98 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        
        {/* 1. TaskKey Brand Lockup */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none" 
          onClick={() => { if (onSelectView) onSelectView('home'); }}
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md relative transition-transform group-hover:scale-105" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-rose) 100%)', color: '#FFFFFF' }}>
            <Shield size={22} />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-[var(--brand-pink)]" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight leading-none" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
              Task<span style={{ color: 'var(--brand-pink)' }}>Key</span>
            </span>
          </div>
        </div>

        {/* 2. Primary SaaS Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id || (activeView === 'home' && activeNav === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-[15px] font-medium transition-all ${
                  isActive
                    ? 'text-[var(--brand-pink)] font-bold bg-[var(--brand-peach)] shadow-2xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* 3. Right Controls: Run Demo, Theme Toggle, Notifications, Profile, Discreet Demo/Dev */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Run Demo CTA Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-extrabold text-white shadow-xs transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-rose) 100%)' 
            }}
            title="Launch Automated 8-Step Product Demo"
          >
            <Play size={13} className="fill-current" />
            <span className="font-bold whitespace-nowrap">Run Demo</span>
          </button>

          {/* Direct Navbar Theme Toggle (Light / Night) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all hover:border-[var(--brand-pink)] shadow-2xs"
            style={{ 
              background: 'var(--bg-surface)', 
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)' 
            }}
            title={theme === 'night' || theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Night Theme'}
          >
            {theme === 'night' || theme === 'dark' ? (
              <>
                <Sun size={15} className="text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-[var(--brand-pink)]" />
                <span className="hidden sm:inline">Night</span>
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-xl border flex items-center justify-center relative transition-all hover:border-[var(--brand-pink)]"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--brand-pink)] animate-ping-soft" />
            </button>

            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-2xl border shadow-pop p-4 space-y-3 z-50 animate-pop-in text-xs"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Notifications</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]">
                    1 Security Alert
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl border space-y-1" style={{ background: 'var(--badge-red-bg)', borderColor: 'var(--badge-red-border)' }}>
                    <div className="flex items-center gap-1.5 font-bold text-[var(--badge-red-text)]">
                      <AlertTriangle size={14} />
                      <span>Unauthorized Action Blocked</span>
                    </div>
                    <p className="text-[11px]" style={{ color: 'var(--text-main)' }}>
                      Priya attempted <strong>Refund #1041</strong> outside approved task scope. Access denied.
                    </p>
                    <span className="text-[10px] text-[var(--text-dim)]">2 minutes ago</span>
                  </div>

                  <div className="p-2.5 rounded-xl border space-y-1" style={{ background: 'var(--badge-green-bg)', borderColor: 'var(--badge-green-border)' }}>
                    <div className="flex items-center gap-1.5 font-bold text-[var(--badge-green-text)]">
                      <CheckCircle2 size={14} />
                      <span>Order Processing Token Active</span>
                    </div>
                    <p className="text-[11px]" style={{ color: 'var(--text-main)' }}>
                      Task-scoped session active for Priya (Expires in 28 mins).
                    </p>
                    <span className="text-[10px] text-[var(--text-dim)]">10 minutes ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border transition-all hover:border-[var(--brand-pink)]"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand-pink)] to-[var(--brand-rose)] text-white font-black text-xs flex items-center justify-center shadow-xs">
                RS
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-main)' }}>Riya Sharma</p>
                <p className="text-[10px] font-medium text-[var(--brand-pink)]">Owner • Couture</p>
              </div>
              <ChevronDown size={14} className={`text-[var(--text-dim)] transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl border shadow-pop p-2 space-y-1 z-50 animate-pop-in text-xs font-medium"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="p-2.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Riya Sharma</p>
                  <p className="text-[11px] text-[var(--text-muted)]">riya@couturestudio.in</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    <UserCheck size={11} /> Primary Business Owner
                  </span>
                </div>

                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onOpenDelegateModal) onOpenDelegateModal();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] font-semibold flex items-center gap-2"
                >
                  <Shield size={14} className="text-[var(--brand-pink)]" />
                  <span>Issue New Delegation</span>
                </button>

                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    handleNavClick('audit');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] flex items-center gap-2"
                >
                  <Lock size={14} className="text-[var(--brand-pink)]" />
                  <span>View Security Policies</span>
                </button>
              </div>
            )}
          </div>

          {/* Discreet Demo / Developer Menu */}
          <div className="relative" ref={demoMenuRef}>
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="btn-outline-subtle text-[13px] py-2 px-3 font-semibold flex items-center gap-1.5"
              title="Discreet Demo & Developer Toolkit"
            >
              <Code size={15} className="text-[var(--brand-pink)]" />
              <span className="hidden lg:inline">Demo / Developer</span>
              <ChevronDown size={13} className={`transition-transform ${showDemoMenu ? 'rotate-180' : ''}`} />
            </button>

            {showDemoMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl border shadow-pop p-2 space-y-1 z-50 animate-pop-in text-xs font-semibold"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  Presenter & Sandbox Modes
                </div>

                <button
                  onClick={() => { onSelectView('sandbox'); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center gap-2.5 text-[var(--text-main)]"
                >
                  <SplitSquareVertical size={16} className="text-[var(--brand-pink)]" />
                  <div>
                    <p className="font-bold">Live Split-Screen Sandbox</p>
                    <span className="text-[10px] text-[var(--text-dim)]">Owner vs Helper real-time view</span>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectView('gallery'); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center gap-2.5 text-[var(--text-main)]"
                >
                  <LayoutGrid size={16} className="text-[var(--brand-pink)]" />
                  <div>
                    <p className="font-bold">12-Screen Poster Gallery</p>
                    <span className="text-[10px] text-[var(--text-dim)]">Complete UI flow architecture</span>
                  </div>
                </button>

                <button
                  onClick={() => { onSelectView('guided'); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center gap-2.5 text-[var(--text-main)]"
                >
                  <Compass size={16} className="text-[var(--brand-pink)]" />
                  <div>
                    <p className="font-bold">Interactive Guided Tour</p>
                    <span className="text-[10px] text-[var(--text-dim)]">Step-by-step product journey</span>
                  </div>
                </button>

                <div className="border-t my-1" style={{ borderColor: 'var(--border-subtle)' }} />

                <button
                  onClick={() => { onOpenPayload(); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center gap-2.5 text-[var(--text-main)]"
                >
                  <Code size={16} className="text-[var(--brand-pink)]" />
                  <div>
                    <p className="font-bold">Inspect Dev Token Payload</p>
                    <span className="text-[10px] text-[var(--text-dim)]">Cryptographic token policy</span>
                  </div>
                </button>

                <button
                  onClick={() => { onOpenCriteriaModal(); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center gap-2.5 text-[var(--text-main)]"
                >
                  <Award size={16} className="text-[var(--brand-pink)]" />
                  <div>
                    <p className="font-bold">Evaluation Mapping</p>
                    <span className="text-[10px] text-[var(--text-dim)]">Problem & feature matrix</span>
                  </div>
                </button>

                <div className="border-t my-1" style={{ borderColor: 'var(--border-subtle)' }} />

                <button
                  onClick={() => { onToggleTheme(); setShowDemoMenu(false); }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[var(--bg-surface-hover)] flex items-center justify-between text-[var(--text-main)]"
                >
                  <div className="flex items-center gap-2.5">
                    {theme === 'light' ? <Moon size={16} className="text-[var(--brand-pink)]" /> : <Sun size={16} className="text-amber-400" />}
                    <span>{theme === 'light' ? 'Switch to Night Mode' : 'Switch to Light Mode'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] font-bold">{theme}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-10 h-10 rounded-xl border flex items-center justify-center text-[var(--text-main)] hover:border-[var(--brand-pink)] transition-all"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            aria-label="Toggle Navigation Menu"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {showMobileMenu && (
        <div 
          className="md:hidden border-t px-4 py-3 space-y-1 animate-pop-in shadow-lg"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id || (activeView === 'home' && activeNav === item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item.id);
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  isActive
                    ? 'text-[var(--brand-pink)] bg-[var(--brand-peach)] border border-[var(--border-subtle)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-[var(--brand-pink)]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
