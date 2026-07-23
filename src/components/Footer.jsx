import React from 'react';
import { AlertCircle, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-cyan-500/20 py-6 px-4 mt-12 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        
        {/* Educational Disclaimer */}
        <div className="flex items-center gap-2 text-amber-400/90 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Disclaimer: Educational Simulation Tool Only — Not certified for real-world flight operations or avionics control.</span>
        </div>

        {/* System Credits */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Gidex AeroAI Explorer
          </span>
          <span>•</span>
          <span className="text-cyan-400">100% Client-Side Execution</span>
        </div>
      </div>
    </footer>
  );
}
