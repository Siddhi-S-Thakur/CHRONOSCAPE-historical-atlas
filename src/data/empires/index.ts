import { Empire } from '../../types';

export const EMPIRES: Record<string, Empire> = {
  maurya: {
    id: 'maurya',
    name: 'MAURYA SAMRĀJYA',
    subtitle: 'First Pan-Subcontinental Imperial Horizon',
    startYear: 'c. 322 BCE',
    endYear: '185 BCE',
    periodLabel: 'c. 322–185 BCE',
    region: 'Pan-Subcontinent (Gandhara to Karnataka & Bengal)',
    capital: 'Pāṭaliputra (modern Patna)',
    rulers: ['Chandragupta Maurya', 'Bindusāra', 'Ashoka the Great'],
    description: 'Founded by Chandragupta Maurya with the strategic counsel of Chanakya (Kautilya) following the overthrow of the Nanda Dynasty and treaty with Seleucus I Nicator. Reached its territorial and moral apex under Ashoka, who inscribed Dhamma edicts on rocks and polished sandstone pillars across the subcontinent following the devastating Kalinga Campaign.',
    territoryLayer: 'maurya',
    associatedPlaces: ['pataliputra', 'taxila', 'ujjain', 'tosali', 'varanasi'],
    associatedEvents: ['kalinga_war', 'ashoka_edicts', 'seleucid_treaty'],
    sources: ['Ashokan Major Rock Edicts (Girnar, Shahbazgarhi, Dhauli)', 'Megasthenes\' Indica fragments', 'Kautilya\'s Arthaśāstra'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Southern territorial extent bounded near modern Karnataka/Andhra; Tamilakam chiefdoms remained independent friendly polities (MRE II). Northwest frontiers extended to Arachosia and Gedrosia based on Greek-Aramaic Ashokan inscriptions at Kandahar.',
    contemporaryContext: [
      {
        region: 'Deep South (TamiḺakam)',
        description: 'Chola, Chera, and Pandya polities flourished along lucrative maritime spice routes, explicitly cited in Ashoka\'s Major Rock Edict II as independent southern neighbors.'
      },
      {
        region: 'Northwest & Hellenistic Bactria',
        description: 'Greco-Bactrian polities emerging in modern Balkh; active diplomatic exchanges with Hellenistic Mediterranean courts (Seleucid, Ptolemaic).'
      },
      {
        region: 'Intellectual & Sramana Milieu',
        description: 'Vigorous philosophical debates between Buddhist, Jain, Ajivika, and Vedic traditions, with significant royal and merchant guild (sarthavaha) patronage.'
      }
    ],
    inscriptions: [
      {
        title: 'Major Rock Edict XIII (Kalinga Inscription)',
        description: 'Engraved in Brahmi and Kharosthi scripts: "One hundred and fifty thousand persons were carried away, one hundred thousand were slain, and many times that number died... Thenceforth the Beloved of the Gods was inclined toward Dhamma."'
      },
      {
        title: 'Lion Capital of Ashoka (Sarnath)',
        description: 'Carved out of single blocks of polished Chunar sandstone, featuring four Asiatic lions standing back to back above a frieze with the Dharmachakra wheel.'
      }
    ]
  },
  tamilaham: {
    id: 'tamilaham',
    name: 'TAMIḺAKAM (MŪVĒNTAR)',
    subtitle: 'Sangam Polities: Chola, Chera & Pandya Realms',
    startYear: 'c. 600 BCE',
    endYear: '300 CE',
    periodLabel: 'Early Historic / Sangam Period',
    region: 'Peninsular South India & Northern Sri Lanka',
    capital: 'Uraiyur (Chola) • Vanji/Karur (Chera) • Madurai (Pandya)',
    rulers: ['Karikala Chola', 'Nedunjeliyan (Pandya)', 'Cheran Senguttuvan'],
    description: 'The ancient Tamil country governed by the three crowned kings (Mūvēntar)—the Cheras of the Malabar coast, the Cholas of the Kaveri delta, and the Pandyas of the Vaigai basin. Celebrated for rich Sangam heroic literature, expansive Indian Ocean trade with Rome, Egypt, and Southeast Asia, and distinctive megalithic cultural traditions.',
    territoryLayer: 'tamilaham',
    associatedPlaces: ['thanjavur', 'madurai', 'muziris', 'kaveripattinam'],
    associatedEvents: ['sangam_assemblies', 'roman_maritime_trade'],
    sources: ['Sangam Anthologies (Purananuru, Akananuru)', 'Periplus of the Erythraean Sea', 'Ashokan Major Rock Edict II'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Internal territorial boundaries between the three dynasties shifted dynamically; political control rested on clan alliances and nodality over coastal trade emporia rather than centralized bureaucracy.',
    contemporaryContext: [
      {
        region: 'Roman Maritime Nexus',
        description: 'High volume luxury commerce involving Malabar black pepper, beryl gemstones, and Roman gold solidi hoarded at sites like Arikamedu and Muziris.'
      }
    ]
  },
  gupta: {
    id: 'gupta',
    name: 'GUPTA SAMRĀJYA',
    subtitle: 'Classical Horizon & Sanskrit Cultural Renaissance',
    startYear: 'c. 320 CE',
    endYear: 'c. 550 CE',
    periodLabel: 'c. 320–550 CE',
    region: 'Northern & Central India with Peninsular Tributaries',
    capital: 'Pāṭaliputra / Ujjayinī (Secondary Western Capital)',
    rulers: ['Chandragupta I', 'Samudragupta', 'Chandragupta II Vikramaditya', 'Kumaragupta I'],
    description: 'Marked by stable imperial administration, flourishing Sanskrit literature (Kalidasa), classical temple architecture, decimal mathematics (Aryabhata), and remarkable metallurgical mastery (the rustless Iron Pillar of Delhi). Samudragupta\'s Allahabad Pillar Inscription records military campaigns across Aryavarta and tributary subjugation of Dakshinapatha kings.',
    territoryLayer: 'gupta',
    associatedPlaces: ['pataliputra', 'ujjain', 'varanasi', 'erikina', 'prayaga'],
    associatedEvents: ['samudragupta_digvijaya', 'faxian_travels'],
    sources: ['Allahabad Prashasti (Prayag Stone Pillar by Harishena)', 'Travel records of Faxian', 'Gupta gold numismatic series'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Direct administration was concentrated in the core Gangetic plain and Malwa; outlying frontier rulers (Pratyantas) paid tribute and maintained autonomous domestic administration.'
  },
  chola: {
    id: 'chola',
    name: 'IMPERIAL CHOLA EMPIRE',
    subtitle: 'Maritime Thalassocracy of the Bay of Bengal',
    startYear: '848 CE',
    endYear: '1279 CE',
    periodLabel: 'c. 848–1279 CE',
    region: 'Tamil Country, Sri Lanka, Coastal Andhra & Maritime Srivijaya',
    capital: 'Thanjavur • Later Gangaikonda Cholapuram',
    rulers: ['Rajaraja Chola I', 'Rajendra Chola I', 'Kulothunga Chola I'],
    description: 'Medieval imperial powerhouse renowned for supreme Dravidian temple architecture (Brihadisvara Temple), sophisticated bronze casting (Nataraja), highly autonomous village assemblies (Ur and Sabha governed by Kudavolai lottery system), and unparalleled trans-oceanic naval expeditions across the Bay of Bengal into Srivijaya (Sumatra/Malaya).',
    territoryLayer: 'chola',
    associatedPlaces: ['thanjavur', 'gangaikondacholapuram', 'nagapattinam', 'anuradhapura'],
    associatedEvents: ['brihadisvara_consecration', 'srivijaya_naval_campaign'],
    sources: ['Brihadisvara Temple Inscriptions', 'Thiruvalangadu Copper Plates', 'Song Dynasty Chinese Imperial Court Chronicles'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'The naval raids against Srivijaya (1025 CE) secured maritime merchant privileges and tribute for Chola merchant guilds (Ayyavole 500, Manigramam), rather than permanent direct colonial annexation of Southeast Asian ports.'
  },
  mughal: {
    id: 'mughal',
    name: 'MUGHAL EMPIRE',
    subtitle: 'Centralized Early Modern Subcontinental Hegemony',
    startYear: '1526 CE',
    endYear: '1857 CE',
    periodLabel: 'c. 1526–1857 CE (Imperial Zenith 1556–1707 CE)',
    region: 'Kabul & Indus across Gangetic Heartland down to Northern Deccan',
    capital: 'Agra • Fatehpur Sikri • Delhi (Shahjahanabad)',
    rulers: ['Babur', 'Akbar the Great', 'Jahangir', 'Shah Jahan', 'Aurangzeb'],
    description: 'Founded by Babur after the First Battle of Panipat (1526). Under Akbar, created an integrated bureaucratic imperial administration based on the Mansabdari hierarchy, systematized land revenue (Zabt/Dahsala), secular state patronage (Sulh-i Kul), and stunning architectural synthesis (Fatehpur Sikri, Taj Mahal, Red Fort).',
    territoryLayer: 'mughal',
    associatedPlaces: ['delhi', 'agra', 'fatehpur_sikri', 'lahore'],
    associatedEvents: ['first_battle_panipat', 'din_i_ilahi_promulgation'],
    sources: ['Ain-i-Akbari & Akbarnama (Abu\'l-Fazl)', 'Baburnama', 'Jahangirnama', 'European traveler accounts (Bernier, Tavernier)'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Imperial authority in peripheral regions (such as Assam under the Ahoms, the Western Ghats under the Marathas, and the deep south) was continuously contested.'
  },
  maratha: {
    id: 'maratha',
    name: 'MARATHA SVARAJYA & CONFEDERACY',
    subtitle: 'Indigenous Deccan Resurgence & Hill Fortress Sovereignty',
    startYear: '1674 CE',
    endYear: '1818 CE',
    periodLabel: '1674–1818 CE',
    region: 'Western Deccan, Maharashtra, expanding across Central & Northern India',
    capital: 'Rāigad Fort • Later Satara & Pune (under Peshwas)',
    rulers: ['Chhatrapati Shivaji Maharaj', 'Chhatrapati Sambhaji', 'Peshwa Baji Rao I'],
    description: 'Forged by Chhatrapati Shivaji Maharaj through the mobilization of the Mavali peasantry, rapid Ganimi Kava (guerrilla) mobility, strategic hill fort architectures in the Sahyadris, and an egalitarian administrative code replacing hereditary feudal subinfeudation. Expanded across 18th-century India into a wide confederacy before confrontation with the British East India Company.',
    territoryLayer: 'maratha',
    associatedPlaces: ['raigad', 'pune', 'pratapgad', 'sindhudurg'],
    associatedEvents: ['shivaji_coronation_1674', 'battle_of_pavan_khind', 'third_battle_panipat'],
    sources: ['Sabhasad Bakhar', 'Jedhe Shakavali', 'Dutch & English East India Company Factory Records', 'Contemporary Sanskrit epic Shiva Bharat'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Early Swarajya borders were fluid, characterized by defensible fort strongholds and Chauth/Sardeshmukhi revenue collection spheres rather than static modern boundary lines.'
  },
  harappan: {
    id: 'harappan',
    name: 'INDUS-SARASVATĪ CIVILISATION',
    subtitle: 'Mature Bronze Age Urban Phenomenon',
    startYear: 'c. 2600 BCE',
    endYear: 'c. 1900 BCE',
    periodLabel: 'c. 2600–1900 BCE (Mature Phase)',
    region: 'Indus Basin, Sarasvati/Ghaggar-Hakra, Gujarat & Makran Coast',
    capital: 'Polycentric Metropolises (Harappa, Mohenjo-daro, Rakhigarhi, Dholavira)',
    rulers: ['Civic / Merchant Guild Confederacies (No confirmed dynastic monarchs)'],
    description: 'One of the world\'s oldest urban bronze civilizations, covering over 1 million km². Celebrated for sophisticated town planning, standardized brick ratios (1:2:4), advanced water management reservoirs at Dholavira, subterranean drainage, steatite seal iconography, and widespread craft specialization.',
    territoryLayer: 'harappan',
    associatedPlaces: ['harappa', 'mohenjodaro', 'dholavira', 'lothal', 'rakhigarhi'],
    associatedEvents: ['bronze_age_maritime_trade_sumer', 'deurbanisation_phase'],
    sources: ['Excavated material archaeology (ASI)', 'Cuneiform Mesopotamian texts citing Meluhha', 'Steatite stamp seals'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'The Indus script remains undeciphered; nature of political governance (whether priestly, mercantile oligarchic, or municipal council) remains a subject of ongoing scholarly debate.'
  },
  mahajanapadas: {
    id: 'mahajanapadas',
    name: 'SOḶASA MAHĀJANAPADAS',
    subtitle: 'Sixteen Great Republics & Early Historic Kingdoms',
    startYear: 'c. 600 BCE',
    endYear: 'c. 345 BCE',
    periodLabel: 'c. 6th–4th c. BCE',
    region: 'Indo-Gangetic Divide to Central Deccan (Assaka)',
    capital: 'Rājagṛha (Magadha) • Śrāvastī (Kosala) • Kauśāmbī (Vatsa) • Ujjayinī (Avanti) • Vaiśālī (Vajji)',
    rulers: ['Bimbisara', 'Ajatashatru', 'Prasenajit', 'Chanda Pradyota', 'Mahapadma Nanda'],
    description: 'The era of the "Second Urbanisation" characterized by widespread Northern Black Polished Ware (NBPW), introduction of punch-marked silver currency, development of Brahmi script, and political friction between monarchical realms and oligarchic Ganasangha republics (such as the Vajji confederacy of Vaishali).',
    territoryLayer: 'mahajanapadas',
    associatedPlaces: ['rajagriha', 'varanasi', 'ujjain', 'vaishali', 'taxila'],
    associatedEvents: ['first_buddhist_council', 'rise_of_magadha'],
    sources: ['Buddhist Anguttara Nikaya (list of 16 Mahajanapadas)', 'Jaina Bhagavati Sutra', 'Panini\'s Ashtadhyayi'],
    evidenceLevel: 'PRIMARY SOURCE',
    uncertaintyNotes: 'Lists of the sixteen realms vary slightly between Pali Buddhist and Prakrit Jaina canons, reflecting changing political spheres of influence during the 6th century BCE.'
  }
};
