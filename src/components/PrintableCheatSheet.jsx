import React from 'react';
import { Printer, Cpu, ShieldCheck, Zap, Layers, Compass, BookOpen } from 'lucide-react';

export default function PrintableCheatSheet() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Top Banner with Print Trigger (Hidden during actual print view) */}
      <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Printer className="w-5 h-5 text-cyan-400" />
            Printable Aerospace AI Executive Reference Sheet
          </h2>
          <p className="text-xs text-gray-300">
            Export a clean 1-page PDF quick reference guide covering predictive diagnostics, digital twins, and trajectory AI.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-cyan-glow hover:opacity-90 transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          Print / Export PDF
        </button>
      </div>

      {/* Printable Sheet Container (Styled for both Screen & Print Media) */}
      <div className="glass-panel rounded-2xl p-8 border-cyan-500/20 text-gray-200 space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* Header */}
        <div className="border-b border-cyan-500/30 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-wider text-cyan-400 print:text-black">
              GIDEX AEROAI EXPLORER
            </h1>
            <p className="text-xs text-gray-400 font-mono print:text-gray-600">
              AEROSPACE ARTIFICIAL INTELLIGENCE QUICK REFERENCE SUMMARY
            </p>
          </div>
          <div className="text-right font-mono text-[10px] text-gray-400 print:text-gray-600">
            <span>CLIENT-SIDE BROWSER VISUALIZER</span>
            <span className="block font-bold text-cyan-400 print:text-black">EDUCATIONAL REFERENCE</span>
          </div>
        </div>

        {/* Section 1: Predictive Engine Diagnostics */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 print:text-black border-b border-gray-800 pb-1">
            <Zap className="w-4 h-4 text-cyan-400 print:text-black" />
            1. Predictive Jet Engine Diagnostics (AI vs. Physics Rules)
          </h3>
          <p className="text-xs text-gray-300 print:text-gray-800 leading-relaxed">
            Traditional thermodynamic rules evaluate isolated single-parameter thresholds (e.g., Turbine Temp &gt; 1100°C). 
            Multivariate AI pattern recognition models evaluate coupled interactions (e.g. moderate temp rise + shaft vibration + fuel pressure drop), 
            detecting bearing spallation and rotor creep up to 40 hours before single limits are breached.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 print:bg-gray-100 print:border-gray-300">
              <strong className="text-gray-200 print:text-black block mb-1">Traditional Rule Engine:</strong>
              <span className="text-gray-400 print:text-gray-700">Static single limits | High false negatives for combined fault modes.</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-cyan-500/30 print:bg-gray-100 print:border-gray-300">
              <strong className="text-cyan-300 print:text-black block mb-1">Multivariate AI Model:</strong>
              <span className="text-gray-300 print:text-gray-700">Cross-channel neural correlation | RUL prediction in hours.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Aerospace Digital Twins */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 print:text-black border-b border-gray-800 pb-1">
            <Layers className="w-4 h-4 text-cyan-400 print:text-black" />
            2. Airframe Digital Twin Synchronization
          </h3>
          <p className="text-xs text-gray-300 print:text-gray-800 leading-relaxed">
            An Aerospace Digital Twin is a software replica continuously synchronized with physical aircraft telemetry. 
            It models structural Von Mises stress (MPa), aerodynamic skin friction temperature, and aeroelastic wing flex in real-time.
          </p>
        </div>

        {/* Section 3: Autonomous Trajectory Optimization */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 print:text-black border-b border-gray-800 pb-1">
            <Compass className="w-4 h-4 text-cyan-400 print:text-black" />
            3. Autonomous DRL Trajectory Optimization
          </h3>
          <p className="text-xs text-gray-300 print:text-gray-800 leading-relaxed">
            Deep Reinforcement Learning (DRL) path planners replace static pre-computed waypoints. 
            DRL agents dynamically synthesize smooth curved trajectories around moving mountain wave turbulence and weather hazards, reducing passenger G-loads and saving up to 18% fuel.
          </p>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-4 border-t border-gray-800 text-[10px] text-gray-500 print:text-gray-600 flex justify-between items-center">
          <span>Gidex AeroAI Explorer • Educational Visual Simulation Tool Only</span>
          <span>Not for real-world flight operations</span>
        </div>
      </div>
    </div>
  );
}
