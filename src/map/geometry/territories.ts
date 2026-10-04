// Historical Empire GeoJSON Polygons
// Approximate reconstructed territories — boundaries reflect scholarly consensus
// where historical evidence permits. Uncertain frontiers use dashed styling.

export type EmpireGeoFeature = {
  id: string;
  name: string;
  color: [number, number, number];   // RGB 0-255
  opacity: number;
  borderColor: [number, number, number];
  polygon: number[][];               // [lng, lat] pairs
  label: string;
  labelCoord: [number, number];
  uncertaintyNote?: string;
};

export const EMPIRE_TERRITORIES: Record<string, EmpireGeoFeature[]> = {
  geology: [], // Three.js Globe handles geology era

  harappan: [
    {
      id: 'harappan-core',
      name: 'Indus-Sarasvatī Civilisation',
      color: [180, 140, 80],
      opacity: 0.45,
      borderColor: [220, 180, 100],
      polygon: [
        [60.0, 35.5], [73.0, 36.5], [78.5, 34.0], [80.0, 30.0],
        [77.0, 26.0], [75.0, 22.0], [70.0, 20.5], [65.5, 22.0],
        [62.0, 25.5], [59.5, 28.0], [58.5, 31.0], [60.0, 35.5]
      ],
      label: 'INDUS-SARASVATĪ\nCIVILISATION',
      labelCoord: [70.5, 28.5],
    }
  ],

  ancient: [
    {
      id: 'mahajanapadas-core',
      name: 'Mahājanapadas Heartland',
      color: [120, 160, 200],
      opacity: 0.38,
      borderColor: [160, 200, 240],
      polygon: [
        [70.0, 34.0], [83.0, 28.0], [87.0, 22.0], [80.0, 18.0],
        [75.0, 18.0], [72.0, 20.0], [68.0, 24.0], [68.0, 28.0],
        [70.0, 34.0]
      ],
      label: 'SOḶASA MAHĀJANAPADAS',
      labelCoord: [78.0, 25.5],
    }
  ],

  maurya: [
    {
      id: 'maurya-core',
      name: 'Maurya Samrājya',
      color: [197, 160, 89],
      opacity: 0.42,
      borderColor: [240, 210, 140],
      polygon: [
        [62.0, 35.5], [67.0, 37.5], [74.0, 36.5], [80.0, 35.5],
        [88.5, 27.0], [90.0, 21.0], [87.0, 17.0], [82.0, 14.0],
        [76.0, 14.0], [73.0, 15.5], [72.0, 20.5], [68.0, 22.5],
        [65.0, 28.0], [61.5, 33.5], [62.0, 35.5]
      ],
      label: 'MAURYA SAMRĀJYA',
      labelCoord: [78.5, 24.0],
      uncertaintyNote: 'Southern frontier debated — approximate based on Ashokan epigraphic sites'
    },
    {
      id: 'tamilaham',
      name: 'TamiḺakam (Mūvēntar)',
      color: [210, 90, 60],
      opacity: 0.40,
      borderColor: [240, 130, 90],
      polygon: [
        [76.0, 14.0], [80.0, 14.0], [80.5, 11.0], [79.5, 8.0],
        [77.5, 8.5], [76.5, 10.0], [75.5, 12.0], [76.0, 14.0]
      ],
      label: 'TAMIḺAKAM',
      labelCoord: [78.5, 11.0],
    }
  ],

  gupta: [
    {
      id: 'gupta-core',
      name: 'Gupta Samrājya',
      color: [100, 180, 120],
      opacity: 0.40,
      borderColor: [140, 220, 160],
      polygon: [
        [70.0, 32.0], [84.0, 28.0], [88.0, 22.0], [83.0, 18.0],
        [77.0, 18.0], [73.0, 20.0], [70.0, 24.0], [68.0, 28.0],
        [70.0, 32.0]
      ],
      label: 'GUPTA SAMRĀJYA',
      labelCoord: [78.5, 25.0],
    },
    {
      id: 'tamilaham-2',
      name: 'Pallava & Southern Kingdoms',
      color: [210, 90, 60],
      opacity: 0.30,
      borderColor: [240, 130, 90],
      polygon: [
        [76.0, 14.0], [80.5, 14.0], [80.5, 9.0], [78.0, 8.0],
        [76.5, 10.5], [76.0, 14.0]
      ],
      label: 'PALLAVA & SOUTHERN REALMS',
      labelCoord: [78.5, 11.5],
    }
  ],

  chola: [
    {
      id: 'chola-core',
      name: 'Imperial Chola Empire',
      color: [210, 90, 60],
      opacity: 0.48,
      borderColor: [255, 140, 100],
      polygon: [
        [77.0, 14.0], [80.5, 14.5], [81.0, 12.0], [80.5, 9.0],
        [79.0, 8.0], [77.0, 8.5], [76.5, 10.5], [77.0, 14.0]
      ],
      label: 'IMPERIAL CHOLA',
      labelCoord: [79.0, 11.0],
    },
    {
      id: 'chola-northern-deccan',
      name: 'Northern Deccan Tributaries',
      color: [210, 90, 60],
      opacity: 0.22,
      borderColor: [240, 130, 90],
      polygon: [
        [74.0, 16.0], [80.5, 14.5], [82.0, 16.0], [80.0, 20.0],
        [77.0, 18.0], [74.0, 16.0]
      ],
      label: 'DECCAN TRIBUTARIES',
      labelCoord: [78.5, 17.0],
    }
  ],

  mughal: [
    {
      id: 'mughal-core',
      name: 'Mughal Empire',
      color: [60, 130, 100],
      opacity: 0.40,
      borderColor: [90, 180, 140],
      polygon: [
        [62.0, 36.0], [70.0, 38.0], [76.0, 36.5], [88.0, 28.0],
        [88.0, 22.0], [84.0, 18.0], [77.5, 17.0], [73.0, 18.0],
        [72.0, 22.0], [68.0, 26.0], [64.0, 31.0], [62.0, 36.0]
      ],
      label: 'MUGHAL EMPIRE',
      labelCoord: [78.0, 27.0],
    },
    {
      id: 'tamilaham-3',
      name: 'Deccan Sultanates & Vijayanagara',
      color: [140, 100, 200],
      opacity: 0.28,
      borderColor: [180, 140, 230],
      polygon: [
        [73.0, 18.0], [84.0, 18.0], [80.5, 12.0], [78.0, 10.0],
        [76.5, 12.0], [75.0, 15.0], [73.0, 18.0]
      ],
      label: 'DECCAN SULTANATES',
      labelCoord: [78.0, 15.0],
    }
  ],

  deccan: [
    {
      id: 'mughal-background',
      name: 'Late Mughal (Declining)',
      color: [60, 130, 100],
      opacity: 0.18,
      borderColor: [90, 180, 140],
      polygon: [
        [68.0, 34.0], [76.0, 36.5], [88.0, 28.0], [88.0, 22.0],
        [84.0, 18.0], [77.5, 17.0], [73.0, 18.0], [72.0, 22.0],
        [68.0, 28.0], [68.0, 34.0]
      ],
      label: 'MUGHAL (LATE PHASE)',
      labelCoord: [80.5, 27.0],
    },
    {
      id: 'maratha-svarajya',
      name: 'Maratha Hindavī Swarājya',
      color: [224, 122, 95],
      opacity: 0.52,
      borderColor: [255, 165, 130],
      polygon: [
        [72.5, 20.5], [76.5, 20.0], [80.0, 18.0], [78.0, 14.0],
        [76.0, 14.5], [74.0, 17.0], [72.0, 18.5], [72.5, 20.5]
      ],
      label: 'HINDAVĪ SVARĀJYA\n(Chhatrapati Shivaji)',
      labelCoord: [76.0, 17.5],
    }
  ],

  plassey: [
    {
      id: 'eic-bengal',
      name: 'EIC Bengal Hegemony',
      color: [180, 80, 80],
      opacity: 0.40,
      borderColor: [220, 120, 120],
      polygon: [
        [84.0, 28.0], [92.0, 26.0], [92.0, 21.0], [87.0, 20.0],
        [84.0, 22.0], [84.0, 28.0]
      ],
      label: 'EIC BENGAL (POST-PLASSEY)',
      labelCoord: [88.0, 24.0],
    },
    {
      id: 'nawab-residual',
      name: 'Residual Regional Nawabs',
      color: [100, 150, 200],
      opacity: 0.25,
      borderColor: [140, 190, 240],
      polygon: [
        [68.0, 34.0], [84.0, 28.0], [84.0, 22.0], [77.5, 17.0],
        [73.0, 18.0], [72.0, 22.0], [68.0, 28.0], [68.0, 34.0]
      ],
      label: 'REGIONAL NAWABS & MARATHA CONFEDERACY',
      labelCoord: [77.0, 25.0],
    }
  ],

  revolt: [
    {
      id: 'british-india-1857',
      name: 'British India (EIC) — Contested Territories',
      color: [180, 80, 80],
      opacity: 0.22,
      borderColor: [230, 57, 70],
      polygon: [
        [68.0, 36.0], [76.0, 36.5], [88.0, 26.0], [90.0, 21.0],
        [86.0, 15.0], [76.0, 8.5], [72.0, 8.5], [76.0, 16.0],
        [72.0, 22.0], [68.0, 28.0], [66.0, 36.0], [68.0, 36.0]
      ],
      label: 'BRITISH INDIA (CONTESTED 1857)',
      labelCoord: [79.0, 23.0],
    }
  ],

  independence: [
    {
      id: 'dominion-india',
      name: 'Dominion of India (1947)',
      color: [255, 153, 51],
      opacity: 0.35,
      borderColor: [255, 190, 90],
      polygon: [
        [68.0, 37.0], [77.0, 36.0], [88.0, 28.0], [92.0, 26.0],
        [97.0, 28.0], [97.5, 22.0], [90.0, 20.0], [80.0, 8.0],
        [77.0, 8.0], [76.5, 14.0], [72.0, 15.0], [70.0, 22.0],
        [68.0, 28.0], [68.0, 37.0]
      ],
      label: 'DOMINION OF INDIA (1947)',
      labelCoord: [82.0, 22.0],
    },
    {
      id: 'dominion-pakistan',
      name: 'Dominion of Pakistan (1947)',
      color: [30, 150, 100],
      opacity: 0.32,
      borderColor: [60, 190, 130],
      polygon: [
        [62.0, 37.0], [74.0, 37.0], [77.0, 36.0], [68.0, 28.0],
        [66.0, 24.0], [62.0, 26.0], [60.0, 30.0], [62.0, 37.0]
      ],
      label: 'DOMINION OF PAKISTAN (1947)',
      labelCoord: [68.0, 31.0],
    }
  ]
};
