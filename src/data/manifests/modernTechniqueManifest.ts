export type PlannedTechnique = {
  id: string;
  title: string;
  category:
    | "submission"
    | "guard"
    | "passing"
    | "transition"
    | "escape"
    | "counter"
    | "ride"
    | "wrestle_up"
    | "leg_lock"
    | "front_headlock"
    | "safety"
    | "system";

  modernRelevance:
    | "core"
    | "modern_common"
    | "emerging"
    | "specialized"
    | "safety_critical"
    | "needs_review";

  status:
    | "implemented"
    | "implemented_needs_enrichment"
    | "planned"
    | "source_available"
    | "needs_research"
    | "needs_human_review"
    | "do_not_add_yet";

  priority: 1 | 2 | 3 | 4 | 5;

  riskLevel?:
    | "low"
    | "medium"
    | "high"
    | "safety_critical";

  relatedPositionIds?: string[];
  relatedSkillIds?: string[];
  relatedConceptIds?: string[];
  notes?: string;
};

export const modernTechniqueManifest: PlannedTechnique[] = [
  // Submissions
  {
    id: "high-wrist-guillotine",
    title: "High-Wrist Guillotine",
    category: "submission",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "medium",
    notes: "Key modern front headlock finish.",
  },
  {
    id: "arm-in-guillotine",
    title: "Arm-In Guillotine",
    category: "submission",
    modernRelevance: "core",
    status: "planned",
    priority: 1,
    riskLevel: "medium",
  },
  {
    id: "darce-choke",
    title: "D’Arce Choke",
    category: "submission",
    modernRelevance: "core",
    status: "planned",
    priority: 1,
    riskLevel: "medium",
  },
  {
    id: "anaconda-choke",
    title: "Anaconda Choke",
    category: "submission",
    modernRelevance: "core",
    status: "planned",
    priority: 1,
    riskLevel: "medium",
  },
  {
    id: "japanese-necktie",
    title: "Japanese Necktie",
    category: "submission",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "peruvian-necktie",
    title: "Peruvian Necktie",
    category: "submission",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "rear-triangle-control",
    title: "Rear Triangle Control",
    category: "submission",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "rear-triangle-finish",
    title: "Rear Triangle Finish",
    category: "submission",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "mounted-triangle",
    title: "Mounted Triangle",
    category: "submission",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "gogoplata",
    title: "Gogoplata",
    category: "submission",
    modernRelevance: "specialized",
    status: "implemented",
    priority: 2,
    riskLevel: "high",
  },
  {
    id: "buggy-choke",
    title: "Buggy Choke",
    category: "submission",
    modernRelevance: "emerging",
    status: "implemented",
    priority: 2,
    riskLevel: "high",
    notes: "Focus on safety and neck crank awareness.",
  },
  {
    id: "choi-bar",
    title: "Choi Bar",
    category: "submission",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "tarikoplata",
    title: "Tarikoplata",
    category: "submission",
    modernRelevance: "specialized",
    status: "implemented",
    priority: 2,
    riskLevel: "high",
  },
  {
    id: "straight-ankle-lock",
    title: "Straight Ankle Lock",
    category: "submission",
    modernRelevance: "core",
    status: "planned",
    priority: 1,
    riskLevel: "medium",
  },
  {
    id: "heel-hook-safety",
    title: "Heel Hook Safety",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "implemented",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "aoki-lock-awareness",
    title: "Aoki Lock Awareness",
    category: "submission",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "high",
  },
  {
    id: "z-lock-awareness",
    title: "Z-Lock Awareness",
    category: "submission",
    modernRelevance: "specialized",
    status: "planned",
    priority: 2,
    riskLevel: "high",
  },
  {
    id: "smother-safety",
    title: "Smother Safety",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "implemented",
    priority: 2,
    riskLevel: "safety_critical",
  },

  // Guards / Entries
  {
    id: "octopus-guard",
    title: "Octopus Guard",
    category: "guard",
    modernRelevance: "specialized",
    status: "implemented",
    priority: 1,
  },
  {
    id: "clamp-guard",
    title: "Clamp Guard",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
  },
  {
    id: "shoulder-crunch",
    title: "Shoulder Crunch",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
  },
  {
    id: "k-guard",
    title: "K-Guard",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
  },
  {
    id: "matrix",
    title: "Matrix",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
  },
  {
    id: "false-reap",
    title: "False Reap",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "shin-to-shin",
    title: "Shin-to-Shin",
    category: "guard",
    modernRelevance: "core",
    status: "planned",
    priority: 1,
  },
  {
    id: "single-leg-x",
    title: "Single Leg X",
    category: "guard",
    modernRelevance: "core",
    status: "implemented_needs_enrichment",
    priority: 1,
  },
  {
    id: "x-guard",
    title: "X-Guard",
    category: "guard",
    modernRelevance: "core",
    status: "implemented_needs_enrichment",
    priority: 1,
  },
  {
    id: "backside-5050-control",
    title: "Backside 50/50 Control",
    category: "guard",
    modernRelevance: "modern_common",
    status: "implemented",
    priority: 1,
    riskLevel: "high",
  },
  {
    id: "reverse-buggy-choke",
    title: "Reverse Buggy Choke",
    category: "submission",
    modernRelevance: "emerging",
    status: "planned",
    priority: 3,
    riskLevel: "high",
  },
  {
    id: "baratoplata",
    title: "Baratoplata",
    category: "submission",
    modernRelevance: "specialized",
    status: "planned",
    priority: 3,
    riskLevel: "high",
  },
  {
    id: "shotgun-ankle-lock",
    title: "Shotgun Ankle Lock",
    category: "leg_lock",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "high",
  },
  {
    id: "texas-cloverleaf",
    title: "Texas Cloverleaf",
    category: "leg_lock",
    modernRelevance: "specialized",
    status: "planned",
    priority: 3,
    riskLevel: "high",
  },
  {
    id: "compression-vs-strangle-recognition",
    title: "Compression vs Strangle Recognition",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "planned",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "octopus-to-kimura-trap",
    title: "Octopus to Kimura Trap",
    category: "transition",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "medium",
  },
  {
    id: "clamp-guard-to-triangle",
    title: "Clamp Guard to Triangle",
    category: "transition",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 1,
    riskLevel: "medium",
  },
  {
    id: "false-reap-to-saddle",
    title: "False Reap to Saddle",
    category: "transition",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "fifty-fifty-to-heel-exposure",
    title: "50/50 to Heel Exposure",
    category: "leg_lock",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "safety_critical",
  },
  {
    id: "cross-wrist-ride",
    title: "Cross-Wrist Ride",
    category: "ride",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "medium",
  },
  {
    id: "claw-ride",
    title: "Claw Ride",
    category: "ride",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 3,
    riskLevel: "medium",
  },
  {
    id: "power-half-ride",
    title: "Power Half Ride",
    category: "ride",
    modernRelevance: "specialized",
    status: "planned",
    priority: 3,
    riskLevel: "high",
  },
  {
    id: "dagestani-handcuff",
    title: "Dagestani Handcuff",
    category: "ride",
    modernRelevance: "modern_common",
    status: "planned",
    priority: 2,
    riskLevel: "medium",
  },
  {
    id: "knee-line-escape",
    title: "Knee Line Escape",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "planned",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "reaping-awareness",
    title: "Reaping Awareness",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "planned",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "neck-crank-recognition",
    title: "Neck Crank Recognition",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "planned",
    priority: 1,
    riskLevel: "safety_critical",
  },
  {
    id: "kani-basami-safety",
    title: "Kani Basami Safety",
    category: "safety",
    modernRelevance: "safety_critical",
    status: "planned",
    priority: 2,
    riskLevel: "safety_critical",
  },
];
