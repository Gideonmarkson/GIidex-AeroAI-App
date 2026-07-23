import React, { useState, useEffect, useRef } from 'react';
import { Compass, Wind, Zap, Navigation, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function TrajectoryPlanner() {
  const [stormSeverity, setStormSeverity] = useState(65); // 0 to 100
  const [windShear, setWindShear] = useState(45); // Knots 10 - 90
  const [drlAggression, setDrlAggression] = useState(70); // % smooth curve aggressiveness

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Grid overlay
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Points
    const startX = 60, startY = height / 2;
    const endX = width - 60, endY = height / 2;
    const stormX = width / 2, stormY = height / 2;
    const stormRadius = 35 + (stormSeverity * 0.7);

    // 1. Draw Storm / Turbulence Zone
    const grad = ctx.createRadialGradient(stormX, stormY, 5, stormX, stormY, stormRadius);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
    grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.25)');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(stormX, stormY, stormRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label Storm Zone
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`SEVERE TURBULENCE ZONE (${stormSeverity}%)`, stormX - 70, stormY - stormRadius - 8);

    // 2. Draw Traditional Static Waypoint Path (Red Dashed Line)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(stormX, stormY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Draw DRL AI Neural Path (Glowing Cyan Curved Bezier Line)
    const curveOffsetY = (stormRadius + 45) * (drlAggression / 50);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(
      startX + 120, startY - curveOffsetY,
      endX - 120, endY - curveOffsetY,
      endX, endY
    );
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // 4. Draw Waypoint Nodes
    // Start Point A
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(startX, startY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('ORIGIN [A]', startX - 25, startY + 22);

    // End Point B
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(endX, endY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('DESTINATION [B]', endX - 45, endY + 22);

  }, [stormSeverity, windShear, drlAggression]);

  // Derived Metrics
  const fuelSavingsPct = Math.round(12 + (drlAggression * 0.14));
  const traditionalGForce = (2.2 + (stormSeverity * 0.05)).toFixed(1);
  const aiGForce = (1.1 + (stormSeverity * 0.01)).toFixed(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider border border-cyan-400/30">
                MODULE 03 • AUTONOMOUS TRAJECTORY PLANNING
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              Deep Reinforcement Learning (DRL) Flight Path
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Traditional aircraft navigation relies on static pre-computed waypoints that cannot dynamically react to sudden mountain wave turbulence or moving convective storms. 
              DRL neural agents evaluate 3D airspace geometry in real-time to compute smooth, fuel-optimal detour trajectories.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Canvas Visualizer (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                Live 2D Flight Path Simulation Map
              </h3>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-2.5 h-0.5 bg-red-500 border border-dashed"></span> Traditional Waypoint
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <span className="w-3 h-1 bg-cyan-400 rounded"></span> DRL Neural Path
                </span>
              </div>
            </div>

            {/* Interactive HTML5 Canvas */}
            <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-950/90 aspect-[16/9] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={680}
                height={380}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Path Comparison Summary Box */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-red-500/30">
                <span className="text-red-400 font-bold block mb-1">TRADITIONAL WAYPOINT PATH</span>
                <p className="text-gray-300 text-[11px]">Passes through storm core.</p>
                <div className="mt-2 text-gray-400 text-[10px]">
                  <span>Peak Turbulence: </span>
                  <span className="text-red-400 font-bold">{traditionalGForce} G</span>
                </div>
              </div>

              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-cyan-500/40 shadow-cyan-sm">
                <span className="text-cyan-300 font-bold block mb-1">DRL AI OPTIMIZED PATH</span>
                <p className="text-gray-300 text-[11px]">Smoothly curves around storm.</p>
                <div className="mt-2 text-gray-400 text-[10px]">
                  <span>Peak Turbulence: </span>
                  <span className="text-emerald-400 font-bold">{aiGForce} G</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Environmental Controls & Metrics (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                Airspace Environment Controls
              </h3>
            </div>

            {/* Slider 1: Storm Intensity */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Storm / Turbulence Radius</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">
                  {stormSeverity}% Severity
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                step="5"
                value={stormSeverity}
                onChange={(e) => setStormSeverity(parseInt(e.target.value))}
                className="w-full accent-red-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Wind Shear Gust */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">Crosswind Gust Velocity</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300">
                  {windShear} Knots
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={windShear}
                onChange={(e) => setWindShear(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: DRL Curve Aggressiveness */}
            <div className="space-y-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-200">DRL Detour Safety Margin</label>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                  {drlAggression}% Detour
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={drlAggression}
                onChange={(e) => setDrlAggression(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Efficiency Gains Card */}
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              DRL AI EFFICIENCY ADVANTAGES
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-gray-900/90 p-3 rounded-lg border border-gray-800">
                <span className="text-gray-400">Fuel Savings vs Static Detour:</span>
                <span className="text-emerald-400 font-bold text-sm">+{fuelSavingsPct}% Saved</span>
              </div>

              <div className="flex justify-between items-center bg-gray-900/90 p-3 rounded-lg border border-gray-800">
                <span className="text-gray-400">Passenger Comfort Rating:</span>
                <span className="text-cyan-300 font-bold text-sm">EXCELLENT (Low G)</span>
              </div>

              <div className="flex justify-between items-center bg-gray-900/90 p-3 rounded-lg border border-gray-800">
                <span className="text-gray-400">Path Compute Latency:</span>
                <span className="text-purple-400 font-bold text-sm">4.2 ms (Real-time)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
