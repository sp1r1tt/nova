export type CreatorCategory = 'LIFESTYLE' | 'TECH' | 'FASHION' | 'SPORT';

export interface CreatorPost {
  id: string;
  caption: string;
  likesFormatted: string;
  commentsCount: number;
  date: string;
  location?: string;
  imageUrl?: string;
}

export interface CollabFormat {
  id: string;
  title: string;
  format: string;
  priceUah: number;
  priceFormatted: string; // e.g. "65 000 ₴"
  estReach: string;
  delivery: string;
  description: string;
}

export interface StorySlide {
  id: string;
  image: string;
  location: string;
  caption: string;
  tag: string;
}

export interface Creator {
  id: string;
  index: string; // "01", "02", "03", "04"
  name: string;
  handle: string;
  gender: 'male' | 'female';
  category: CreatorCategory;
  categoryLabelRu: string;
  categoryTag: string; // "ЛАЙФСТАЙЛ / ПУТЕШЕСТВИЯ", etc.
  taglineRu: string;
  quote: string;
  bioRu: string;
  mainPortraitUrl: string;
  galleryImages: string[];
  age: string;
  appearance: string;
  visualMood: string;
  clothing: string;
  followers: string;
  postsCount: number;
  er: string;
  avgReach: string;
  audienceDemographics: string;
  telegramHandle: string;
  telegramChannelName: string;
  stories: StorySlide[];
  posts: CreatorPost[];
  collabs: CollabFormat[];
  dialogue: {
    welcome: string;
    questions: { q: string; a: string }[];
  };
}
