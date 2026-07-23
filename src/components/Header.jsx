import React, { useState, useEffect } from 'react';
import { Cpu, Activity, ShieldCheck, RefreshCw, Printer, BookOpen, Gauge, Layers, Compass } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onReset }) {
  const [timeStr, setTimeStr] = useState('');

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
    { id: 'diagnostics', label: 'Engine Diagnostics', icon: Gauge },
    { id: 'digital-twin', label: 'Digital Twin', icon: Layers },
    { id: 'trajectory', label: 'Trajectory Planner', icon: Compass },
    { id: 'quiz', label: 'Knowledge Check', icon: BookOpen },
    { id: 'cheat-sheet', label: 'PDF Summary Sheet', icon: Printer },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 px-4 lg:px-8 py-3 mb-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 shadow-cyan-glow">
            <Cpu className="w-7 h-7 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                GIDEX AEROAI EXPLORER
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <span>COCKPIT TELEMETRY</span> • <span className="text-cyan-400 font-semibold">{timeStr}</span> • <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 100% LOCAL JS</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 bg-gray-900/80 p-1.5 rounded-xl border border-gray-800 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-cyan-glow'
                    : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-700 border border-gray-700 transition"
            title="Reset active simulation sliders to baseline"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Reset State
          </button>
        </div>
      </div>
    </header>
  );
}
