import { mockPosts as originalMockPosts } from './mockData';

// Extended type with avatarUrl
export interface ExtendedArtist {
  name: string;
  region: string;
  avatarUrl: string;
}

// Extended post type
export interface PublicPost {
  id: string;
  imageUrl: string;
  caption: string;
  artist: ExtendedArtist;
  stats: {
    likeCount: number;
    commentCount: number;
  };
}

// Removidos array de imagens de capa e descrições de editais

export const mockPosts: PublicPost[] = originalMockPosts.map((post) => ({
  id: post.id,
  imageUrl: post.imageUrl, // Usa imagem original
  caption: post.caption,   // Usa legenda original
  artist: {
    name: post.artist.name,
    region: post.artist.region,
    avatarUrl: "/images/artista-avatar.jpg" // Avatar padrão
  },
  stats: post.stats
}));

// Add the contact avatar for the footer
export const contactAvatar = "/images/artista-avatar.jpg";
