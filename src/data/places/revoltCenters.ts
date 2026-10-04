import { RevoltCenter } from '../../types';

export const REVOLT_CENTERS: Record<string, RevoltCenter> = {
  barrackpore: {
    id: 'barrackpore',
    name: 'Barrackpore',
    leader: 'Mangal Pandey (34th Bengal Native Infantry)',
    date: '29 March 1857',
    coordinates: [750, 370],
    description: 'The prelude to the widespread uprising. Sepoy Mangal Pandey openly rebelled on the parade ground of the 34th Bengal Native Infantry, refusing to load cartridges believed to be greased with cow and pig fat, and struck British officers before being executed.',
    evidenceLevel: 'PRIMARY SOURCE',
    primaryNotes: 'Court Martial Proceedings of Mangal Pandey; Fort William General Orders; National Archives of India.'
  },
  meerut: {
    id: 'meerut',
    name: 'Meerut',
    leader: 'Sepoys of the 3rd Light Cavalry & 11th/20th BNI',
    date: '10 May 1857',
    coordinates: [430, 275],
    description: 'The explosive catalyst of open rebellion. Following the court-martial and public degradation of 85 cavalrymen who refused Enfield cartridges, Indian troops mutinied, broke open the cantonment jail, liberated their comrades, and made a night march toward Delhi.',
    evidenceLevel: 'FACT',
    primaryNotes: 'Telegrams of Major-General Hewitt; Meerut Divisional Despatches; Innes\' Sepoy Revolt.'
  },
  delhi: {
    id: 'delhi',
    name: 'Delhi (Shahjahanabad)',
    leader: 'Bahadur Shah Zafar • General Bakht Khan',
    date: 'May – September 1857',
    coordinates: [420, 295],
    description: 'The symbolic and political core of the revolt. The rebellious regiments marched from Meerut across the Yamuna bridge of boats into the Red Fort, proclaiming the aged Mughal poet-emperor Bahadur Shah Zafar as Shahenshah-e-Hind. A fierce four-month siege culminated in the British assault on Kashmiri Gate in September 1857.',
    evidenceLevel: 'PRIMARY SOURCE',
    primaryNotes: 'Mutiny Papers at National Archives of India; Court-martial trial records of Bahadur Shah II; Mirza Ghalib\'s Dastanbuy.'
  },
  lucknow: {
    id: 'lucknow',
    name: 'Lucknow / Awadh',
    leader: 'Begum Hazrat Mahal • Maulvi Ahmadullah Shah',
    date: 'June 1857 – March 1858',
    coordinates: [530, 305],
    description: 'The most widespread agrarian and aristocratic insurrection. Fuelled by deep resentment over Lord Dalhousie\'s 1856 annexation of Awadh under the pretext of misgovernance. Begum Hazrat Mahal rallied taluqdars, peasants, and sepoys, crowning her minor son Birjis Qadr, and besieged the British Residency for months.',
    evidenceLevel: 'FACT',
    primaryNotes: 'Awadh Taluqdari petitions; General Outram and Havelock military despatches; Begum Hazrat Mahal proclamations.'
  },
  kanpur: {
    id: 'kanpur',
    name: 'Kanpur (Cawnpore)',
    leader: 'Nana Saheb (Dhondu Pant) • Tantia Tope • Azimullah Khan',
    date: 'June – December 1857',
    coordinates: [510, 335],
    description: 'Centred on Nana Saheb, the adopted son of deposed Peshwa Baji Rao II whose pension was denied by Dalhousie\'s Doctrine of Lapse. Major confrontations took place at General Wheeler\'s entrenchment, the Sati Chaura Ghat, and Bibighar, followed by fierce counter-offensives led by Tantia Tope.',
    evidenceLevel: 'FACT',
    primaryNotes: 'Kanpur Collectorate Records; Deposition of Azimullah Khan\'s emissaries; British Parliamentary Inquiry.'
  },
  jhansi: {
    id: 'jhansi',
    name: 'Jhansi / Central India',
    leader: 'Rani Lakshmibai • Tantia Tope',
    date: 'June 1857 – April 1858',
    coordinates: [460, 365],
    description: 'Defiance against the annexation of Jhansi under the Doctrine of Lapse following the death of Gangadhar Rao. Rani Lakshmibai fortified Jhansi Fort, valiantly resisted Sir Hugh Rose\'s forces in a legendary siege, escaped on horseback, and joined forces with Tantia Tope to capture Gwalior Fort before falling in battle at Kotah-ki-Serai.',
    evidenceLevel: 'PRIMARY SOURCE',
    primaryNotes: 'Despatches of Major-General Sir Hugh Rose; Rani Lakshmibai\'s letters to British Political Agents; Central India Field Force Diaries.'
  },
  jagdishpur: {
    id: 'jagdishpur',
    name: 'Jagdishpur / Bihar (Arrah)',
    leader: 'Kunwar Singh (Ujjainiya Rajput Zamindar)',
    date: 'July 1857 – April 1858',
    coordinates: [630, 320],
    description: 'An 80-year-old feudal chieftain led a formidable guerrilla campaign across Shahabad, Bhojpur, and Eastern UP. Dispossessed by the East India Company\'s revenue board, Kunwar Singh utilized exceptional mobility and regional popular support to defeat Captain Le Grand\'s force before dying of battle wounds.',
    evidenceLevel: 'FACT',
    primaryNotes: 'Patna Division Official Narrative; William Tayler\'s Correspondence; Arrah House siege reports.'
  }
};
