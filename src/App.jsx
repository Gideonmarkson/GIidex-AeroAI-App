import React, { useState } from 'react';
import Header from './components/Header';
import EngineDiagnostics from './components/EngineDiagnostics';
import DigitalTwin from './components/DigitalTwin';
import TrajectoryPlanner from './components/TrajectoryPlanner';
import KnowledgeQuiz from './components/KnowledgeQuiz';
import PrintableCheatSheet from './components/PrintableCheatSheet';
import Footer from './components/Footer';
import { Gauge, Layers, Compass, BookOpen, Printer, ArrowRight } from 'lucide-react';

const DEFAULT_ENGINE_SLIDERS = {
  temp: 820,
  vibration: 1.1,
  pressure: 680,
  oilContam: 8,
  intakePressure: 1.85
};

export default function App() {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [engineSliders, setEngineSliders] = useState(DEFAULT_ENGINE_SLIDERS);

  const handleResetState = () => {
    setEngineSliders(DEFAULT_ENGINE_SLIDERS);
  };

  const moduleCards = [
    {
      id: 'diagnostics',
      title: 'Predictive Engine Diagnostics',
      subtitle: 'Multivariate Anomaly Detection',
      description: 'Simulate thermodynamic turbine degradation and compare traditional threshold rules against AI neural pattern recognition.',
      icon: Gauge,
      badge: 'Interactive Sliders'
    },
    {
      id: 'digital-twin',
      title: 'Airframe Digital Twin',
      subtitle: 'Real-Time Hardware Replica',
      description: 'Explore dynamic Von Mises stress heatmaps, aeroelastic wing flex, and telemetry mesh synchronization.',
      icon: Layers,
      badge: 'Telemetry Mesh'
    },
    {
      id: 'trajectory',
      title: 'Autonomous Trajectory Planner',
      subtitle: 'Deep Reinforcement Learning',
      description: 'Simulate 2D DRL flight path optimization around turbulence hazards vs rigid static waypoints.',
      icon: Compass,
      badge: '2D Canvas Map'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Cockpit Telemetry Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleResetState}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 flex-1 w-full pb-12">
        
        {/* Module Selector Grid (Displayed on top if on main modules) */}
        {activeTab !== 'cheat-sheet' && activeTab !== 'quiz' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 no-print">
            {moduleCards.map((card) => {
              const Icon = card.icon;
              const isActive = activeTab === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => setActiveTab(card.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'glass-panel-glow border-cyan-400 scale-[1.01]'
                      : 'glass-panel hover:border-cyan-500/50 hover:bg-gray-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isActive ? 'bg-cyan-500 text-black border-cyan-400 shadow-cyan-glow' : 'bg-gray-800 text-cyan-400 border-gray-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition">
                    {card.title}
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-400/80 mb-2">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>LAUNCH SIMULATION</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab View Router */}
        {activeTab === 'diagnostics' && (
          <EngineDiagnostics
            sliders={engineSliders}
            setSliders={setEngineSliders}
          />
        )}

        {activeTab === 'digital-twin' && <DigitalTwin />}

        {activeTab === 'trajectory' && <TrajectoryPlanner />}

        {activeTab === 'quiz' && <KnowledgeQuiz />}

        {activeTab === 'cheat-sheet' && <PrintableCheatSheet />}
      </main>

      {/* Cockpit Footer */}
      <Footer />
    </div>
  );
}
