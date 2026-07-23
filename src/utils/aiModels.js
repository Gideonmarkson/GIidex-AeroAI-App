// Gidex AeroAI Simulation Models & Algorithms

/**
 * Evaluates Jet Engine Diagnostics comparing Traditional Rule-Based Physics vs. AI Multivariate Anomaly Model
 */
export function evaluateEngineState({ temp, vibration, pressure, oilContam, intakePressure }) {
  // 1. Traditional Physics Model (Fixed Single-Parameter Thresholds)
  let physicsStatus = "OPTIMAL";
  let physicsReason = "All sensors within individual safety boundaries.";
  let physicsTriggers = [];

  if (temp > 1100) {
    physicsTriggers.push(`Turbine Temp Exceeds Limit (${temp}°C > 1100°C)`);
  }
  if (vibration > 7.0) {
    physicsTriggers.push(`Vibration Level Exceeds Limit (${vibration}G > 7.0G)`);
  }
  if (pressure < 300) {
    physicsTriggers.push(`Fuel Pressure Below Minimum (${pressure} PSI < 300 PSI)`);
  }
  if (oilContam > 60) {
    physicsTriggers.push(`Oil Contamination Critical (${oilContam}% > 60%)`);
  }

  if (physicsTriggers.length > 0) {
    physicsStatus = temp > 1250 || vibration > 8.5 ? "CRITICAL" : "WARNING";
    physicsReason = physicsTriggers.join(" | ");
  }

  // 2. AI Machine Learning Multivariate Anomaly Model (Pattern Recognition)
  // Calculates normalized deviations from baseline
  const dTemp = Math.max(0, (temp - 820) / 400); // 0 to 1+
  const dVib = Math.max(0, (vibration - 1.2) / 6.0); // 0 to 1+
  const dPress = Math.max(0, (650 - pressure) / 400); // 0 to 1+
  const dOil = Math.max(0, (oilContam - 10) / 70); // 0 to 1+
  const dIntake = Math.max(0, (1.85 - intakePressure) / 1.0); // 0 to 1+

  // Linear baseline risk score
  let baseRisk = (dTemp * 0.25 + dVib * 0.25 + dPress * 0.2 + dOil * 0.15 + dIntake * 0.15);

  // Nonlinear coupled multi-sensor interaction penalty (Crucial AI strength!)
  // E.g. Moderate temp + moderate vibration + moderate oil contamination indicates early bearing spallation
  const coupledInteractionPenalty = (dTemp * dVib * 2.2) + (dVib * dOil * 2.5) + (dPress * dIntake * 1.8);

  let rawAnomalyScore = (baseRisk + coupledInteractionPenalty) * 100;
  const aiAnomalyScore = Math.min(100, Math.max(0, Math.round(rawAnomalyScore)));

  // AI Classification
  let aiStatus = "OPTIMAL";
  let aiColor = "safeGreen";
  let aiHeadline = "HEALTHY SYSTEM - NO ANOMALIES";
  let aiDiagnostic = "Multivariate neural network detects normal operational signatures across all 5 telemetry channels.";

  if (aiAnomalyScore >= 75) {
    aiStatus = "CRITICAL";
    aiColor = "dangerRed";
    aiHeadline = "CRITICAL SYSTEM FAILURE IMMINENT";
    aiDiagnostic = "Neural Pattern Alert: High probability of catastrophic turbine blade creep or bearing seizure. Immediate engine maintenance shutdown advised.";
  } else if (aiAnomalyScore >= 40) {
    aiStatus = "WARNING";
    aiColor = "warnGold";
    aiHeadline = "EARLY MULTIVARIATE DEGRADATION DETECTED";
    aiDiagnostic = "Neural Pattern Alert: Coupled vibration harmonics & oil contamination ratio indicate early bearing race spallation. Traditional thresholds have not breached yet!";
  }

  // Predicted Remaining Useful Life (RUL in hours)
  const remainingUsefulLifeHours = Math.max(1, Math.round(3000 * Math.exp(-aiAnomalyScore / 22)));

  // Comparison insight: highlight where AI catches what Physics misses!
  let comparisonInsight = "";
  if (physicsStatus === "OPTIMAL" && aiStatus !== "OPTIMAL") {
    comparisonInsight = "⚠️ KEY AI ADVANTAGE: Traditional rule-based threshold evaluated this engine as HEALTHY because no single sensor breached limits. However, the AI model detected dangerous coupled interactions across vibration and oil contamination!";
  } else if (physicsStatus !== "OPTIMAL" && aiStatus !== "OPTIMAL") {
    comparisonInsight = "⚡ CONCURRENCE: Both traditional rule thresholds and AI models flag this operational state as hazardous.";
  } else {
    comparisonInsight = "✅ STABLE: Both models agree the turbine is running within safe parameter envelopes.";
  }

  return {
    physicsStatus,
    physicsReason,
    physicsTriggers,
    aiAnomalyScore,
    aiStatus,
    aiColor,
    aiHeadline,
    aiDiagnostic,
    remainingUsefulLifeHours,
    comparisonInsight
  };
}

// Pre-set Scenarios for Quick 1-Click Testing
export const ENGINE_PRESETS = {
  optimal: {
    name: "Optimal Cruise",
    description: "Standard cruising speed at nominal temperature & low vibration.",
    temp: 820,
    vibration: 1.1,
    pressure: 680,
    oilContam: 8,
    intakePressure: 1.85
  },
  overheating: {
    name: "Turbine Overheating",
    description: "High inlet temp breaching classical thermodynamic upper limits.",
    temp: 1150,
    vibration: 2.2,
    pressure: 610,
    oilContam: 18,
    intakePressure: 1.6
  },
  vibrationAnomaly: {
    name: "Shaft Vibration Anomaly",
    description: "High mechanical oscillation due to rotor unbalance.",
    temp: 910,
    vibration: 7.2,
    pressure: 630,
    oilContam: 45,
    intakePressure: 1.75
  },
  aiEarlyWarning: {
    name: "Silent Multivariate Degradation",
    description: "Subtle multi-sensor drift that passes traditional rule-checks but triggers AI warning!",
    temp: 975,
    vibration: 4.2,
    pressure: 420,
    oilContam: 44,
    intakePressure: 1.35
  },
  extremeFailure: {
    name: "Catastrophic Failure Scenario",
    description: "Extreme thermal, mechanical, and fuel pressure breakdown.",
    temp: 1340,
    vibration: 9.4,
    pressure: 220,
    oilContam: 85,
    intakePressure: 0.75
  }
};

/**
 * Digital Twin Simulation Calculations
 */
export function evaluateDigitalTwinState({ speedMach, altitudeFt, wingFlexAngle, ambientTempC }) {
  // Mach 0.2 - Mach 3.0
  const aerodynamicDragN = Math.round(0.5 * 1.225 * Math.pow(speedMach * 340, 2) * 28.5 * 0.025);
  const structuralStressMPa = Math.round(180 + (speedMach * 140) + (wingFlexAngle * 18));
  const thermalSkinTempC = Math.round(ambientTempC + Math.pow(speedMach, 2) * 75);
  const twinSyncLatencyMs = Math.round(1.5 + (speedMach * 0.8));

  return {
    aerodynamicDragN,
    structuralStressMPa,
    thermalSkinTempC,
    twinSyncLatencyMs
  };
}

/**
 * Interactive Quiz Questions
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Why do multivariate AI models outperform traditional single-parameter threshold rules in jet engine diagnostics?",
    options: [
      "Traditional rules take up too much memory on aircraft computers.",
      "AI models detect complex, coupled interactions across multiple sensors before any single limit is breached.",
      "AI models completely eliminate the need for physical sensors on the turbine.",
      "Traditional threshold rules only work when the engine is turned off."
    ],
    correctIndex: 1,
    explanation: "Correct! Traditional rules only alert when a single sensor (like Temp > 1100°C) crosses a threshold. AI models recognize combined subtle anomalies (e.g. slight temp rise + slight vibration + pressure drop) indicative of early failure."
  },
  {
    id: 2,
    question: "What is an Aerospace 'Digital Twin'?",
    options: [
      "A duplicate physical aircraft stored in an underground hangar.",
      "A 3D video game graphics model used solely for marketing videos.",
      "A real-time virtual software replica of a physical asset updated continuously with live sensor telemetry.",
      "A backup pilot who operates the aircraft remotely from a ground station."
    ],
    correctIndex: 2,
    explanation: "Correct! A Digital Twin is a dynamic computational model synchronized with real-time physical telemetry to simulate stress, predict maintenance, and optimize performance."
  },
  {
    id: 3,
    question: "In autonomous trajectory planning, how does Deep Reinforcement Learning (DRL) improve upon static waypoint navigation?",
    options: [
      "DRL forces the aircraft to land at the nearest airport immediately.",
      "DRL dynamically re-routes flight paths in real time around moving storms, turbulence, and obstacles while minimizing fuel.",
      "DRL makes the aircraft travel in a straight line regardless of mountain terrain.",
      "DRL replaces the flight control computer with manual steering cables."
    ],
    correctIndex: 1,
    explanation: "Correct! Traditional waypoints are static and rigid. DRL models continuously evaluate airspace geometry, wind vectors, and dynamic obstacles to synthesize smooth, optimal flight paths."
  },
  {
    id: 4,
    question: "What metric is most commonly predicted by aerospace predictive maintenance AI models?",
    options: [
      "Remaining Useful Life (RUL) in operational hours.",
      "The ticket price of passenger flights.",
      "The color of the aircraft fuselage paint.",
      "The weight of luggage loaded in the cargo bay."
    ],
    correctIndex: 0,
    explanation: "Correct! Predictive maintenance AI calculates Remaining Useful Life (RUL), allowing engineering crews to service parts before failure occurs."
  }
];
