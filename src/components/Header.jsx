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
    { id: 'overview', label: 'Overview & History', icon: BookOpen },
    { id: 'diagnostics', label: 'Engine Diagnostics', icon: Gauge },
    { id: 'digital-twin', label: 'Airframe Twin', icon: Layers },
    { id: 'trajectory', label: 'Trajectory Optimization', icon: Compass },
    { id: 'quiz', label: 'Quiz (10 Qs)', icon: BookOpen },
    { id: 'cheat-sheet', label: 'Reference PDF', icon: Printer },
  ];

  return (
    <header className="sticky top-0 z-50 aero-panel border-b border-[#232D3F] px-4 lg:px-8 py-3.5 mb-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="p-2.5 rounded-lg bg-[#1E293B] border border-[#232D3F] text-cyan-400 shadow-sm">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                Gidex AeroAI Explorer
              </h1>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded bg-[#1E293B] text-cyan-400 border border-[#232D3F] font-bold">
                TELEMETRY SUITE
              </span>
            </div>
            <p className="text-xs text-[#CBD5E1] font-mono flex items-center gap-2 mt-0.5">
              <span>FLIGHT SYSTEM TELEMETRY</span> • <span className="text-cyan-400 font-bold">{timeStr}</span> • <span className="text-slate-300 flex items-center gap-1 font-semibold"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400"/> PALANTIR / NASA FLIGHT SUITE</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation - Fully Visible Grid Bar without slider */}
        <nav className="w-full xl:w-auto bg-[#0B0F17] p-1.5 rounded-lg border border-[#232D3F] grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-wrap xl:items-center gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs font-medium transition-all text-center ${
                  isActive
                    ? 'bg-[#06B6D4] text-[#0B0F17] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white bg-[#1E293B] hover:bg-[#283548]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0F17]' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-slate-200 hover:text-white bg-[#1E293B] hover:bg-[#283548] border border-[#232D3F] transition"
            title="Reset active simulation sliders to baseline"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Reset Telemetry
          </button>
        </div>
      </div>
    </header>
  );
}
