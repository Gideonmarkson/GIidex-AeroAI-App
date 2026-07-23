import React, { useState } from 'react';
import { Layers, Cpu, Compass, Wind, ShieldCheck, Activity, Zap, RefreshCcw } from 'lucide-react';
import { evaluateDigitalTwinState } from '../utils/aiModels';
import digitalTwinImg from '../assets/digital_twin.jpg';

export default function DigitalTwin() {
  const [twinSliders, setTwinSliders] = useState({
    speedMach: 1.8,
    altitudeFt: 38000,
    wingFlexAngle: 4.5,
    ambientTempC: -45
  });

  const [activeSensorNode, setActiveSensorNode] = useState('wing-left');

  const twinMetrics = evaluateDigitalTwinState(twinSliders);

  const handleSliderChange = (key, value) => {
    setTwinSliders(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  const sensorNodes = [
    { id: 'wing-left', label: 'Port Wing Spar Node', stress: `${Math.round(twinMetrics.structuralStressMPa * 0.95)} MPa`, temp: `${twinMetrics.thermalSkinTempC}°C` },
    { id: 'fuselage', label: 'Fuselage Nose Cone', stress: `${Math.round(twinMetrics.structuralStressMPa * 1.15)} MPa`, temp: `${Math.round(twinMetrics.thermalSkinTempC * 1.2)}°C` },
    { id: 'wing-right', label: 'Starboard Wing Spar Node', stress: `${Math.round(twinMetrics.structuralStressMPa * 0.95)} MPa`, temp: `${twinMetrics.thermalSkinTempC}°C` },
    { id: 'tail', label: 'Empennage Rudder Actuator', stress: `${Math.round(twinMetrics.structuralStressMPa * 0.75)} MPa`, temp: `${Math.round(twinMetrics.thermalSkinTempC * 0.8)}°C` }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Banner */}
      <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider border border-cyan-400/30">
                MODULE 02 • DIGITAL TWIN & STRUCTURES
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              Aerospace Airframe Digital Twin
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              A Digital Twin is a continuously updated real-time software replica of physical aerospace hardware. 
              Adjust aerodynamic sliders below to observe real-time structural stress propagation, aerodynamic drag calculations, and sensor node synchronization.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-900/80 p-3 rounded-xl border border-gray-800 font-mono text-xs text-gray-300">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
            <span>TWIN SYNC STATE: <strong className="text-cyan-400">100% IN PHASE ({twinMetrics.twinSyncLatencyMs} ms)</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders & Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                Flight Dynamics & Environmental Sliders
              </h3>
              <span className="text-xs text-gray-400 font-mono">Simulated Flight Envelopes</span>
            </div>

            {/* Slider 1: Speed Mach */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Airspeed (Mach Number)</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  Mach {twinSliders.speedMach.toFixed(2)} ({Math.round(twinSliders.speedMach * 1225)} km/h)
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="3.0"
                step="0.05"
                value={twinSliders.speedMach}
                onChange={(e) => handleSliderChange('speedMach', e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>Mach 0.3 (Subsonic)</span>
                <span>Mach 1.0 (Transonic)</span>
                <span>Mach 3.0 (Supersonic)</span>
              </div>
            </div>

            {/* Slider 2: Altitude Feet */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Flight Altitude</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {twinSliders.altitudeFt.toLocaleString()} FT
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="65000"
                step="1000"
                value={twinSliders.altitudeFt}
                onChange={(e) => handleSliderChange('altitudeFt', e.target.value)}
                className="w-full accent-blue-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>5,000 FT</span>
                <span>35,000 FT (Cruising)</span>
                <span>65,000 FT (Stratosphere)</span>
              </div>
            </div>

            {/* Slider 3: Wing Flex Deflection Angle */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Aeroelastic Wing Flex Angle</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {twinSliders.wingFlexAngle.toFixed(1)}°
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="12.0"
                step="0.2"
                value={twinSliders.wingFlexAngle}
                onChange={(e) => handleSliderChange('wingFlexAngle', e.target.value)}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>0.0° (Rigid)</span>
                <span>4.5° (Normal Flex)</span>
                <span>12.0° (Extreme G-Turn)</span>
              </div>
            </div>

            {/* Slider 4: Ambient Air Temperature */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Outside Air Temp (OAT)</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {twinSliders.ambientTempC}°C
                </span>
              </div>
              <input
                type="range"
                min="-65"
                max="45"
                step="1"
                value={twinSliders.ambientTempC}
                onChange={(e) => handleSliderChange('ambientTempC', e.target.value)}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>-65°C (Stratospheric)</span>
                <span>-45°C</span>
                <span>+45°C (Desert Ground)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Output Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/90 p-4 rounded-xl border border-cyan-500/30 font-mono text-xs">
              <span className="text-gray-400 block text-[10px]">AERODYNAMIC DRAG</span>
              <span className="text-xl font-bold text-cyan-300 mt-1 block">
                {twinMetrics.aerodynamicDragN.toLocaleString()} N
              </span>
              <span className="text-[10px] text-gray-400">Air resistance force</span>
            </div>

            <div className="bg-gray-900/90 p-4 rounded-xl border border-cyan-500/30 font-mono text-xs">
              <span className="text-gray-400 block text-[10px]">STRUCTURAL WING STRESS</span>
              <span className={`text-xl font-bold mt-1 block ${
                twinMetrics.structuralStressMPa > 500 ? 'text-red-400' : twinMetrics.structuralStressMPa > 350 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {twinMetrics.structuralStressMPa} MPa
              </span>
              <span className="text-[10px] text-gray-400">Von Mises yield index</span>
            </div>

            <div className="bg-gray-900/90 p-4 rounded-xl border border-cyan-500/30 font-mono text-xs">
              <span className="text-gray-400 block text-[10px]">SKIN FRICTION TEMP</span>
              <span className="text-xl font-bold text-orange-400 mt-1 block">
                {twinMetrics.thermalSkinTempC}°C
              </span>
              <span className="text-[10px] text-gray-400">Aerodynamic thermal load</span>
            </div>

            <div className="bg-gray-900/90 p-4 rounded-xl border border-cyan-500/30 font-mono text-xs">
              <span className="text-gray-400 block text-[10px]">TWIN SYNC LATENCY</span>
              <span className="text-xl font-bold text-purple-400 mt-1 block">
                {twinMetrics.twinSyncLatencyMs} ms
              </span>
              <span className="text-[10px] text-gray-400">Telemetry mesh update</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Digital Twin Wireframe Image & Sensor Node Selector (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Airframe Sensor Telemetry Mesh
              </h3>
              <span className="text-xs text-gray-400 font-mono">Interactive Node Map</span>
            </div>

            {/* Wireframe Visual */}
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 aspect-video bg-black/80">
              <img
                src={digitalTwinImg}
                alt="Aircraft Digital Twin HUD"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

              {/* Hotspot Sensor Nodes */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {/* Left Wing Node */}
                <button
                  onClick={() => setActiveSensorNode('wing-left')}
                  className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 p-2 rounded-full border transition-all ${
                    activeSensorNode === 'wing-left'
                      ? 'bg-cyan-400 text-black border-white shadow-cyan-glow scale-125'
                      : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50 hover:scale-110'
                  }`}
                  title="Port Wing Spar"
                >
                  <Activity className="w-4 h-4" />
                </button>

                {/* Nose Cone Node */}
                <button
                  onClick={() => setActiveSensorNode('fuselage')}
                  className={`absolute right-1/4 top-1/2 transform -translate-y-1/2 p-2 rounded-full border transition-all ${
                    activeSensorNode === 'fuselage'
                      ? 'bg-cyan-400 text-black border-white shadow-cyan-glow scale-125'
                      : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50 hover:scale-110'
                  }`}
                  title="Nose Cone Radome"
                >
                  <Cpu className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Selected Node Telemetry Box */}
            <div className="bg-gray-900/90 p-4 rounded-xl border border-gray-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Active Telemetry Node: {sensorNodes.find(n => n.id === activeSensorNode)?.label}
                </span>
                <span className="text-[10px] text-gray-400">NODE ID: {activeSensorNode}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-gray-400 text-[10px] block">Calculated Stress Load</span>
                  <span className="text-sm font-bold text-gray-200">
                    {sensorNodes.find(n => n.id === activeSensorNode)?.stress}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Skin Surface Temp</span>
                  <span className="text-sm font-bold text-orange-400">
                    {sensorNodes.find(n => n.id === activeSensorNode)?.temp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
