import React, { useState } from 'react';

export default function EngineDiagnostics({ onNavigate }) {
  const [temp, setTemp] = useState(820);
  const [vibration, setVibration] = useState(1.1);
  const [erosion, setErosion] = useState(5);
  const [pressure, setPressure] = useState(680);
  const [oil, setOil] = useState(8);
  const [egt, setEgt] = useState(540);
  const [intake, setIntake] = useState(1.85);

  const presets = {
    optimal: { temp: 820, vibration: 1.1, erosion: 5, pressure: 680, oil: 8, egt: 540, intake: 1.85 },
    overheating: { temp: 1150, vibration: 2.2, erosion: 25, pressure: 610, oil: 18, egt: 920, intake: 1.6 },
    vibration: { temp: 910, vibration: 7.2, erosion: 45, pressure: 630, oil: 45, egt: 680, intake: 1.75 },
    multivariate: { temp: 975, vibration: 4.2, erosion: 55, pressure: 420, oil: 44, egt: 780, intake: 1.35 },
    failure: { temp: 1340, vibration: 9.4, erosion: 90, pressure: 220, oil: 85, egt: 1150, intake: 0.75 }
  };

  const applyPreset = (key) => {
    const p = presets[key];
    if (p) {
      setTemp(p.temp);
      setVibration(p.vibration);
      setErosion(p.erosion);
      setPressure(p.pressure);
      setOil(p.oil);
      setEgt(p.egt);
      setIntake(p.intake);
    }
  };

  const physicsFailed = temp > 1100 || vibration > 7.0 || erosion > 60 || pressure < 300 || oil > 60 || egt > 950;

  const dTemp = Math.max(0, (temp - 820) / 400);
  const dVib = Math.max(0, (vibration - 1.2) / 6.0);
  const dEros = Math.max(0, (erosion - 5) / 60);
  const dPress = Math.max(0, (650 - pressure) / 400);
  const dOil = Math.max(0, (oil - 10) / 70);

  const rawScore = (dTemp * 20 + dVib * 20 + dEros * 20 + dPress * 15 + dOil * 15) + (dTemp * dVib * 25) + (dVib * dOil * 25);
  const anomalyScore = Math.min(100, Math.max(0, Math.round(rawScore)));
  const rulHours = Math.max(1, Math.round(3000 * Math.exp(-anomalyScore / 22)));

  let aiStatus = 'OPTIMAL';
  let aiText = 'Normal operational signatures detected across all 7 channels.';
  let stageText = 'Stage 1: Nominal';
  let imgSrc = './engine_nominal.jpg';

  if (anomalyScore >= 75) {
    aiStatus = 'CRITICAL ALERT';
    aiText = 'Neural Alert: High risk of turbine blade creep & bearing seizure. Immediate shutdown advised.';
    stageText = 'Stage 3: Catastrophic Wear';
    imgSrc = './engine_critical.jpg';
  } else if (anomalyScore >= 40) {
    aiStatus = 'EARLY WARNING';
    aiText = 'Neural Alert: Coupled vibration harmonics & compressor wear indicate early bearing spallation.';
    stageText = 'Stage 2: Overheating & Wear';
    imgSrc = './engine_warning.jpg';
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6 py-4 md:py-6 font-sans">
      
      {/* Header & Presets */}
      <div className="corp-card p-5 border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            Module 01 Engine Telemetry
          </span>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mt-1.5">Predictive Jet Engine Diagnostics</h2>
          <p className="text-xs text-gray-600 mt-0.5">Adjust sliders below to observe live turbine telemetry indicators in real time.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold w-full md:w-auto">
          <span className="text-xs text-gray-500 font-medium mr-1 hidden sm:inline">Presets:</span>
          <button onClick={() => applyPreset('optimal')} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">Optimal</button>
          <button onClick={() => applyPreset('overheating')} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">Overheating</button>
          <button onClick={() => applyPreset('vibration')} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">Imbalance</button>
          <button onClick={() => applyPreset('multivariate')} className="px-3 py-1.5 rounded-full bg-blue-600 text-white transition">Multivariate</button>
          <button onClick={() => applyPreset('failure')} className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition">Failure</button>
        </div>
      </div>

      {/* STICKY PINNED MOBILE ENGINE DISPLAY CARD (On mobile < md: Sticky underneath sticky header) */}
      <div className="block md:hidden sticky top-[64px] z-30 corp-card p-3 shadow-md bg-white/95 backdrop-blur-md border-blue-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-900">Turbine #A-42 Live Stream</span>
          </div>
          <span className="text-[10px] mono-data font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {stageText}
          </span>
        </div>

        <div className="relative rounded-xl overflow-hidden h-36 bg-gray-900 border border-gray-200 shadow-inner">
          <img src={imgSrc} alt="Turbine Mobile Live" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>

          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-900 space-y-0.5 shadow-sm">
            <p className="mono-data text-blue-600 font-bold">TIT: {temp}°C</p>
            <p className="mono-data">VIB: {vibration.toFixed(1)}G</p>
          </div>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-200 text-xs text-right shadow-sm">
            <span className="text-gray-500 block text-[9px] uppercase font-bold">Anomaly</span>
            <span className="text-xs font-extrabold text-blue-600 mono-data">{anomalyScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Cockpit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* Sliders Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="corp-card p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Telemetry Controls</h3>
              <span className="text-xs text-blue-600 mono-data font-semibold">7 Channels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-xs">
              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>TIT Temperature</span>
                  <span className="mono-data text-blue-600">{temp}°C</span>
                </div>
                <input type="range" min="400" max="1400" step="5" value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Rotor Vibration</span>
                  <span className="mono-data text-blue-600">{vibration.toFixed(1)} G</span>
                </div>
                <input type="range" min="0.1" max="10.0" step="0.1" value={vibration} onChange={(e) => setVibration(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Compressor Wear</span>
                  <span className="mono-data text-blue-600">{erosion}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={erosion} onChange={(e) => setErosion(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Fuel Pressure</span>
                  <span className="mono-data text-blue-600">{pressure} PSI</span>
                </div>
                <input type="range" min="200" max="1200" step="10" value={pressure} onChange={(e) => setPressure(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Lube Oil Debris</span>
                  <span className="mono-data text-blue-600">{oil}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={oil} onChange={(e) => setOil(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div class="flex justify-between font-semibold text-gray-900">
                  <span>Exhaust Gas Temp</span>
                  <span className="mono-data text-blue-600">{egt}°C</span>
                </div>
                <input type="range" min="300" max="1200" step="10" value={egt} onChange={(e) => setEgt(parseFloat(e.target.value))} />
              </div>

              <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200 sm:col-span-2 md:col-span-1">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Air Intake Ratio</span>
                  <span className="mono-data text-blue-600">{intake.toFixed(2)} : 1</span>
                </div>
                <input type="range" min="0.5" max="2.5" step="0.05" value={intake} onChange={(e) => setIntake(parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Engine Display & Physics Comparison */}
        <div className="md:col-span-5 space-y-4">
          <div className="hidden md:block corp-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-900">Hardware Telemetry Display</span>
              <span className="text-xs mono-data font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {stageText}
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gray-100 border border-gray-200 shadow-sm">
              <img src={imgSrc} alt="Turbine View" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 space-y-1 shadow-sm">
                <p className="text-blue-600 font-bold">Turbine #A-42</p>
                <p className="mono-data">TIT: {temp}°C</p>
                <p className="mono-data">VIB: {vibration.toFixed(1)}G</p>
                <p className="mono-data">WEAR: {erosion}%</p>
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 text-xs text-right shadow-sm">
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">Degradation</span>
                <span className="text-sm font-bold text-blue-600 mono-data">{anomalyScore}%</span>
              </div>
            </div>
          </div>

          <div className="corp-card p-5 md:p-6 space-y-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">Physics Rules vs AI Detection</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[10px] uppercase font-semibold block">Traditional Rules</span>
                <p className="text-blue-600 font-bold">Status: {physicsFailed ? 'Warning Breach' : 'Optimal'}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 space-y-1">
                <span className="text-blue-700 text-[10px] uppercase font-semibold block">AI Neural Network</span>
                <p className="text-blue-700 font-bold">AI Status: {aiStatus} ({anomalyScore}%)</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
              {!physicsFailed && anomalyScore >= 40
                ? 'KEY AI ADVANTAGE: Fixed rules evaluated engine as HEALTHY because no single limit breached. But AI detected dangerous coupled interactions across vibration, compressor wear, and oil!'
                : physicsFailed && anomalyScore >= 40
                ? 'CONCURRENCE: Both traditional rule limits and AI neural models flag this state as hazardous.'
                : 'STABLE: Both models agree turbine is running within safe parameter envelopes.'}
            </p>
          </div>
        </div>

        {/* Anomaly Gauge Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="corp-card p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">AI Anomaly Gauge</h3>
              <span className="text-xs mono-data text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">Neural</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-gray-200" strokeWidth="6" fill="transparent"/>
                  <circle cx="50" cy="50" r="40" className="stroke-blue-600 transition-all duration-500" strokeWidth="6" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * anomalyScore) / 100} strokeLinecap="round" fill="transparent"/>
                </svg>
                <div className="absolute text-center space-y-0.5">
                  <span className="text-2xl font-bold text-gray-900 mono-data block">{anomalyScore}%</span>
                  <span className="text-[10px] text-gray-500 uppercase block font-semibold">Anomaly</span>
                </div>
              </div>

              <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-semibold ${
                anomalyScore >= 75 ? 'bg-red-50 text-red-700 border border-red-200' : anomalyScore >= 40 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {anomalyScore >= 75 ? 'Critical System Failure' : anomalyScore >= 40 ? 'Early Multivariate Anomaly' : 'Healthy System'}
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <span className="text-gray-500 text-[10px] uppercase font-semibold block">Predicted RUL</span>
                <span className="text-lg font-bold text-blue-600 mono-data block mt-0.5">{rulHours.toLocaleString()} Hours</span>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 uppercase text-[10px] font-semibold block">Diagnostic Summary</span>
                <p className="text-gray-600 text-xs leading-relaxed">{aiText}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
