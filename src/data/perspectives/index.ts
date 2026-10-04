import { Perspective } from '../../types';

export const PERSPECTIVES: Record<string, Perspective> = {
  soldier: {
    id: 'soldier',
    title: 'SOLDIER / SEPOY',
    subtitle: 'Bengal Native Infantry Regiment Cantonments',
    shortDesc: 'Regimental disquiet, overseas service anxiety, and cartridge controversies.',
    historicalContext: 'In the spring of 1857, the Bengal Army comprised approximately 232,000 Indian sepoys and 45,000 British soldiers. The introduction of the Enfield pattern-1853 rifle required tearing with teeth the greased paper cartridge containing gunpowder, widely believed across Hindu and Muslim ranks to be tallow of cows and lard of pigs, threatening caste and faith.',
    eyewitnessAccount: 'Court-martial records from Meerut on 9 May 1857 document: Eighty-five troopers of the 3rd Light Cavalry refused the orders of Colonel Carmichael-Smyth to touch the cartridges, stating that doing so would cause irreparable loss of caste and ritual purity among their kinsmen.',
    sourceAttribution: 'Court Martial Proceedings of the 3rd Bengal Light Cavalry, May 1857; Fort William Military Consultations; National Archives of India.',
    evidenceNote: 'FACT: Grounded directly in official court-martial transcripts and cantonment dispatches. No invented dialogue.'
  },
  civilian: {
    id: 'civilian',
    title: 'CIVILIAN / VILLAGER',
    subtitle: 'Peasantry & Village Communities of the Gangetic Doab and Awadh',
    shortDesc: 'Disruption of village tenures, oppressive revenue demands, and taluqdari displacement.',
    historicalContext: 'Following the 1856 summary settlement in annexed Awadh, the East India Company bypassed local taluqdars, dramatically increasing land revenue assessments on cultivators. When civil administration collapsed in May 1857, village communities attacked colonial tahsil offices, burned revenue records, and ousted court-appointed moneylenders.',
    eyewitnessAccount: 'Colonial administrative surveys in Kanpur and Allahabad recorded that villagers systematically destroyed stamp papers, account ledgers, and court decrees that had facilitated the auction of ancestral village lands to urban bankers.',
    sourceAttribution: 'Selections from the Records of Government, North-Western Provinces; District Gazetteers of Awadh and Doab (1858–1870).',
    evidenceNote: 'SCHOLARLY RECONSTRUCTION: Reconstructed from district settlement reports, court destruction petitions, and agrarian tax records.'
  },
  political: {
    id: 'political',
    title: 'POLITICAL ACTOR / DISPOSSESSED RULER',
    subtitle: 'Sovereignty Assertions Against Annexation & Lapse',
    shortDesc: 'Begum Hazrat Mahal, Rani Lakshmibai, and Nana Saheb fighting for dynastic legitimacy.',
    historicalContext: 'Lord Dalhousie\'s aggressive application of the Doctrine of Lapse (annexing Satara, Sambalpur, Nagpur, and Jhansi) alongside the annexation of Awadh overturned centuries of customary adoption laws and aristocratic treaties, uniting disparate regional courts in armed rebellion.',
    eyewitnessAccount: 'In her formal counter-proclamation to Queen Victoria in 1858, Begum Hazrat Mahal declared: "In the proclamation it is written that all contracts and agreements entered into by the Company will be accepted by the Queen... Let the people consider how the Company treated the treaties with the kings of Awadh."',
    sourceAttribution: 'Begum Hazrat Mahal Counter-Proclamation (November 1858); Foreign Department Political Consultations; Despatches of the Governor-General.',
    evidenceNote: 'PRIMARY SOURCE: Direct historical proclamation issued and circulated in Awadh in response to the Royal Proclamation of 1858.'
  },
  observer: {
    id: 'observer',
    title: 'CHRONICLER / OBSERVER',
    subtitle: 'Eyewitness Accounts from Besieged Shahjahanabad',
    shortDesc: 'Mirza Ghalib\'s personal diary and letters amidst the 1857 siege of Delhi.',
    historicalContext: 'Mirza Asadullah Khan Ghalib resided in Gali Qasim Jan in the heart of old Delhi throughout the summer of 1857, witnessing the arrival of the Meerut sepoys, the bombardment of the city, and the subsequent retributive sacking by British and auxiliary troops.',
    eyewitnessAccount: 'In his Persian chronicle Dastanbuy, Ghalib wrote: "From the east there arrived soldiers of fiery temperament... Within the city gates, friends no longer know who to trust; the ink in my pen turns to tears when I describe the desolation of this capital where once lived kings and poets."',
    sourceAttribution: 'Mirza Asadullah Khan Ghalib, Dastanbuy (written 1857–1858, translated by K.A. Faruqi); Letters to Munshi Hargopal Tufta.',
    evidenceNote: 'PRIMARY SOURCE: Documented contemporary diary and letters written during the four-month siege of Delhi.'
  }
};
