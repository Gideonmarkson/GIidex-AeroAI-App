import React, { useState, useEffect } from 'react';
import { Flame, Activity, Gauge, Droplets, Wind, AlertCircle, Zap, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { evaluateEngineState, ENGINE_PRESETS } from '../utils/aiModels';
import ModelComparisonToggle from './ModelComparisonToggle';
import jetEngineImg from '../assets/jet_engine.jpg';

export default function EngineDiagnostics({ sliders, setSliders }) {
  const [showComparison, setShowComparison] = useState(true);

  // Evaluate engine telemetry
  const evaluation = evaluateEngineState(sliders);

  const handleSliderChange = (key, value) => {
    setSliders(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  const applyPreset = (presetKey) => {
    const preset = ENGINE_PRESETS[presetKey];
    if (preset) {
      setSliders({
        temp: preset.temp,
        vibration: preset.vibration,
        pressure: preset.pressure,
        oilContam: preset.oilContam,
        intakePressure: preset.intakePressure
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Overview Banner */}
      <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider border border-cyan-400/30">
                MODULE 01 • REAL-TIME SIMULATION
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              Predictive Jet Engine Diagnostics
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Adjust thermodynamic and mechanical telemetry sliders to simulate jet engine operating conditions. 
              Observe how single-parameter physics threshold rules compare with multivariate AI neural network pattern recognition.
            </p>
          </div>

          {/* Quick Presets Selector */}
          <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-2 w-full lg:w-auto shrink-0">
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Preset Scenarios (1-Click Test):
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ENGINE_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-800 hover:bg-cyan-500/20 text-gray-200 hover:text-cyan-300 border border-gray-700 hover:border-cyan-400 transition"
                  title={preset.description}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Pane: Telemetry Controls & Live Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Turbine Telemetry Sliders
              </h3>
              <span className="text-xs text-gray-400 font-mono">5 Channels Active</span>
            </div>

            {/* Slider 1: Turbine Inlet Temperature */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Turbine Inlet Temperature (TIT)
                </label>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                  sliders.temp > 1100 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/10 text-cyan-300'
                }`}>
                  {sliders.temp}°C
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="1400"
                step="5"
                value={sliders.temp}
                onChange={(e) => handleSliderChange('temp', e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>400°C (Idle)</span>
                <span>Nominal: 850°C</span>
                <span className="text-red-400">1100°C (Limit)</span>
                <span>1400°C (Max)</span>
              </div>
            </div>

            {/* Slider 2: Engine Vibration Level */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Rotor Vibration Acceleration (G)
                </label>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                  sliders.vibration > 7.0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/10 text-cyan-300'
                }`}>
                  {sliders.vibration.toFixed(1)} G
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={sliders.vibration}
                onChange={(e) => handleSliderChange('vibration', e.target.value)}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>0.1G (Smooth)</span>
                <span>Nominal: 1.2G</span>
                <span className="text-amber-400">7.0G (Limit)</span>
                <span>10.0G (Critical)</span>
              </div>
            </div>

            {/* Slider 3: Fuel Injection Pressure */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Fuel Manifold Pressure (PSI)
                </label>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                  sliders.pressure < 300 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/10 text-cyan-300'
                }`}>
                  {sliders.pressure} PSI
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="10"
                value={sliders.pressure}
                onChange={(e) => handleSliderChange('pressure', e.target.value)}
                className="w-full accent-blue-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span className="text-red-400">200 (Drop)</span>
                <span>Nominal: 650 PSI</span>
                <span>1200 PSI</span>
              </div>
            </div>

            {/* Slider 4: Oil Contamination % */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-emerald-400" />
                  Lube Oil Debris & Contamination (%)
                </label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {sliders.oilContam}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={sliders.oilContam}
                onChange={(e) => handleSliderChange('oilContam', e.target.value)}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>0% (Clean)</span>
                <span>Nominal: &lt;15%</span>
                <span className="text-amber-400">60% (High Debris)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Slider 5: Air Intake Pressure Ratio */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800/80">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-purple-400" />
                  Air Intake Compression Ratio
                </label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {sliders.intakePressure.toFixed(2)} : 1
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={sliders.intakePressure}
                onChange={(e) => handleSliderChange('intakePressure', e.target.value)}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>0.50 (Stall)</span>
                <span>Nominal: 1.85</span>
                <span>2.50 (Peak)</span>
              </div>
            </div>
          </div>

          {/* Jet Engine Image & Sensor Waveform Overlay */}
          <div className="glass-panel rounded-2xl p-4 border-cyan-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                JET TURBINE CROSS-SECTION TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-gray-400">REAL-TIME SENSOR FEED</span>
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-gray-800 aspect-video bg-black/60">
              <img
                src={jetEngineImg}
                alt="Turbine Engine HUD"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

              {/* Dynamic Overlay HUD Elements */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md p-2 rounded-lg border border-cyan-500/30 font-mono text-[11px] space-y-1">
                <p className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  SENSOR NODE #A-42 ACTIVE
                </p>
                <p className="text-gray-300">TIT: {sliders.temp}°C</p>
                <p className="text-gray-300">VIB: {sliders.vibration}G</p>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono text-[11px] text-right">
                <span className="text-gray-400 block text-[9px]">ANOMALY INDEX</span>
                <span className={`text-base font-black ${
                  evaluation.aiAnomalyScore >= 75 ? 'text-red-400' : evaluation.aiAnomalyScore >= 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {evaluation.aiAnomalyScore}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: AI Diagnostic Gauge & Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Anomaly Gauge & AI Output */}
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                AI Health Diagnostic Output
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                NEURAL CLASSIFIER
              </span>
            </div>

            {/* Circular Gauge Representation */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-900/80 rounded-xl border border-gray-800 relative">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Gauge Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-gray-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`transition-all duration-500 ease-out ${
                      evaluation.aiAnomalyScore >= 75
                        ? 'stroke-red-500 shadow-red-glow'
                        : evaluation.aiAnomalyScore >= 40
                        ? 'stroke-amber-500 shadow-gold-glow'
                        : 'stroke-emerald-400 shadow-green-glow'
                    }`}
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * evaluation.aiAnomalyScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                {/* Gauge Inner Metric */}
                <div className="absolute text-center space-y-0.5">
                  <span className="text-3xl font-black text-white font-mono block tracking-tight">
                    {evaluation.aiAnomalyScore}%
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block">
                    ANOMALY SCORE
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border flex items-center gap-2 ${
                evaluation.aiStatus === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-red-glow'
                  : evaluation.aiStatus === 'WARNING'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-gold-glow'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-green-glow'
              }`}>
                {evaluation.aiStatus === 'CRITICAL' && <ShieldAlert className="w-4 h-4 animate-bounce" />}
                {evaluation.aiStatus === 'WARNING' && <AlertCircle className="w-4 h-4" />}
                {evaluation.aiStatus === 'OPTIMAL' && <CheckCircle2 className="w-4 h-4" />}
                {evaluation.aiHeadline}
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="space-y-4 text-xs">
              <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-2">
                <span className="text-gray-400 font-mono uppercase text-[10px] block font-semibold">
                  AI DEEP DIAGNOSTIC SUMMARY
                </span>
                <p className="text-gray-200 leading-relaxed font-sans">
                  {evaluation.aiDiagnostic}
                </p>
              </div>

              {/* Remaining Useful Life Box */}
              <div className="bg-gray-900/90 p-4 rounded-xl border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 font-mono uppercase text-[10px] block font-semibold">
                    PREDICTED REMAINING USEFUL LIFE (RUL)
                  </span>
                  <span className="text-lg font-extrabold text-cyan-300 font-mono">
                    {evaluation.remainingUsefulLifeHours.toLocaleString()} Hours
                  </span>
                </div>
                <div className="text-right font-mono text-[10px] text-gray-400">
                  <span>MAINTENANCE WINDOW</span>
                  <span className="block text-emerald-400 font-bold">
                    {evaluation.remainingUsefulLifeHours > 1000 ? 'SCHEDULED' : 'URGENT ATTENTION'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Model Comparison Toggle View */}
      <ModelComparisonToggle
        physicsResult={evaluation}
        aiResult={evaluation}
        showComparisonToggle={showComparison}
        setShowComparisonToggle={setShowComparison}
      />
    </div>
  );
}
