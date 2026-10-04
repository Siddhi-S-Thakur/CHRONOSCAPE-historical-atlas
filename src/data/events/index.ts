import { HistoricalEvent } from '../../types';

export const EVENTS: Record<string, HistoricalEvent> = {
  kalinga_war: {
    id: 'kalinga_war',
    name: 'The Kalinga Campaign',
    date: 'c. 261 BCE (8th regnal year of Ashoka)',
    location: 'Coastal Kalinga / Daya River Plains (modern Odisha)',
    coordinates: [680, 450],
    description: 'The watershed military campaign in ancient South Asian history. The independent maritime kingdom of Kalinga was conquered by Ashoka with catastrophic casualties: over 100,000 slain, 150,000 captured and driven away. The resulting remorse led Ashoka to embrace Buddhist moral precepts and formulate his policy of Dhamma-vijaya (conquest through righteousness).',
    participants: ['Ashoka the Great', 'Forces of Sovereign Kalinga'],
    relatedEntities: ['maurya', 'tosali', 'pataliputra'],
    sources: ['Ashokan Major Rock Edict XIII at Girnar and Shahbazgarhi', 'Dhauli Separate Rock Inscriptions'],
    evidenceLevel: 'PRIMARY SOURCE',
    syncAnchorId: 'maurya',
    syncPlaceId: 'tosali'
  },
  shivaji_coronation_1674: {
    id: 'shivaji_coronation_1674',
    name: 'Coronation of Chhatrapati Shivaji Maharaj (Rājyābhiṣeka)',
    date: '6 June 1674 CE (Jyeshtha Shukla Trayodashi)',
    location: 'Rāigad Fort, Western Ghats',
    coordinates: [310, 510],
    description: 'The formal coronation of Shivaji Maharaj as Chhatrapati of Hindavi Swarajya, performed by the revered Varanasi scholar Pandit Gaga Bhatt according to ancient Vedic rites. Established an independent, legitimate sovereign indigenous monarchy in the Deccan that issued its own gold coin (Shivrai Hon) and royal calendar (Rajyabhisheka Shaka).',
    participants: ['Chhatrapati Shivaji Maharaj', 'Pandit Gaga Bhatt', 'Jijabai', 'Henry Oxinden (English Envoy)'],
    relatedEntities: ['maratha', 'raigad'],
    sources: ['Sabhasad Bakhar', 'Henry Oxinden\'s Embassy Journal', 'Jedhe Shakavali'],
    evidenceLevel: 'PRIMARY SOURCE',
    syncAnchorId: 'deccan',
    syncPlaceId: 'raigad'
  },
  battle_of_plassey_1757: {
    id: 'battle_of_plassey_1757',
    name: 'Battle of Plassey (Palashi)',
    date: '23 June 1757 CE',
    location: 'Bhagirathi River, Nadia, Bengal',
    coordinates: [740, 350],
    description: 'The foundational confrontation establishing British East India Company territorial dominance in Bengal. Robert Clive\'s force of 3,000 troops defeated Nawab Siraj-ud-Daulah\'s army of 50,000 following the pre-arranged betrayal and inaction of the Nawab\'s commander-in-chief, Mir Jafar, backed by the financier Jagat Seth.',
    participants: ['Siraj-ud-Daulah', 'Robert Clive', 'Mir Jafar', 'Jagat Seth'],
    relatedEntities: ['plassey', 'delhi'],
    sources: ['Bengal Secret and Military Consultations', 'Siyar-ul-Mutakherin', 'Parliamentary Select Committee Reports on the East India Company'],
    evidenceLevel: 'FACT',
    syncAnchorId: 'plassey',
    syncPlaceId: 'plassey'
  },
  uprising_of_1857: {
    id: 'uprising_of_1857',
    name: 'The Great Uprising of 1857',
    date: '10 May 1857 – 1858 CE',
    location: 'Northern & Central India (Meerut, Delhi, Awadh, Bundelkhand)',
    coordinates: [430, 275],
    description: 'A simultaneous, polycentric uprising comprising military mutiny and widespread civilian insurrection against East India Company rule. Sparked by grievances over greased cartridges, the Doctrine of Lapse, excessive land revenue assessments, and fear of religious interference.',
    participants: ['Bahadur Shah Zafar', 'Rani Lakshmibai', 'Begum Hazrat Mahal', 'Nana Saheb', 'Tantia Tope', 'Kunwar Singh', 'Mangal Pandey'],
    relatedEntities: ['revolt', 'meerut', 'delhi', 'lucknow', 'jhansi', 'kanpur', 'jagdishpur', 'barrackpore'],
    sources: ['National Archives of India Mutiny Papers', 'British Parliamentary Papers on East India', 'Mirza Ghalib\'s Dastanbuy'],
    evidenceLevel: 'PRIMARY SOURCE',
    syncAnchorId: 'revolt',
    syncPlaceId: 'delhi'
  },
  brihadisvara_consecration: {
    id: 'brihadisvara_consecration',
    name: 'Consecration of the Brihadisvara Temple (Dakshina Meru)',
    date: '1010 CE (25th regnal year of Rajaraja I)',
    location: 'Thanjavur, Kaveri Delta',
    coordinates: [480, 745],
    description: 'The formal consecration and kumbhabhisheka of the Rajarajeswaram temple at Thanjavur. The 216-foot granite vimana represented a colossal engineering feat and architectural peak of Dravidian temple art, with extensive inscriptions recording endowments, dance masters, musicians, and administrative charters.',
    participants: ['Rajaraja Chola I', 'Kundavai Pirattiyar', 'Karuvur Devar'],
    relatedEntities: ['chola', 'thanjavur'],
    sources: ['Brihadisvara Temple North and South Wall Inscriptions', 'Epigraphia Indica Vol. II'],
    evidenceLevel: 'PRIMARY SOURCE',
    syncAnchorId: 'chola',
    syncPlaceId: 'thanjavur'
  },
  indian_independence_1947: {
    id: 'indian_independence_1947',
    name: 'Indian Independence & Partition',
    date: '15 August 1947 CE',
    location: 'New Delhi & Karachi',
    coordinates: [420, 270],
    description: 'The termination of British colonial rule and transfer of power to the sovereign dominions of India and Pakistan under the Indian Independence Act. Accompanied by catastrophic cross-border communal violence, displacement of over 14 million refugees along the Radcliffe Line, and the subsequent integration of 565 princely states into the Indian Union.',
    participants: ['Jawaharlal Nehru', 'Vallabhbhai Patel', 'Muhammad Ali Jinnah', 'Lord Mountbatten', 'Mahatma Gandhi'],
    relatedEntities: ['independence', 'delhi'],
    sources: ['The Transfer of Power 1942–47 (Official British HMSO Documents)', 'Constituent Assembly Debates of India', 'Radcliffe Boundary Commission Reports'],
    evidenceLevel: 'FACT',
    syncAnchorId: 'independence',
    syncPlaceId: 'delhi'
  }
};
