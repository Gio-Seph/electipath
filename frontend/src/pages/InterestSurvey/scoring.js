import { surveyQuestions } from "./surveyQuestions.jsx";

// ============================================================================
// ENHANCED SCORING ALGORITHM
// Combines RIASEC trait analysis with direct question-elective mapping
// ============================================================================

// RIASEC Trait Weights for Each Elective (Holland Codes Theory)
// Balanced to ensure each elective has distinct advantages
const electiveTraitWeights = {
  MMGD: { 
    A: 5,  // Artistic - PRIMARY (creativity, design, visual arts)
    R: 2,  // Realistic - SECONDARY (hands-on game development)
    I: 1,  // Investigative - TERTIARY (problem-solving in game logic)
    S: 1,  // Social - MINOR (collaboration)
    E: 1,  // Enterprising - MINOR (publishing games)
    C: 0.5 // Conventional - MINIMAL (less structured)
  },
  ITBA: { 
    I: 5,  // Investigative - PRIMARY (data analysis, research)
    C: 4,  // Conventional - SECONDARY (structured data, organization)
    E: 3,  // Enterprising - TERTIARY (business strategy)
    A: 1,  // Artistic - MINOR (data visualization)
    S: 1,  // Social - MINOR (presenting insights)
    R: 0.5 // Realistic - MINIMAL (less hands-on building)
  },
  MobileDev: { 
    R: 5,  // Realistic - PRIMARY (hands-on coding, building)
    I: 3,  // Investigative - SECONDARY (problem-solving, debugging)
    A: 2,  // Artistic - TERTIARY (UI/UX design)
    C: 1,  // Conventional - MINOR (following frameworks)
    E: 1,  // Enterprising - MINOR (app deployment)
    S: 1   // Social - MINOR (user-focused design)
  },
};

// Direct Question-to-Elective Mapping with Importance Weights
// Questions that strongly indicate a specific elective
const questionElectiveMapping = {
  // MMGD-focused questions (IDs: 1, 2, 3, 6, 7)
  1: { MMGD: 1.5, ITBA: 0.2, MobileDev: 0.5 },  // "creating animations, videos, games"
  2: { MMGD: 1.3, ITBA: 0.8, MobileDev: 0.9 },  // "creative solutions"
  3: { MMGD: 1.2, ITBA: 0.3, MobileDev: 1.4 },  // "designing interfaces" - also Mobile
  6: { MMGD: 1.5, ITBA: 0.2, MobileDev: 0.4 },  // "digital artwork or media"
  7: { MMGD: 1.3, ITBA: 0.5, MobileDev: 1.3 },  // "designing products" - also Mobile
  
  // ITBA-focused questions (IDs: 8, 9, 10, 11, 12, 13, 14)
  8: { MMGD: 0.2, ITBA: 1.8, MobileDev: 0.4 },  // "analyzing data to find patterns"
  9: { MMGD: 0.1, ITBA: 1.7, MobileDev: 0.5 },  // "organizing information and structured data"
  10: { MMGD: 0.3, ITBA: 1.6, MobileDev: 0.6 }, // "improving systems or processes"
  11: { MMGD: 0.3, ITBA: 1.7, MobileDev: 0.5 }, // "planning and strategizing"
  12: { MMGD: 0.2, ITBA: 1.8, MobileDev: 0.4 }, // "decisions based on data and trends"
  13: { MMGD: 0.2, ITBA: 1.8, MobileDev: 0.4 }, // "evaluating information"
  14: { MMGD: 0.2, ITBA: 1.9, MobileDev: 0.4 }, // "logic and analysis for business"
  
  // MobileDev-focused questions (IDs: 15, 16, 17, 18, 19, 20, 21)
  15: { MMGD: 0.5, ITBA: 0.4, MobileDev: 1.6 }, // "coding, testing, building software"
  16: { MMGD: 0.3, ITBA: 0.2, MobileDev: 1.7 }, // "building apps for devices"
  17: { MMGD: 0.7, ITBA: 0.3, MobileDev: 1.5 }, // "hands-on technical projects"
  18: { MMGD: 0.6, ITBA: 0.8, MobileDev: 1.4 }, // "learning new technologies"
  19: { MMGD: 0.9, ITBA: 0.2, MobileDev: 1.5 }, // "designing functional UI"
  20: { MMGD: 0.4, ITBA: 0.5, MobileDev: 1.4 }, // "troubleshooting technical problems"
  21: { MMGD: 1.1, ITBA: 0.3, MobileDev: 1.5 }, // "combining creativity with technical skills"
  
  // Collaborative question (ID: 4)
  4: { MMGD: 1.0, ITBA: 0.8, MobileDev: 0.9 },  // "collaborating on creative projects"
  5: { MMGD: 0.8, ITBA: 1.2, MobileDev: 1.1 },  // "finding innovative solutions"
};

// Question Importance Multipliers
// Some questions are stronger indicators than others
const questionImportance = {
  // High importance - direct elective indicators
  1: 1.5,   // animations/videos/games → MMGD
  6: 1.5,   // digital artwork → MMGD
  8: 1.5,   // analyzing data → ITBA
  12: 1.5,  // decisions based on data → ITBA
  14: 1.5,  // business problems → ITBA
  15: 1.5,  // coding/building software → Mobile
  16: 1.5,  // building apps → Mobile
  21: 1.5,  // creativity + technical → Mobile/MMGD
  
  // Medium importance - supporting indicators
  3: 1.3,   // designing interfaces
  7: 1.3,   // designing products
  9: 1.3,   // structured data
  13: 1.3,  // evaluating information
  19: 1.3,  // functional UI
  20: 1.3,  // troubleshooting
  
  // Standard importance - general indicators
  2: 1.0,
  4: 1.0,
  5: 1.0,
  10: 1.0,
  11: 1.0,
  17: 1.0,
  18: 1.0,
};

// Trait Synergy Bonuses
// Certain trait combinations strongly indicate specific electives
const traitSynergies = {
  MMGD: [
    { traits: ['A', 'R'], bonus: 15, description: 'Artistic + Realistic = Game Development' },
    { traits: ['A', 'A'], bonus: 10, description: 'Strong Artistic = Creative Media' },
  ],
  ITBA: [
    { traits: ['I', 'C'], bonus: 15, description: 'Investigative + Conventional = Data Analysis' },
    { traits: ['I', 'E'], bonus: 12, description: 'Investigative + Enterprising = Business Analytics' },
    { traits: ['C', 'E'], bonus: 10, description: 'Conventional + Enterprising = Business Intelligence' },
  ],
  MobileDev: [
    { traits: ['R', 'A'], bonus: 15, description: 'Realistic + Artistic = Mobile UI/UX' },
    { traits: ['R', 'I'], bonus: 12, description: 'Realistic + Investigative = Technical Development' },
    { traits: ['R', 'R'], bonus: 10, description: 'Strong Realistic = Hands-on Building' },
  ],
};

export function calculateScores(answers, tieBreaker = null) {
  // ============================================================================
  // STEP 1: Calculate RIASEC Trait Scores
  // ============================================================================
  const traitScores = {};
  surveyQuestions.forEach((q) => (traitScores[q.trait] = 0));

  surveyQuestions.forEach((q, index) => {
    const answerVal = answers[index];
    if (typeof answerVal === "number") {
      // Apply question importance multiplier
      const importance = questionImportance[q.id] || 1.0;
      traitScores[q.trait] += answerVal * importance;
    }
  });

  // ============================================================================
  // STEP 2: Calculate Base Elective Scores (RIASEC Method)
  // ============================================================================
  const electiveScores = {};
  for (const elective in electiveTraitWeights) {
    let score = 0;
    const weights = electiveTraitWeights[elective];

    for (const trait in weights) {
      score += weights[trait] * (traitScores[trait] || 0);
    }

    electiveScores[elective] = score;
  }

  // ============================================================================
  // STEP 3: Add Direct Question-Elective Mapping Scores
  // ============================================================================
  const directScores = { MMGD: 0, ITBA: 0, MobileDev: 0 };
  
  surveyQuestions.forEach((q, index) => {
    const answerVal = answers[index];
    if (typeof answerVal === "number" && questionElectiveMapping[q.id]) {
      const mapping = questionElectiveMapping[q.id];
      
      for (const elective in mapping) {
        // Direct score: mapping weight × answer value × scaling factor
        // Example: 1.5 (mapping) × 5 (answer) × 8 = 60 points max per question
        directScores[elective] += mapping[elective] * answerVal * 8;
      }
    }
  });

  // Combine base scores with direct scores (60% RIASEC, 40% direct mapping)
  // Increased direct mapping weight to better reflect specific question answers
  for (const elective in electiveScores) {
    electiveScores[elective] = (electiveScores[elective] * 0.6) + (directScores[elective] * 0.4);
  }

  // ============================================================================
  // STEP 4: Apply Trait Synergy Bonuses
  // ============================================================================
  for (const elective in traitSynergies) {
    const synergies = traitSynergies[elective];
    
    synergies.forEach(synergy => {
      // Check if user has high scores in the synergy traits
      const traitValues = synergy.traits.map(t => traitScores[t] || 0);
      const avgTraitScore = traitValues.reduce((a, b) => a + b, 0) / traitValues.length;
      
      // If average trait score is high (> 15), apply synergy bonus
      if (avgTraitScore > 15) {
        const synergyStrength = Math.min(1, avgTraitScore / 25); // Max at score of 25
        electiveScores[elective] += synergy.bonus * synergyStrength;
      }
    });
  }

  // ============================================================================
  // STEP 5: Normalize Scores to 0-100 Scale (Fair Normalization)
  // ============================================================================
  // Calculate maximum possible scores for each elective (when all answers = 5)
  // Normalize each elective against its OWN maximum to ensure fairness
  
  const maxPossibleScores = {};
  
  // Step 1: Calculate max possible trait scores (all answers = 5)
  const maxTraitScores = {};
  surveyQuestions.forEach((q) => {
    const importance = questionImportance[q.id] || 1.0;
    maxTraitScores[q.trait] = (maxTraitScores[q.trait] || 0) + (5 * importance);
  });
  
  // Step 2: Calculate max possible RIASEC weighted scores for each elective
  for (const elective in electiveTraitWeights) {
    let maxRIASEC = 0;
    const weights = electiveTraitWeights[elective];
    for (const trait in weights) {
      maxRIASEC += weights[trait] * (maxTraitScores[trait] || 0);
    }
    
    // Step 3: Calculate max possible direct mapping score
    let maxDirect = 0;
    surveyQuestions.forEach((q) => {
      if (questionElectiveMapping[q.id]) {
        const mapping = questionElectiveMapping[q.id];
        maxDirect += (mapping[elective] || 0) * 5 * 8; // All answers = 5
      }
    });
    
    // Step 4: Max possible combined score (60% RIASEC + 40% Direct)
    maxPossibleScores[elective] = (maxRIASEC * 0.6) + (maxDirect * 0.4);
  }
  
  // Step 5: Normalize each elective against its OWN maximum
  const normalizedScores = {};
  for (const elective in electiveScores) {
    const maxPossible = maxPossibleScores[elective];
    normalizedScores[elective] = Math.round((electiveScores[elective] / maxPossible) * 100);
  }
  
  // Step 6: Check if scores are very close (within 5 points)
  const normalizedScoreValues = Object.values(normalizedScores).sort((a, b) => b - a);
  const topNormalizedScore = normalizedScoreValues[0];
  const secondNormalizedScore = normalizedScoreValues[1] || 0;
  const normalizedGap = topNormalizedScore - secondNormalizedScore;
  
  // If gap is less than 5 points, normalize all to equal (triggers tiebreaker)
  if (normalizedGap < 5) {
    for (const elective in normalizedScores) {
      normalizedScores[elective] = 100; // All equal
    }
  }

  // ============================================================================
  // STEP 6: Determine Recommendation
  // ============================================================================
  let maxScore = Math.max(...Object.values(normalizedScores));
  let topElectives = Object.keys(normalizedScores).filter(
    (e) => normalizedScores[e] === maxScore
  );

  // If all scores are equal (tie), require tiebreaker
  if (topElectives.length === 3 && !tieBreaker) {
    // Return special flag to show tiebreaker screen
    return {
      recommended: null, // No recommendation yet - requires tiebreaker
      requiresTiebreaker: true,
      traitScores,
      electiveScores: normalizedScores,
      rawScores: electiveScores,
      directScores,
      confidence: 0, // Low confidence when tied
      gap: 0,
      topTraits: Object.entries(traitScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([trait, score]) => ({
          trait,
          score: Math.round(score),
          name: getTraitName(trait)
        })),
      reasoning: ["Your interests are evenly distributed across all electives. Please choose your preferred track."]
    };
  }

  // Tie-breaker logic
  if (topElectives.length > 1 && tieBreaker) {
    normalizedScores[tieBreaker] += 5; // Add 5 points for tie-breaker choice
    maxScore = Math.max(...Object.values(normalizedScores));
    topElectives = Object.keys(normalizedScores).filter(
      (e) => normalizedScores[e] === maxScore
    );
  }

  const recommended =
    topElectives.length === 1
      ? topElectives[0]
      : topElectives[Math.floor(Math.random() * topElectives.length)];

  // ============================================================================
  // STEP 7: Calculate Confidence Score
  // ============================================================================
  const sortedScores = Object.values(normalizedScores).sort((a, b) => b - a);
  const topScore = sortedScores[0];
  const secondScore = sortedScores[1] || 0;
  const gap = topScore - secondScore;
  
  // Confidence based on gap between top 2 scores
  // Large gap (>20) = high confidence (90-100%)
  // Medium gap (10-20) = medium confidence (70-90%)
  // Small gap (<10) = low confidence (50-70%)
  const confidenceScore = Math.min(100, 50 + gap * 2);

  // ============================================================================
  // STEP 8: Generate Detailed Analysis
  // ============================================================================
  const analysis = {
    recommended,
    traitScores,
    electiveScores: normalizedScores,
    rawScores: electiveScores, // Keep raw scores for debugging
    directScores, // Direct question mapping scores
    confidence: Math.round(confidenceScore),
    gap: Math.round(gap),
    
    // Top 3 traits for the user
    topTraits: Object.entries(traitScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait, score]) => ({
        trait,
        score: Math.round(score),
        name: getTraitName(trait)
      })),
    
    // Reasoning for recommendation
    reasoning: generateReasoning(recommended, traitScores, normalizedScores)
  };

  return analysis;
}

// Helper: Get full trait name
function getTraitName(trait) {
  const names = {
    R: 'Realistic (Hands-on, Technical)',
    I: 'Investigative (Analytical, Problem-solving)',
    A: 'Artistic (Creative, Design-oriented)',
    S: 'Social (Collaborative, People-focused)',
    E: 'Enterprising (Leadership, Strategic)',
    C: 'Conventional (Organized, Detail-oriented)'
  };
  return names[trait] || trait;
}

// Helper: Generate reasoning text
function generateReasoning(elective, traitScores, electiveScores) {
  const reasons = [];
  
  // Get top 2 traits
  const topTraits = Object.entries(traitScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([trait]) => trait);
  
  // Elective-specific reasoning
  if (elective === 'MMGD') {
    if (topTraits.includes('A')) {
      reasons.push('Your strong Artistic traits align perfectly with creative game and media development.');
    }
    if (topTraits.includes('R')) {
      reasons.push('Your Realistic approach suits hands-on game development and 3D modeling.');
    }
    if (electiveScores.MMGD - electiveScores.MobileDev < 10) {
      reasons.push('You also show interest in Mobile Development - consider combining game dev with mobile platforms.');
    }
  } else if (elective === 'ITBA') {
    if (topTraits.includes('I')) {
      reasons.push('Your Investigative nature is ideal for data analysis and pattern recognition.');
    }
    if (topTraits.includes('C')) {
      reasons.push('Your Conventional traits help you excel at organizing and structuring data.');
    }
    if (topTraits.includes('E')) {
      reasons.push('Your Enterprising mindset will help you translate data into business strategy.');
    }
  } else if (elective === 'MobileDev') {
    if (topTraits.includes('R')) {
      reasons.push('Your Realistic traits are perfect for hands-on mobile app development.');
    }
    if (topTraits.includes('A')) {
      reasons.push('Your Artistic side will help you create beautiful, user-friendly interfaces.');
    }
    if (topTraits.includes('I')) {
      reasons.push('Your Investigative skills will help you solve complex technical challenges.');
    }
  }
  
  return reasons;
}

// ============================================================================
// EXPORT ENHANCED SCORING FUNCTION
// ============================================================================
export { electiveTraitWeights, questionElectiveMapping };
