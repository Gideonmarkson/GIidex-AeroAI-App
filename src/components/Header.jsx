import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab, onReset, onOpenHowItWorks }) {
  const [timeStr, setTimeStr] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    { id: 'overview', num: '01', label: 'Overview & History' },
    { id: 'diagnostics', num: '02', label: 'Engine Diagnostics' },
    { id: 'digital-twin', num: '03', label: 'Airframe Twin' },
    { id: 'trajectory', num: '04', label: 'Trajectory Optimization' },
    { id: 'quiz', num: '05', label: 'Knowledge Assessment' },
    { id: 'cheat-sheet', num: '06', label: 'Executive PDF Report' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 lg:px-8 py-3.5 no-print font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <!-- Left Section: Mobile Hamburger Toggle & Brand Logo -->
          <div className="flex items-center gap-3 shrink-0">
            
            <!-- Mobile Hamburger Toggle Button -->
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition focus:outline-none"
              title="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <!-- Brand Identity -->
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-gray-900 whitespace-nowrap">
                  Gidex AeroAI Explorer
                </h1>
                <span className="hidden sm:inline-block text-[11px] mono-data px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                  v1.6 Enterprise
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                <span className="hidden sm:inline">Next-Gen Avionics</span> <span className="hidden sm:inline">•</span> <span className="text-gray-900 font-medium mono-data">{timeStr}</span> • 
                <span className="text-emerald-600 font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live</span>
              </p>
            </div>
          </div>

          <!-- Desktop Navigation Pill Tabs -->
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
                  <span>{tab.num} {tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          <!-- Right Header Action Controls -->
          <div className="flex items-center gap-2.5 shrink-0 text-xs font-semibold">
            <button
              onClick={onOpenHowItWorks}
              className="px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
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
          </div>
        </div>
      </header>

      {/* iOS-STYLE SLIDE-OVER MOBILE DRAWER NAVIGATION MENU */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden no-print">
          
          {/* Semi-Transparent Dark Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Slide-Over Drawer Panel (Left-side 78% Width) */}
          <aside className="fixed inset-y-0 left-0 w-[78%] max-w-xs bg-white shadow-2xl flex flex-col justify-between border-r border-gray-200">
            
            {/* Drawer Top Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  G
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 leading-tight">Gidex AeroAI</h2>
                  <span className="text-[10px] mono-data text-blue-600 font-semibold block">Navigation Menu</span>
                </div>
              </div>

              {/* 'X' Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
                title="Close Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Drawer Vertical Menu Items List */}
            <div className="p-4 space-y-1.5 flex-1 overflow-y-auto font-medium text-sm">
              <span class="px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider mono-data block mb-2">Platform Modules</span>

              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition text-left ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mono-data text-xs font-bold text-gray-400">{tab.num}</span>
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Bottom Action Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
              <button
                onClick={() => {
                  onReset();
                  setDrawerOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-semibold shadow-sm hover:bg-gray-100 transition"
              >
                Reset Telemetry Baseline
              </button>
              <div className="text-[10px] text-gray-400 text-center mono-data pt-1">
                Gidex AeroAI • Enterprise Avionics
              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
}
