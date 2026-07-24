import React, { useState } from 'react';
import { Flame, Activity, Gauge, Droplets, Wind, AlertCircle, Zap, ShieldAlert, Sparkles, CheckCircle2, Eye, ArrowRightLeft } from 'lucide-react';
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
    <div className="space-y-4 animate-fadeIn">
      {/* Compact Control Banner & Preset Scenarios */}
      <div className="aero-panel rounded-lg p-3.5 border-[#232D3F]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#1E293B] text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-[#232D3F]">
              MODULE 01 • TELEMETRY DASHBOARD
            </span>
            <h2 class="text-base font-bold text-white tracking-tight">Predictive Engine Diagnostics</h2>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase font-bold hidden xl:inline">Presets:</span>
            {Object.entries(ENGINE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#1E293B] hover:bg-[#283548] text-slate-200 border border-[#232D3F] transition"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Unified Single-Screen Cockpit Dashboard Grid (Visible All At Once On Desktop, Superb Responsive Mobile View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Column 1: Telemetry Inputs (4 Cols on Desktop) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="aero-panel rounded-lg p-4 border-[#232D3F] space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#232D3F]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Telemetry Inputs
              </h3>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">5 CHANNELS</span>
            </div>

            {/* Slider 1: TIT Temp */}
            <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-cyan-400" /> TIT Temp
                </label>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
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
            </div>

            {/* Slider 2: Rotor Vibration */}
            <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" /> Rotor Vibration
                </label>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: Fuel Pressure */}
            <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> Fuel Pressure
                </label>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 4: Lube Oil Contamination */}
            <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" /> Lube Oil Debris
                </label>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 5: Air Intake Ratio */}
            <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Wind className="w-3 h-3 text-cyan-400" /> Air Intake Ratio
                </label>
                <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
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
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Column 2: Physical Component Degradation Display + Rule Comparison (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-2.5">
          {/* Physical Component Display */}
          <div className="aero-panel rounded-lg p-3.5 border-[#232D3F] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#CBD5E1] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> Physical Turbine Display
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#1E293B] text-cyan-400 border border-[#232D3F]">
                STAGE 1: NOMINAL
              </span>
            </div>
            
            <div className="relative rounded-lg overflow-hidden img-blend-container aspect-[16/9]">
              <img
                src={jetEngineImg}
                alt="Turbine Engine View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/85 via-transparent to-transparent"></div>

              <div class="absolute top-2 left-2 bg-[#0B0F17]/90 backdrop-blur-md p-2 rounded border border-[#232D3F] font-mono text-[10px] space-y-0.5">
                <p className="text-cyan-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  TURBINE #A-42
                </p>
                <p className="text-slate-200 font-semibold">TIT: {sliders.temp}°C</p>
                <p className="text-slate-200 font-semibold">VIB: {sliders.vibration.toFixed(1)}G</p>
              </div>

              <div className="absolute bottom-2 right-2 bg-[#0B0F17]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#232D3F] font-mono text-[10px] text-right">
                <span className="text-slate-400 block text-[8px] font-bold">DEGRADATION</span>
                <span className="text-sm font-bold text-cyan-400">
                  {evaluation.aiAnomalyScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Model Comparison Card (Rules vs AI) Directly Visible alongside image */}
          <div className="aero-panel rounded-lg p-3.5 border-[#232D3F] space-y-2">
            <div className="flex items-center justify-between border-b border-[#232D3F] pb-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" /> Physics Rules vs AI Detection
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-[#0B0F17] p-2 rounded border border-[#232D3F]">
                <span class="text-slate-400 text-[9px] block font-bold">TRADITIONAL RULES</span>
                <p className="text-cyan-400 font-bold mt-0.5">Status: OPTIMAL</p>
              </div>
              <div className="bg-[#0B0F17] p-2 rounded border border-cyan-500/40">
                <span className="text-cyan-400 text-[9px] block font-bold">AI NEURAL NETWORK</span>
                <p className="text-cyan-400 font-bold mt-0.5">AI Status: {evaluation.aiStatus} ({evaluation.aiAnomalyScore}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: AI Anomaly Gauge & Executive Diagnostic Summary (3 Cols on Desktop) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="aero-panel rounded-lg p-4 border-[#232D3F] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#232D3F]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Anomaly Detector
              </h3>
              <span className="text-[9px] font-mono text-cyan-400 bg-[#1E293B] px-2 py-0.5 rounded border border-[#232D3F] font-semibold">NEURAL</span>
            </div>

            {/* Gauge */}
            <div className="flex flex-col items-center justify-center p-3 bg-[#0B0F17] rounded border border-[#232D3F]">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-[#1E293B]" strokeWidth="7" fill="transparent"/>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-400 transition-all duration-500"
                    strokeWidth="7"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * evaluation.aiAnomalyScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center space-y-0.5">
                  <span className="text-2xl font-bold text-white font-mono block">
                    {evaluation.aiAnomalyScore}%
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider block font-bold">ANOMALY</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-2.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center justify-center text-center bg-[#1E293B] text-cyan-400 border-[#232D3F]">
                {evaluation.aiHeadline}
              </div>
            </div>

            {/* RUL & Summary */}
            <div className="space-y-2 text-[11px] font-mono">
              <div className="bg-[#0B0F17] p-2.5 rounded border border-[#232D3F]">
                <span className="text-[#CBD5E1] uppercase text-[9px] block font-bold">PREDICTED RUL</span>
                <span className="text-base font-bold text-cyan-400">
                  {evaluation.remainingUsefulLifeHours.toLocaleString()} Hours
                </span>
              </div>

              <div className="bg-[#0B0F17] p-2.5 rounded border border-[#232D3F] space-y-1">
                <span className="text-[#CBD5E1] uppercase text-[9px] block font-bold">DIAGNOSTIC SUMMARY</span>
                <p className="text-slate-300 font-sans text-[11px] leading-snug">
                  {evaluation.aiDiagnostic}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
