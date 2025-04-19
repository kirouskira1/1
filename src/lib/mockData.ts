
export type PublicPost = {
  id: string;
  imageUrl: string;
  caption: string;
  artist: {
    name: string;
    region: string;
  };
  stats: {
    likeCount: number;
    commentCount: number;
  };
};

export const mockPosts: PublicPost[] = [
  {
    id: "p1",
    imageUrl: "https://source.unsplash.com/random/800x600/?ceramics",
    caption: "Edital Cerâmica Nordestina 2024 - Inscrições abertas!",
    artist: {
      name: "Mestre Vitalino",
      region: "PE"
    },
    stats: {
      likeCount: 142,
      commentCount: 23
    }
  },
  {
    id: "p2",
    imageUrl: "https://source.unsplash.com/random/800x600/?painting",
    caption: "Festival de Artes Visuais do Nordeste - Chamada para artistas",
    artist: {
      name: "Maria Bonita",
      region: "BA"
    },
    stats: {
      likeCount: 89,
      commentCount: 12
    }
  },
  {
    id: "p3",
    imageUrl: "https://source.unsplash.com/random/800x600/?theater",
    caption: "Residência Artística em Olinda - 3 meses com tudo pago",
    artist: {
      name: "Grupo Grial",
      region: "PE"
    },
    stats: {
      likeCount: 210,
      commentCount: 45
    }
  },
  {
    id: "p4",
    imageUrl: "https://source.unsplash.com/random/800x600/?music",
    caption: "Prêmio de Música Tradicional - Inscreva sua composição",
    artist: {
      name: "Luiz Gonzaga Jr",
      region: "CE"
    },
    stats: {
      likeCount: 178,
      commentCount: 32
    }
  },
  {
    id: "p5",
    imageUrl: "https://source.unsplash.com/random/800x600/?dance",
    caption: "Bolsa de Estudos para Dança Contemporânea - Foco em expressões culturais nordestinas",
    artist: {
      name: "Balé Popular do Recife",
      region: "PE"
    },
    stats: {
      likeCount: 95,
      commentCount: 17
    }
  }
];
