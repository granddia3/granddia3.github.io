export interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
}

export const games: Game[] = [
  {
    id: 'game-1',
    title: 'tribals',
    description: '',
    url: 'https://script.google.com/macros/s/AKfycbyQAmL7_9B9SGFKb9xwOh661dzn-kzNjuLwyDPSg0hY6WD79s2lwAny9uHhvRGRDqLq/exec',
    thumbnail: 'https://picsum.photos/seed/arcade/600/400',
    category: 'Action'
  },
  {
    id: 'game-2',
    title: 'Logic Master',
    description: 'Challenge your mind with this intricate puzzle collection.',
    url: 'https://script.google.com/macros/s/AKfycbybZkVPGyvHUOZbwrJSn5fRQIFcGpoIEhp0r-yq2GWRtE_1G7YzP4t8kPZRfp6tutUN/exec',
    thumbnail: 'https://picsum.photos/seed/logic/600/400',
    category: 'Puzzle'
  },
  {
    id: 'game-3',
    title: 'Strategy Hub',
    description: 'Master the field with tactical precision and foresight.',
    url: 'https://script.google.com/macros/s/AKfycbz5GtoRAR-e_NYMEGdV33FLU03F3DlGqW34qEkkEzGC5D8e7rvDjJs4S11jaH5_J_z7/exec',
    thumbnail: 'https://picsum.photos/seed/strategy/600/400',
    category: 'Strategy'
  },
  {
    id: 'game-4',
    title: 'Adventure Zone',
    description: 'Explore vast landscapes and uncover hidden secrets in this journey.',
    url: 'https://script.google.com/macros/s/AKfycbwAsvXTh7XurBCTIbcTw-5reuXukTR533fvSlll-toib_7SG_JYklsitXLgSu9mLIolbA/exec',
    thumbnail: 'https://picsum.photos/seed/adventure/600/400',
    category: 'Adventure'
  }
];
