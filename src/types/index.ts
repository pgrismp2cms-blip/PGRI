export type JenjangType = 'paud' | 'sd' | 'smp' | 'sma_smk_slb';

export type SchoolCategory = 'negeri' | 'swasta' | 'slb' | 'terpencil';

export interface SaktiContent {
  id: string;
  category: 'pembelajaran_mendalam' | 'rumah_pendidikan' | 'pid' | 'koding_kka';
  title: string;
  subtitle: string;
  description: string;
  author: {
    name: string;
    role: string;
    school: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  image: string;
  modulUrl: string;
  modulName: string;
  modulPages: number;
  videoUrl: string;
  videoDuration: string;
  keyPoints: string[];
  fullContent: string;
}

export interface StarPractice {
  id: string;
  title: string;
  jenjang: JenjangType;
  schoolName: string;
  schoolCategory: SchoolCategory;
  authorName: string;
  authorNip?: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  image: string;
  starDetails: {
    situasi: string;
    tantangan: string;
    aksi: string;
    refleksi: string;
  };
  impactStats: {
    metric: string;
    label: string;
  }[];
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export interface PengurusItem {
  id: string;
  name: string;
  role: string;
  division: string;
  school: string;
  image: string;
  contact?: string;
}

export interface RantingSchool {
  id: string;
  name: string;
  jenjang: 'PAUD' | 'SD' | 'SMP' | 'SMA/SMK' | 'SLB';
  address: string;
  npsn: string;
  kepalaSekolah: string;
  jumlahGuru: number;
  rantingCluster: string;
  latitude: number;
  longitude: number;
  innovations: string[];
  phone?: string;
  email?: string;
  website?: string;
  profileUrl?: string;
  description?: string;
}

export interface KomunitasActivity {
  id: string;
  type: 'MGMP' | 'KKG' | 'KOMBEL' | 'DWP' | 'KOLABORASI';
  title: string;
  organizer: string;
  partner?: string;
  date: string;
  location: string;
  description: string;
  attendeesCount: number;
  image: string;
  highlights: string[];
}

export interface ContributorTeacher {
  id: string;
  name: string;
  school: string;
  jenjang: string;
  specialty: string;
  articlesCount: number;
  avatar: string;
  quote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'kegiatan' | 'pembelajaran' | 'dwp' | 'upacara' | 'workshop';
  date: string;
  location: string;
  image: string;
  description: string;
}

export interface HeroContent {
  headline: string;
  tagline: string;
  description: string;
  statsGuru: string;
  statsSekolah: string;
  statsInklusif: string;
  statsPilar: string;
  headerLogo?: string;
  headerLogoSecondary?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  school?: string;
  topic?: string;
  message: string;
  timestamp: string;
  status: 'baru' | 'diproses' | 'selesai';
}

export interface ContactInfo {
  officeName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  operatingHoursWeekend: string;
  secretaryHead: string;
  secretaryHeadTitle: string;
  mapEmbedUrl?: string;
}

