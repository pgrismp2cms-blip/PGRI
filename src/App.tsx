import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SaktiSection } from './components/SaktiSection';
import { JenjangSection } from './components/JenjangSection';
import { KolaborasiSection } from './components/KolaborasiSection';
import { ProfilSection } from './components/ProfilSection';
import { GaleriSection } from './components/GaleriSection';
import { KontakSection } from './components/KontakSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { SearchModal } from './components/SearchModal';
import { ModuleDownloadModal } from './components/ModuleDownloadModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { StarArticleModal } from './components/StarArticleModal';
import { GalleryLightboxModal } from './components/GalleryLightboxModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import {
  SaktiContent,
  StarPractice,
  GalleryItem,
  HeroContent,
  RantingSchool,
  PengurusItem,
  KomunitasActivity,
  ContributorTeacher,
  ContactInfo,
  ContactMessage,
} from './types';
import {
  DEFAULT_HERO_DATA,
  DEFAULT_ORGANIZATION_DATA,
  DEFAULT_CONTACT_INFO,
  SAKTI_ARTICLES,
  STAR_PRACTICES,
  RANTING_LIST,
  PENGURUS_CABANG,
  KOMUNITAS_ACTIVITIES,
  TEACHER_CONTRIBUTORS,
  GALLERY_ITEMS,
  INITIAL_MESSAGES,
} from './data/mockData';

function getSaved<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');

  // Editable Dynamic State for all menus with localStorage persistence
  const [heroData, setHeroData] = useState<HeroContent>(() =>
    getSaved('pgri_hero_data', DEFAULT_HERO_DATA)
  );
  const [organizationData, setOrganizationData] = useState(() =>
    getSaved('pgri_org_data', DEFAULT_ORGANIZATION_DATA)
  );
  const [saktiArticles, setSaktiArticles] = useState<SaktiContent[]>(() =>
    getSaved('pgri_sakti_data', SAKTI_ARTICLES)
  );
  const [starPractices, setStarPractices] = useState<StarPractice[]>(() =>
    getSaved('pgri_star_data', STAR_PRACTICES)
  );
  const [rantingList, setRantingList] = useState<RantingSchool[]>(() =>
    getSaved('pgri_ranting_data', RANTING_LIST)
  );
  const [pengurusList, setPengurusList] = useState<PengurusItem[]>(() =>
    getSaved('pgri_pengurus_data', PENGURUS_CABANG)
  );
  const [komunitasActivities, setKomunitasActivities] = useState<KomunitasActivity[]>(() =>
    getSaved('pgri_komunitas_data', KOMUNITAS_ACTIVITIES)
  );
  const [contributorTeachers, setContributorTeachers] = useState<ContributorTeacher[]>(() =>
    getSaved('pgri_teachers_data', TEACHER_CONTRIBUTORS)
  );
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    getSaved('pgri_gallery_data', GALLERY_ITEMS)
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() =>
    getSaved('pgri_contact_data', DEFAULT_CONTACT_INFO)
  );
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    getSaved('pgri_messages_data', INITIAL_MESSAGES)
  );

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [moduleModalContent, setModuleModalContent] = useState<SaktiContent | null>(null);
  const [videoModalContent, setVideoModalContent] = useState<SaktiContent | null>(null);
  const [starModalPractice, setStarModalPractice] = useState<StarPractice | null>(null);
  const [galleryModalItem, setGalleryModalItem] = useState<GalleryItem | null>(null);

  // Persistence helpers
  const setHeroDataWithPersist = (data: HeroContent) => {
    setHeroData(data);
    localStorage.setItem('pgri_hero_data', JSON.stringify(data));
  };
  const setSaktiWithPersist = (articles: SaktiContent[]) => {
    setSaktiArticles(articles);
    localStorage.setItem('pgri_sakti_data', JSON.stringify(articles));
  };
  const setStarWithPersist = (practices: StarPractice[]) => {
    setStarPractices(practices);
    localStorage.setItem('pgri_star_data', JSON.stringify(practices));
  };
  const setRantingWithPersist = (schools: RantingSchool[]) => {
    setRantingList(schools);
    localStorage.setItem('pgri_ranting_data', JSON.stringify(schools));
  };
  const setPengurusWithPersist = (pengurus: PengurusItem[]) => {
    setPengurusList(pengurus);
    localStorage.setItem('pgri_pengurus_data', JSON.stringify(pengurus));
  };
  const setKomunitasWithPersist = (activities: KomunitasActivity[]) => {
    setKomunitasActivities(activities);
    localStorage.setItem('pgri_komunitas_data', JSON.stringify(activities));
  };
  const setContributorsWithPersist = (teachers: ContributorTeacher[]) => {
    setContributorTeachers(teachers);
    localStorage.setItem('pgri_teachers_data', JSON.stringify(teachers));
  };
  const setGalleryWithPersist = (items: GalleryItem[]) => {
    setGalleryItems(items);
    localStorage.setItem('pgri_gallery_data', JSON.stringify(items));
  };
  const setOrgWithPersist = (data: { sejarah: string; visi: string; misi: string[] }) => {
    setOrganizationData(data);
    localStorage.setItem('pgri_org_data', JSON.stringify(data));
  };
  const setContactWithPersist = (info: ContactInfo) => {
    setContactInfo(info);
    localStorage.setItem('pgri_contact_data', JSON.stringify(info));
  };
  const setMessagesWithPersist = (msgs: ContactMessage[]) => {
    setMessages(msgs);
    localStorage.setItem('pgri_messages_data', JSON.stringify(msgs));
  };
  const handleNewMessage = (msg: ContactMessage) => {
    const updated = [msg, ...messages];
    setMessages(updated);
    localStorage.setItem('pgri_messages_data', JSON.stringify(updated));
  };

  const handleResetAllData = () => {
    localStorage.removeItem('pgri_hero_data');
    localStorage.removeItem('pgri_org_data');
    localStorage.removeItem('pgri_sakti_data');
    localStorage.removeItem('pgri_star_data');
    localStorage.removeItem('pgri_ranting_data');
    localStorage.removeItem('pgri_pengurus_data');
    localStorage.removeItem('pgri_komunitas_data');
    localStorage.removeItem('pgri_teachers_data');
    localStorage.removeItem('pgri_gallery_data');
    localStorage.removeItem('pgri_contact_data');
    localStorage.removeItem('pgri_messages_data');

    setHeroData(DEFAULT_HERO_DATA);
    setOrganizationData(DEFAULT_ORGANIZATION_DATA);
    setSaktiArticles(SAKTI_ARTICLES);
    setStarPractices(STAR_PRACTICES);
    setRantingList(RANTING_LIST);
    setPengurusList(PENGURUS_CABANG);
    setKomunitasActivities(KOMUNITAS_ACTIVITIES);
    setContributorTeachers(TEACHER_CONTRIBUTORS);
    setGalleryItems(GALLERY_ITEMS);
    setContactInfo(DEFAULT_CONTACT_INFO);
    setMessages(INITIAL_MESSAGES);
  };

  // Global hotkeys: '/' for search, Alt+A for admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchModalOpen && !adminModalOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setSearchModalOpen(true);
        }
      }
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, adminModalOpen]);

  // Section Observer to update active navigation state as user scrolls
  useEffect(() => {
    const handleScrollObserver = () => {
      const sections = ['beranda', 'sakti', 'jenjang', 'kolaborasi', 'profil', 'galeri', 'kontak'];
      const scrollY = window.scrollY + 180;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const handleNavigate = (sectionId: string, subId?: string) => {
    setActiveSection(sectionId);
    if (subId) {
      setActiveSubcategory(subId);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Search callbacks
  const handleSelectSaktiFromSearch = (id: string) => {
    const article = saktiArticles.find((a) => a.id === id);
    if (article) {
      handleNavigate('sakti', article.category);
      setModuleModalContent(article);
    }
  };

  const handleSelectStarFromSearch = (id: string) => {
    const practice = starPractices.find((p) => p.id === id);
    if (practice) {
      handleNavigate('jenjang');
      setStarModalPractice(practice);
    }
  };

  const handleSelectRantingFromSearch = (id: string) => {
    handleNavigate('profil', 'peta');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-red-700 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminModalOpen(true)}
        headerLogo={heroData.headerLogo}
        headerLogoSecondary={heroData.headerLogoSecondary}
      />

      {/* Main Sections Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenQuickSakti={() => setModuleModalContent(saktiArticles[0])}
          heroData={heroData}
          onOpenAdmin={() => setAdminModalOpen(true)}
        />

        {/* 2. SAKTI Section (Pembelajaran Mendalam, PID, Koding KKA, Rumah Pendidikan, Unggulan Jenjang) */}
        <SaktiSection
          onOpenModule={(content) => setModuleModalContent(content)}
          onOpenVideo={(content) => setVideoModalContent(content)}
          activeSubcategory={activeSubcategory}
          onSelectPractice={(jenjang) => handleNavigate('jenjang')}
          articles={saktiArticles}
        />

        {/* 3. Keterwakilan & Kanal Jenjang (STAR Best Practices) */}
        <JenjangSection
          onSelectPractice={(practice) => setStarModalPractice(practice)}
          practices={starPractices}
        />

        {/* 4. Kolaborasi & Komunitas (Kombel, MGMP, KKG, DWP, Eksternal, Penulis Guru) */}
        <KolaborasiSection
          activities={komunitasActivities}
          contributors={contributorTeachers}
        />

        {/* 5. Profil (Sejarah, Visi-Misi, Pengurus, Ranting, Peta Interaktif, Form Pesan) */}
        <ProfilSection
          activeSubcategory={activeSubcategory}
          organizationData={organizationData}
          pengurusList={pengurusList}
          rantingList={rantingList}
          onNewMessage={handleNewMessage}
        />

        {/* 6. Galeri Dokumentasi */}
        <GaleriSection
          onSelectItem={(item) => setGalleryModalItem(item)}
          items={galleryItems}
        />

        {/* 7. Kontak & Sekretariat */}
        <KontakSection
          contactInfo={contactInfo}
          onNewMessage={handleNewMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        contactInfo={contactInfo}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Floating Action Buttons (WhatsApp Quick Chat & Back to Top) */}
      <FloatingActions />

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSakti={handleSelectSaktiFromSearch}
        onSelectStar={handleSelectStarFromSearch}
        onSelectRanting={handleSelectRantingFromSearch}
        saktiArticles={saktiArticles}
        starPractices={starPractices}
        rantingList={rantingList}
        contributorTeachers={contributorTeachers}
      />

      <ModuleDownloadModal
        isOpen={!!moduleModalContent}
        content={moduleModalContent}
        onClose={() => setModuleModalContent(null)}
      />

      <VideoPlayerModal
        isOpen={!!videoModalContent}
        content={videoModalContent}
        onClose={() => setVideoModalContent(null)}
      />

      <StarArticleModal
        isOpen={!!starModalPractice}
        practice={starModalPractice}
        onClose={() => setStarModalPractice(null)}
      />

      <GalleryLightboxModal
        isOpen={!!galleryModalItem}
        item={galleryModalItem}
        onClose={() => setGalleryModalItem(null)}
      />

      {/* Master Admin Panel Modal (Kelola Semua Menu) */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        heroData={heroData}
        onUpdateHero={setHeroDataWithPersist}
        saktiArticles={saktiArticles}
        onUpdateSakti={setSaktiWithPersist}
        starPractices={starPractices}
        onUpdateStar={setStarWithPersist}
        rantingList={rantingList}
        onUpdateRanting={setRantingWithPersist}
        pengurusList={pengurusList}
        onUpdatePengurus={setPengurusWithPersist}
        komunitasActivities={komunitasActivities}
        onUpdateKomunitas={setKomunitasWithPersist}
        contributorTeachers={contributorTeachers}
        onUpdateContributors={setContributorsWithPersist}
        galleryItems={galleryItems}
        onUpdateGallery={setGalleryWithPersist}
        organizationData={organizationData}
        onUpdateOrganization={setOrgWithPersist}
        contactInfo={contactInfo}
        onUpdateContactInfo={setContactWithPersist}
        messages={messages}
        onUpdateMessages={setMessagesWithPersist}
        onResetAllData={handleResetAllData}
      />
    </div>
  );
}
