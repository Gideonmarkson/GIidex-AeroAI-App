import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab, onReset, onOpenHowItWorks }) {
  const [timeStr, setTimeStr] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().split(' ')[4] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: '01 Overview' },
    { id: 'diagnostics', label: '02 Diagnostics' },
    { id: 'digital-twin', label: '03 Digital Twin' },
    { id: 'trajectory', label: '04 Trajectory' },
    { id: 'quiz', label: '05 Assessment' },
    { id: 'cheat-sheet', label: '06 PDF Report' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 lg:px-8 py-3.5 no-print font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-gray-900 whitespace-nowrap">
                Gidex AeroAI Explorer
              </h1>
              <span className="text-[11px] mono-data px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                v1.6 Enterprise
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
              <span>Next-Gen Avionics</span> • <span className="text-gray-900 font-medium mono-data">{timeStr}</span> • 
              <span className="text-emerald-600 font-semibold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Live Telemetry</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Pill Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'nav-tab-active bg-blue-600 text-white font-semibold'
                    : 'hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Header Action Controls */}
        <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
          <button
            onClick={onOpenHowItWorks}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            title="Quick User Guide & Concepts"
          >
            User Guide
          </button>

          <button
            onClick={onReset}
            className="hidden sm:inline-block px-4 py-2 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition"
            title="Reset active simulation sliders to baseline"
          >
            Reset
          </button>

          {/* Hamburger Toggle Button for Mobile (< LG) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            title="Toggle Navigation Menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-3 border-t border-gray-200 mt-3 space-y-1.5 text-xs font-semibold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-2 sm:hidden">
            <button
              onClick={() => {
                onReset();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2 rounded-full text-xs text-gray-700 bg-white border border-gray-300 shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
