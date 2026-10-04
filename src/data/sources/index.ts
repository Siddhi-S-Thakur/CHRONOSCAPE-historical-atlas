import { HistoriographicalSource } from '../../types';

export const SOURCES: HistoriographicalSource[] = [
  {
    id: 'ashoka_mre_13',
    title: 'Ashokan Major Rock Edict XIII (Girnar, Kalsi, Shahbazgarhi)',
    type: 'FACT',
    typeBadge: 'FACT: IN SITU EPIGRAPHY',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    era: 'c. 257–256 BCE (Mauryan)',
    description: 'Brahmi and Kharosthi inscriptional corpus incised on rock faces across South Asia detailing the Kalinga conquest casualties, remorse, and envoy despatches to Hellenistic rulers (Antiochus II Theos, Ptolemy II Philadelphus, Antigonus Gonatas, Magas of Cyrene, Alexander II of Epirus).',
    citation: 'E. Hultzsch, Corpus Inscriptionum Indicarum, Vol. I: Inscriptions of Asoka (1925).'
  },
  {
    id: 'arthashastra',
    title: 'Kautilya\'s Arthaśāstra (Composite Sastraic Text)',
    type: 'SCHOLARLY INTERPRETATION',
    typeBadge: 'SCHOLARLY INTERPRETATION',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-700',
    era: 'c. 4th c. BCE – 2nd c. CE',
    description: 'While traditionally attributed to Chandragupta Maurya\'s chief minister Chanakya, rigorous linguistic and stylistic textual stratification demonstrates multiple redaction layers between the late Mauryan era and the early centuries of the Common Era.',
    citation: 'R.P. Kangle, The Kautiliya Arthasastra, 3 Parts, University of Bombay (1965–1972); Thomas R. Trautmann, Kautilya and the Arthashastra (1971).'
  },
  {
    id: 'mauryan_southern_frontier',
    title: 'Mauryan Southern Frontier & Hegemonic Extent',
    type: 'CONTESTED',
    typeBadge: 'CONTESTED / UNCERTAIN BOUNDARY',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
    era: '3rd Century BCE',
    description: 'Ashokan minor rock edicts in Maski, Brahmagiri, and Nittur mark imperial gold-mining outposts in Karnataka. However, whether the intervening regions constituted direct bureaucratic administration or loose tributary suzerainty remains a matter of active scholarly debate.',
    citation: 'Romila Thapar, The Maurya Empire Revisited (1987); Gérard Fussman, "Central and Provincial Administration in Ancient India," The Indian Historical Review (1987–88).'
  },
  {
    id: 'dastanbuy_ghalib',
    title: 'Dastanbuy & Collected Letters of Mirza Asadullah Khan Ghalib',
    type: 'PRIMARY SOURCE',
    typeBadge: 'PRIMARY SOURCE (CONTEMPORARY)',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
    era: '1857–1858 CE (Delhi Siege)',
    description: 'Contemporary Persian diary and vernacular Urdu letters written from within the walled city of Delhi during the 1857 uprising. Provides intimate, verified documentation of civilian living conditions, military bombardments, food scarcity, and retributive executions.',
    citation: 'Mirza Asadullah Khan Ghalib, Dastanbuy: A Diary of the Indian Revolt of 1857, translated by K.A. Faruqi (1970); Ralph Russell and Khurshidul Islam, Ghalib: Life and Letters (1969).'
  },
  {
    id: 'sabhasad_bakhar',
    title: 'Sabhasad Bakhar (Krishnaji Anant Sabhasad)',
    type: 'PRIMARY SOURCE',
    typeBadge: 'PRIMARY SOURCE (CONTEMPORARY CHRONICLE)',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
    era: '1697 CE (Maratha Court)',
    description: 'The earliest surviving biography of Chhatrapati Shivaji Maharaj, composed at Jinji under the patronage of Chhatrapati Rajaram. Records Shivaji\'s administrative principles, navy creation, fort construction regulations, and the 1674 coronation ceremony.',
    citation: 'Krishnaji Anant Sabhasad, Shiva Chhatrapati Chen Charitra (Sabhasad Bakhar), edited by K.N. Sane (1912).'
  },
  {
    id: 'brihadisvara_epigraphy',
    title: 'Brihadisvara Temple Wall Epigraphs (Thanjavur)',
    type: 'FACT',
    typeBadge: 'FACT: PRIMARY STONE EPIGRAPHY',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    era: '1010–1014 CE (Chola)',
    description: 'Extensive Tamil inscriptions incised around the granite base of the vimana recording royal gifts, gold ornaments, bronze icons, names and salaries of 400 temple dancers (taliccheri pendugal), musicians, accountants, and revenue endowments from hundreds of villages in Tamil country and Sri Lanka.',
    citation: 'South Indian Inscriptions (SII), Vol. II, Archaeological Survey of India.'
  },
  {
    id: 'indus_political_structure',
    title: 'Political Organisation of the Mature Harappan Civilisation',
    type: 'UNCERTAIN',
    typeBadge: 'UNCERTAIN / HYPOTHESIS',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-700',
    era: 'c. 2600–1900 BCE',
    description: 'Given the absence of deciphered inscriptions, royal palaces, or prominent military monuments, whether the Indus civilisation was organized as a unified empire, city-state confederacy, or merchant oligarchy remains uncertain.',
    citation: 'Jonathan Mark Kenoyer, Ancient Cities of the Indus Valley Civilization (1998); Shereen Ratnagar, Understanding Harappa (2001). TODO: VERIFY'
  }
];
