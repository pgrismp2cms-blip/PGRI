import {
  HeroContent,
  SaktiContent,
  StarPractice,
  RantingSchool,
  PengurusItem,
  KomunitasActivity,
  ContributorTeacher,
  GalleryItem,
  ContactInfo,
  ContactMessage,
} from '../types';

export interface SharedAppData {
  heroData?: HeroContent;
  organizationData?: { sejarah: string; visi: string; misi: string[] };
  saktiArticles?: SaktiContent[];
  starPractices?: StarPractice[];
  rantingList?: RantingSchool[];
  pengurusList?: PengurusItem[];
  komunitasActivities?: KomunitasActivity[];
  contributorTeachers?: ContributorTeacher[];
  galleryItems?: GalleryItem[];
  contactInfo?: ContactInfo;
  messages?: ContactMessage[];
}

/**
 * Fetch latest shared content from server's persistent disk so all devices remain up to date.
 */
export async function fetchSharedContent(): Promise<SharedAppData | null> {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('[ContentSync] Failed to fetch shared content from server:', err);
  }
  return null;
}

/**
 * Save updated content to server disk so that all devices (desktop, tablet, mobile) see the changes immediately.
 */
export async function saveSharedContent(updates: Partial<SharedAppData>): Promise<boolean> {
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.warn('[ContentSync] Failed to save shared content to server:', err);
  }
  return false;
}

/**
 * Reset server content back to initial defaults
 */
export async function resetSharedContent(): Promise<boolean> {
  try {
    const res = await fetch('/api/content/reset', { method: 'POST' });
    return res.ok;
  } catch (err) {
    console.warn('[ContentSync] Failed to reset server content:', err);
    return false;
  }
}
