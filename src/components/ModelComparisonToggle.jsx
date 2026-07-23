import React from 'react';
import { ShieldAlert, Cpu, ArrowRightLeft, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function ModelComparisonToggle({ physicsResult, aiResult, showComparisonToggle, setShowComparisonToggle }) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 mb-8 transition-all">
      {/* Header bar with toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Model Comparison: Physics Rule-Engine vs. AI Neural Recognition
            </h3>
            <p className="text-xs text-gray-400">
              Toggle comparative view to observe how AI pattern recognition catches subtle combined sensor drift.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowComparisonToggle(!showComparisonToggle)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            showComparisonToggle
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-cyan-glow'
              : 'bg-gray-800 text-cyan-400 border-gray-700 hover:border-cyan-500'
          }`}
        >
          {showComparisonToggle ? 'Hide Comparison Breakdown' : 'Show Side-by-Side Comparison'}
        </button>
      </div>

      {/* Comparison Grid */}
      {showComparisonToggle && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Traditional Physics Rule-Based Card */}
          <div className="bg-gray-900/90 rounded-xl p-5 border border-gray-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                Traditional Physics Rules
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                physicsResult.physicsStatus === 'OPTIMAL'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}>
                Status: {physicsResult.physicsStatus}
              </span>
            </div>

            <h4 className="text-sm font-semibold text-gray-200 mb-2">Evaluates Single Fixed Limits</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Triggers alerts ONLY if an individual sensor crosses an isolated upper/lower threshold limit (e.g. Temp &gt; 1100°C OR Vib &gt; 7.0G).
            </p>

            <div className="space-y-2 text-xs font-mono bg-black/40 p-3 rounded-lg border border-gray-800/80">
              <div className="flex justify-between">
                <span className="text-gray-400">Evaluated Triggers:</span>
                <span className="text-gray-200 font-semibold">{physicsResult.physicsTriggers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Diagnosis:</span>
                <span className="text-gray-300 text-right truncate max-w-[200px]">{physicsResult.physicsReason}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-500 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Limitation: Blind to non-linear multi-sensor correlations.</span>
            </div>
          </div>

          {/* AI Neural Pattern Recognition Card */}
          <div className="bg-gray-900/90 rounded-xl p-5 border border-cyan-500/30 relative overflow-hidden shadow-cyan-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                AI Neural Network
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                aiResult.aiStatus === 'OPTIMAL'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : aiResult.aiStatus === 'WARNING'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                Status: {aiResult.aiStatus} ({aiResult.aiAnomalyScore}%)
              </span>
            </div>

            <h4 className="text-sm font-semibold text-cyan-300 mb-2">Multivariate Pattern Recognition</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Analyzes simultaneous cross-channel sensor telemetry. Catches early thermal expansion and bearing degradation hours before threshold limits breach.
            </p>

            <div className="space-y-2 text-xs font-mono bg-black/40 p-3 rounded-lg border border-cyan-500/20">
              <div className="flex justify-between">
                <span className="text-gray-400">Anomaly Index:</span>
                <span className="text-cyan-400 font-bold">{aiResult.aiAnomalyScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Predicted RUL:</span>
                <span className="text-emerald-400 font-bold">{aiResult.remainingUsefulLifeHours.toLocaleString()} Hours</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-cyan-400/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Advantage: Early fault detection & zero threshold lag.</span>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Callout Banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className="text-xs text-cyan-200 leading-relaxed font-medium">
          {physicsResult.comparisonInsight}
        </p>
      </div>
    </div>
  );
}
