export interface TradeRoute {
  id: string;
  name: string;
  era: string; // anchor id, or 'all'
  type: 'maritime' | 'overland' | 'riverine';
  sourceName: string;
  sourceCoord: [number, number]; // [lng, lat]
  targetName: string;
  targetCoord: [number, number]; // [lng, lat]
  goodsExported: string[];
  goodsImported: string[];
  navigationNotes: string;
  historicalEvidence: string;
  color: [number, number, number];
  significance: string;
}

export const HISTORICAL_TRADE_ROUTES: TradeRoute[] = [
  // ─── HARAPPAN ERA (c. 2500 BCE) ──────────────────────────────────────────
  {
    id: 'harappan_persian_gulf_1',
    name: 'Meluhha–Dilmun–Ur Maritime Bronze Highway',
    era: 'harappan',
    type: 'maritime',
    sourceName: 'Lothal Dockyard (Gujarat)',
    sourceCoord: [72.25, 22.52],
    targetName: 'Dilmun Emporium (Bahrain)',
    targetCoord: [50.58, 26.06],
    goodsExported: ['Carnelian etched beads', 'Lapis lazuli', 'Ivory objects', 'Fine timbers (teak)'],
    goodsImported: ['Omani copper ingots', 'Bitumen', 'Silver'],
    navigationNotes: 'Coastal cabotage hugging the Makran coast, guided by trained shore-sighting birds (disa-kaka).',
    historicalEvidence: 'Cuneiform tablets of Sargon of Akkad ("ships from Meluhha, Magan, and Dilmun tied at the quays of Agade"); Harappan cubical chert weights discovered in Bahrain and Susa.',
    color: [220, 160, 80],
    significance: 'The world\'s earliest verified intercontinental maritime trade network, linking the Indus basin with Bronze Age Mesopotamia.'
  },
  {
    id: 'harappan_persian_gulf_2',
    name: 'Dilmun–Mesopotamia Royal Canal Route',
    era: 'harappan',
    type: 'maritime',
    sourceName: 'Dilmun (Bahrain)',
    sourceCoord: [50.58, 26.06],
    targetName: 'Ur / Eridu (Mesopotamia)',
    targetCoord: [46.10, 30.96],
    goodsExported: ['Meluhhan carnelian', 'Lapis beads', 'Pearls of the Gulf'],
    goodsImported: ['Mesopotamian wool', 'Barley', 'Leather goods'],
    navigationNotes: 'Shallow Persian Gulf navigation up the Euphrates estuary.',
    historicalEvidence: 'Ur III economic texts recording shipments by Ea-nasir and seafaring merchants of Ur.',
    color: [220, 160, 80],
    significance: 'Final leg delivering Indian commodities into the temple treasuries of Sumer and Akkad.'
  },

  // ─── MAURYAN & HELLENISTIC (c. 260 BCE) ──────────────────────────────────
  {
    id: 'uttarapatha_grand_trunk',
    name: 'Uttarapatha (Great Northern High Road)',
    era: 'maurya',
    type: 'overland',
    sourceName: 'Pāṭaliputra (Magadha Capital)',
    sourceCoord: [85.13, 25.60],
    targetName: 'Takṣaśilā (Taxila, Gandhara)',
    targetCoord: [72.82, 33.74],
    goodsExported: ['Gangetic fine muslin', 'Spikenard', 'Iron implements', 'Ashokan royal edicts'],
    goodsImported: ['Horses from Kamboja/Bactria', 'Precious stones from the Pamirs', 'Hellenistic coins'],
    navigationNotes: 'Imperial highway serviced by shaded rest-houses, milestones (kos-minars), and wells planted by Ashoka every eight koses.',
    historicalEvidence: 'Megasthenes\' description of the Royal Road; Ashoka\'s Major Rock Edict VII & Pillar Edict VII.',
    color: [197, 160, 89],
    significance: 'The imperial arterial highway unifying the Gangetic breadbasket with the Silk Road gateways of Central Asia.'
  },
  {
    id: 'maurya_seleucid_link',
    name: 'Gandhara–Bactria–Seleucid Silk Connector',
    era: 'maurya',
    type: 'overland',
    sourceName: 'Takṣaśilā (Taxila)',
    sourceCoord: [72.82, 33.74],
    targetName: 'Bactra / Balkh (Bactria)',
    targetCoord: [66.90, 36.75],
    goodsExported: ['War elephants (treaty transfer of 500 elephants to Seleucus)', 'Spices', 'Cotton cloth'],
    goodsImported: ['Silver tetradrachms', 'Mediterranean wine', 'Lapis from Badakhshan'],
    navigationNotes: 'Passes through the Khyber Pass and Hindu Kush mountain corridors.',
    historicalEvidence: 'Strabo (Geography 15.2.9) citing the Seleucid-Mauryan treaty; Ashokan inscriptions in Greek and Aramaic discovered at Kandahar.',
    color: [225, 185, 110],
    significance: 'High diplomatic and economic corridor establishing lasting ties between Indian and Hellenistic empires.'
  },

  // ─── SANGAM & INDO-ROMAN MONSOON ROUTE (c. 1st c. BCE – 3rd c. CE) ────────
  {
    id: 'indo_roman_muziris_alexandria',
    name: 'Indo-Roman Monsoon Pepper Highway',
    era: 'tamilaham',
    type: 'maritime',
    sourceName: 'Muziris / Pattanam (Malabar Coast)',
    sourceCoord: [76.21, 10.15],
    targetName: 'Berenike Troglodytica (Red Sea, Roman Egypt)',
    targetCoord: [35.48, 23.90],
    goodsExported: ['Malabar black pepper ("Yavanapriya")', 'Beryl gemstones (Padiyur mines)', 'Fine pearls', 'Malabathrum'],
    goodsImported: ['Roman gold and silver aurei', 'Italian/Aegean amphorae wine', 'Red coral from the Mediterranean', 'Lead and tin'],
    navigationNotes: 'Pioneered by the Greek navigator Eudoxus and merchant Hippalus, utilizing the seasonal Southwest Monsoon winds across the open Arabian Sea.',
    historicalEvidence: 'The Muziris Papyrus (Vienna National Library), detailing a shipment valued at over 7 million sesterces; thousands of Roman imperial gold coins unearthed at Kottayam and Arikamedu.',
    color: [230, 90, 70],
    significance: 'Pliny the Elder lamented that Indian luxury trade drained over 50 million sesterces of Roman bullion annually.'
  },
  {
    id: 'indo_roman_barygaza',
    name: 'Barygaza–Gulf of Aden Nexus',
    era: 'ancient',
    type: 'maritime',
    sourceName: 'Barygaza / Bharuch (Gujarat)',
    sourceCoord: [72.96, 21.70],
    targetName: 'Aden / Eudaemon Arabia',
    targetCoord: [45.03, 12.78],
    goodsExported: ['Spikenard', 'Costus aromatics', 'Onyx and agate from Ratanpur', 'Cotton textiles'],
    goodsImported: ['Arabian frankincense and myrrh', 'Topaz', 'Antimony', 'Silver plate'],
    navigationNotes: 'Dangerous navigation through the high tidal bores of the Gulf of Khambhat requiring local pilots.',
    historicalEvidence: 'Periplus of the Erythraean Sea, sections 41–50.',
    color: [240, 130, 60],
    significance: 'The premier oceanic emporium of western India connecting northern inland capitals with Arabian and Red Sea ports.'
  },
  {
    id: 'red_sea_alexandria_rome',
    name: 'Berenike–Nile–Rome Imperial Transshipment',
    era: 'tamilaham',
    type: 'maritime',
    sourceName: 'Berenike (Red Sea)',
    sourceCoord: [35.48, 23.90],
    targetName: 'Portus / Rome (Italy)',
    targetCoord: [12.49, 41.90],
    goodsExported: ['Malabar black pepper', 'Indian silk', 'Tiger skins', 'Gemstones'],
    goodsImported: ['Roman imperial governance bullion', 'Glassware', 'Fine pottery'],
    navigationNotes: 'Camel caravan across the Eastern Desert from Berenike to Koptos on the Nile, then river barges downstream to Alexandria.',
    historicalEvidence: 'Horace, Odes 1.31; excavated Roman pepper jars at Berenike containing over 7.5 kg of Piper nigrum.',
    color: [210, 80, 80],
    significance: 'Direct line feeding imperial Roman consumption with Indian spices and luxury goods.'
  },

  // ─── GUPTA & CLASSICAL SILK HIGHWAYS (c. 375 CE) ─────────────────────────
  {
    id: 'faxian_pilgrim_silk_route',
    name: 'Trans-Himalayan Buddhist Silk Network',
    era: 'gupta',
    type: 'overland',
    sourceName: 'Chang\'an / Xi\'an (China)',
    sourceCoord: [108.94, 34.34],
    targetName: 'Pāṭaliputra (Gupta Imperial Heartland)',
    targetCoord: [85.13, 25.60],
    goodsExported: ['Chinese silk fabrics', 'Bronze mirrors'],
    goodsImported: ['Sanskrit Buddhist Vinaya manuscripts', 'Sacred relics', 'Spices and incense'],
    navigationNotes: 'Crossing the Taklamakan Desert via Dunhuang and Khotan, scaling the Karakoram ranges.',
    historicalEvidence: 'Faxian\'s Fo-Guo-Ji ("A Record of Buddhist Kingdoms"); Xuanzang\'s later Datang Xiyu Ji.',
    color: [120, 190, 240],
    significance: 'The primary cultural and spiritual conduit transmitting Buddhist scholarship, art, and philosophy between India and East Asia.'
  },

  // ─── IMPERIAL CHOLA MARITIME THALASSOCRACY (c. 1014 CE) ───────────────────
  {
    id: 'chola_srivijaya_expedition',
    name: 'Chola Imperial Naval Thalassocracy Expedition',
    era: 'chola',
    type: 'maritime',
    sourceName: 'Nagapattinam (Chola Royal Port)',
    sourceCoord: [79.84, 10.76],
    targetName: 'Kadaram / Kedah (Malay Peninsula)',
    targetCoord: [100.36, 5.75],
    goodsExported: ['Chola bronze sculptures', 'Wootz steel swords', 'Coromandel woven textiles', 'Cowrie currencies'],
    goodsImported: ['Camphor (Karpura) from Barus', 'Sandalwood and eaglewood', 'Tin from Perak', 'Spices'],
    navigationNotes: 'Trans-oceanic voyage powered by the Northeast and Southwest Monsoons across the Bay of Bengal via the Nicobar archipelago.',
    historicalEvidence: 'Thanjavur Brihadisvara Temple inscriptions of Rajendra Chola I (1025 CE) recording the conquest of 14 kingdoms of Srivijaya; Thiruvalangadu copper plates.',
    color: [64, 190, 240],
    significance: 'History\'s most expansive pre-modern Asian naval campaign, breaking Srivijayan monopolies over the Strait of Malacca.'
  },
  {
    id: 'chola_palembang_srivijaya',
    name: 'Nagapattinam–Palembang Imperial Sea Lane',
    era: 'chola',
    type: 'maritime',
    sourceName: 'Nagapattinam (Chola Port)',
    sourceCoord: [79.84, 10.76],
    targetName: 'Palembang / Srivijaya (Sumatra)',
    targetCoord: [104.75, -2.99],
    goodsExported: ['Fine cotton textiles', 'Cardamom', 'Precious gemstones'],
    goodsImported: ['Aromatic resins', 'Cloves and nutmeg from the Moluccas', 'Gold dust'],
    navigationNotes: 'Deep ocean crossing with navigational charts guided by polar altitude (Kavigai) and astronomical observations.',
    historicalEvidence: 'Leiden Grants of Rajaraja Chola gifting an entire village to support the Chudamani Vihara built by the Srivijayan Sailendra king in Nagapattinam.',
    color: [50, 180, 230],
    significance: 'The diplomatic and commercial cornerstone anchoring Indian Ocean–Pacific transit.'
  },
  {
    id: 'chola_song_china_embassy',
    name: 'Chola–Song Dynasty Maritime Silk Highway',
    era: 'chola',
    type: 'maritime',
    sourceName: 'Kadaram / Malacca Strait',
    sourceCoord: [100.36, 5.75],
    targetName: 'Guangzhou / Canton (Song Dynasty China)',
    targetCoord: [113.26, 23.13],
    goodsExported: ['Pearls from the Gulf of Mannar', 'Tusk ivory', 'Olibanum incense', 'Medicinal herbs'],
    goodsImported: ['Chinese celadon porcelain', 'Raw silk and satin', 'Copper cash', 'Tea'],
    navigationNotes: 'Navigating through the South China Sea avoiding seasonal typhoons.',
    historicalEvidence: 'History of Song (Song Shi), recording the official tribute embassies sent by Raja Chola I (Lo-ts\'a-lo-ts\'a) in 1015 CE and Rajendra Chola in 1033 CE.',
    color: [140, 220, 255],
    significance: 'Direct state-level trade link connecting South Indian merchant guilds (Ayyavole 500, Manigramam) with the maritime customs bureaus (Shibosi) of Song China.'
  },

  // ─── MUGHAL & EARLY MODERN INDIAN OCEAN (c. 1580 CE) ─────────────────────
  {
    id: 'mughal_surat_aden_red_sea',
    name: 'Surat–Mocha Hajj & Textile Gateway',
    era: 'mughal',
    type: 'maritime',
    sourceName: 'Surat (Bandar-i Mubarak, Mughal Port)',
    sourceCoord: [72.83, 21.17],
    targetName: 'Mocha / Al-Mukha (Yemen, Red Sea)',
    targetCoord: [43.25, 13.31],
    goodsExported: ['Fine calicos and chintz from Gujarat', 'Indigo from Bayana', 'Saltpeter', 'Sugar'],
    goodsImported: ['Yemeni Mocha coffee beans', 'Silver rials of eight from the New World', 'Frankincense', 'Hajj pilgrims'],
    navigationNotes: 'Massive royal pilgrim and merchant galleons (e.g. the Ganj-i-Sawai), traversing the Arabian Sea before the arrival of the monsoon.',
    historicalEvidence: 'Ain-i-Akbari records; Dutch and English East India Company factory logs; Ottoman admiralty dispatches in the Indian Ocean.',
    color: [240, 180, 40],
    significance: 'Surat was termed "The Gate of Mecca", handling over 25% of all global cotton textile exports in the 17th century.'
  },
  {
    id: 'mughal_surat_hormuz',
    name: 'Surat–Bandar Abbas / Hormuz Persian Conduit',
    era: 'mughal',
    type: 'maritime',
    sourceName: 'Surat (Gujarat)',
    sourceCoord: [72.83, 21.17],
    targetName: 'Bandar Abbas / Hormuz (Safavid Empire)',
    targetCoord: [56.27, 27.18],
    goodsExported: ['Cardamom', 'Fine muslin (Khas-i-Sharifa)', 'Iron and steel blades', 'Spices'],
    goodsImported: ['Safavid Persian silks and carpets', 'Persian warhorses', 'Dried fruits and pistachios', 'Rosewater'],
    navigationNotes: 'Direct entry into the Strait of Hormuz during the autumn sailing window.',
    historicalEvidence: 'Safavid-Mughal diplomatic correspondence; Jean-Baptiste Tavernier\'s Six Voyages.',
    color: [250, 195, 70],
    significance: 'Key commercial artery interlinking the two great gunpowder empires of Asia.'
  },
  {
    id: 'coromandel_spice_islands',
    name: 'Masulipatnam–Malacca–Bantam Spice Vector',
    era: 'deccan',
    type: 'maritime',
    sourceName: 'Masulipatnam (Golconda / Deccan Port)',
    sourceCoord: [81.13, 16.18],
    targetName: 'Bantam (Java, Indonesia)',
    targetCoord: [106.15, -6.03],
    goodsExported: ['Pattern-dyed Kalamkari cotton fabrics', 'Golconda diamonds', 'Iron nails and anchors'],
    goodsImported: ['Banda nutmeg and mace', 'Moluccan cloves', 'Sandalwood', 'Spices'],
    navigationNotes: 'South-east crossing across the Bay of Bengal into the Sunda Strait.',
    historicalEvidence: 'Golconda court chronicles; VOC factory dispatches documenting that Indian painted textiles were the mandatory currency required to purchase Indonesian spices.',
    color: [180, 120, 240],
    significance: 'Demonstrates the indispensability of Indian textile production in fueling the trans-Eurasian spice trade.'
  }
];

export interface TradingHub {
  id: string;
  name: string;
  alternateName: string;
  coordinates: [number, number]; // [lng, lat]
  region: string;
  role: string;
  isIndianSubcontinent: boolean;
  color: string;
}

export const TRADING_HUBS: TradingHub[] = [
  // Indian Subcontinent Hubs
  { id: 'lothal', name: 'Lothal', alternateName: 'Lothal Dockyard', coordinates: [72.25, 22.52], region: 'Gujarat', role: 'Harappan Tidal Port & Bead Factory', isIndianSubcontinent: true, color: '#E5A93C' },
  { id: 'pataliputra', name: 'Pāṭaliputra', alternateName: 'Patna', coordinates: [85.13, 25.60], region: 'Magadha', role: 'Imperial Mauryan/Gupta Seat & River Hub', isIndianSubcontinent: true, color: '#C5A059' },
  { id: 'taxila', name: 'Takṣaśilā', alternateName: 'Taxila', coordinates: [72.82, 33.74], region: 'Gandhara', role: 'Silk Road Junction & University City', isIndianSubcontinent: true, color: '#E8C574' },
  { id: 'muziris', name: 'Muziris', alternateName: 'Pattanam', coordinates: [76.21, 10.15], region: 'Malabar / Kerala', role: 'Indo-Roman Black Pepper Emporium', isIndianSubcontinent: true, color: '#E65D4F' },
  { id: 'barygaza', name: 'Barygaza', alternateName: 'Bharuch', coordinates: [72.96, 21.70], region: 'Gujarat', role: 'Premier Western Sea Gateway (Periplus)', isIndianSubcontinent: true, color: '#F29C38' },
  { id: 'nagapattinam', name: 'Nagapattinam', alternateName: 'Chola Port', coordinates: [79.84, 10.76], region: 'Coromandel / Tamil', role: 'Chola Imperial Naval Station & Srivijaya Link', isIndianSubcontinent: true, color: '#40BEEF' },
  { id: 'surat', name: 'Surat', alternateName: 'Bandar-i Mubarak', coordinates: [72.83, 21.17], region: 'Gujarat', role: 'Mughal Global Textile & Hajj Port', isIndianSubcontinent: true, color: '#F5C242' },
  { id: 'masulipatnam', name: 'Masulipatnam', alternateName: 'Machilipatnam', coordinates: [81.13, 16.18], region: 'Andhra', role: 'Golconda Kalamkari Export Center', isIndianSubcontinent: true, color: '#A855F7' },

  // World Connecting Hubs
  { id: 'dilmun', name: 'Dilmun', alternateName: 'Bahrain', coordinates: [50.58, 26.06], region: 'Persian Gulf', role: 'Ancient Bronze Age Transshipment Hub', isIndianSubcontinent: false, color: '#7DD3FC' },
  { id: 'ur', name: 'Ur', alternateName: 'Sumer / Mesopotamia', coordinates: [46.10, 30.96], region: 'Mesopotamia', role: 'Bronze Age Temple & Trade Epicenter', isIndianSubcontinent: false, color: '#93C5FD' },
  { id: 'balkh', name: 'Bactra (Balkh)', alternateName: 'Mother of Cities', coordinates: [66.90, 36.75], region: 'Central Asia', role: 'Silk Road Crossroads & Hellenistic Gateway', isIndianSubcontinent: false, color: '#FDE047' },
  { id: 'changan', name: 'Chang\'an', alternateName: 'Xi\'an', coordinates: [108.94, 34.34], region: 'China', role: 'Eastern Terminus of the Silk Road', isIndianSubcontinent: false, color: '#F472B6' },
  { id: 'berenike', name: 'Berenike', alternateName: 'Berenice Troglodytica', coordinates: [35.48, 23.90], region: 'Red Sea / Egypt', role: 'Roman Entry Port for Indian Spices', isIndianSubcontinent: false, color: '#FB923C' },
  { id: 'rome', name: 'Rome (Portus)', alternateName: 'Imperial Rome', coordinates: [12.49, 41.90], region: 'Mediterranean', role: 'Imperial Consumer of Indian Luxury Goods', isIndianSubcontinent: false, color: '#F87171' },
  { id: 'aden', name: 'Aden', alternateName: 'Eudaemon Arabia', coordinates: [45.03, 12.78], region: 'Yemen / Arabia', role: 'Monsoon Waystation & Frankincense Haven', isIndianSubcontinent: false, color: '#FBBF24' },
  { id: 'kedah', name: 'Kadaram (Kedah)', alternateName: 'Kalah', coordinates: [100.36, 5.75], region: 'Malay Peninsula', role: 'Chola Trans-Oceanic Naval Base & Port', isIndianSubcontinent: false, color: '#38BDF8' },
  { id: 'palembang', name: 'Palembang', alternateName: 'Srivijaya Capital', coordinates: [104.75, -2.99], region: 'Sumatra', role: 'Maritime Srivijayan Empire & Strait Key', isIndianSubcontinent: false, color: '#06B6D4' },
  { id: 'guangzhou', name: 'Guangzhou', alternateName: 'Canton', coordinates: [113.26, 23.13], region: 'Song China', role: 'Song Dynasty Maritime Customs Bureau Port', isIndianSubcontinent: false, color: '#EC4899' },
  { id: 'bantam', name: 'Bantam', alternateName: 'Banten', coordinates: [106.15, -6.03], region: 'Java', role: 'Sundanese Pepper & Trans-Pacific Market', isIndianSubcontinent: false, color: '#C084FC' },
  { id: 'hormuz', name: 'Hormuz', alternateName: 'Bandar Abbas', coordinates: [56.27, 27.18], region: 'Persia', role: 'Strait of Hormuz Strategic Entrepot', isIndianSubcontinent: false, color: '#FACC15' },
];
