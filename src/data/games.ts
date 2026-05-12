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
    title: 'Rocket goal',
    description: '',
    url: 'https://script.google.com/macros/s/AKfycbybZkVPGyvHUOZbwrJSn5fRQIFcGpoIEhp0r-yq2GWRtE_1G7YzP4t8kPZRfp6tutUN/exec',
    thumbnail: 'https://play-lh.googleusercontent.com/VFwCWELna7i6okl299W0e1H-0moEvVfT9N2M9moaikhCTcEDjUg3hE1mkSlm3ZezfLPi4ppMcStIhjWUustesg=w526-h296-rw',
    category: 'Puzzle'
  },
  {
    id: 'game-2',
    title: 'Assault Bots(NOT WORKING ON CHROMEBOOKS)',
    description: '',
    url: 'https://script.google.com/macros/s/AKfycbz5GtoRAR-e_NYMEGdV33FLU03F3DlGqW34qEkkEzGC5D8e7rvDjJs4S11jaH5_J_z7/exec',
    thumbnail: 'https://img.craiyon.com/2026-05-11/p4enqAwJQAOoXs4TOVu_Iw.webp',
    category: 'Strategy'
  },
  {
    id: 'game-3',
    title: 'Bloxd(NOT WORKING ON CHROMEBOOKS)',
    description: '',
    url: 'https://script.google.com/macros/s/AKfycbwAsvXTh7XurBCTIbcTw-5reuXukTR533fvSlll-toib_7SG_JYklsitXLgSu9mLIolbA/exec',
    thumbnail: 'https://img.craiyon.com/2026-05-11/p4enqAwJQAOoXs4TOVu_Iw.webp',
    category: 'Adventure'
  },
  {
    id: 'game-4',
    title: 'Tag',
    description: '',
    url: 'https://mc0825.github.io/g69/class-633/',
    thumbnail: 'https://taggame.io/data/image/options/tag-game-banner-tgio.png',
    category: 'Multiplayer'
  },
  {
    id: 'game-5',
    title: 'Getaway Shootout',
    description: '',
    url: 'https://mc0825.github.io/g9/class-479/',
    thumbnail: 'https://getawayshootoutonline.github.io/images/getaway-shootout.png',
    category: 'Multiplayer'
  },
  {
    id: 'game-6',
    title: 'Animals Volleyball',
    description: '',
    url: 'https://mc0825.github.io/g66/class-847/',
    thumbnail: 'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/966cec3b19cedf7dd72f93419f13268c/animals-volleyball-logo.png',
    category: 'Sports'
  },
  {
    id: 'game-7',
    title: 'Wrassling',
    description: '',
    url: 'https://mc0825.github.io/g69/class-651',
    thumbnail: 'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/f1b3c828-7af9-4e13-9f5c-b2e88f335bdf/wrassling.png',
    category: 'Multiplayer'
  },
  {
    id: 'game-8',
    title: 'Soccer Random',
    description: '',
    url: 'https://mc0825.github.io/g26/class-511',
    thumbnail: 'https://play-lh.googleusercontent.com/G1PIlb6HWKSaDre0XpUcmKGps9T4iamsSlwrogB3EJzYv4bz0M2am4D17MtGzndaOOU=w240-h480-rw',
    category: 'Fast Paced'  
  },
  {
    id: 'game-9',
    title: 'Bitlife',
    description: 'Might not work',
    url: 'https://ubg365.github.io/bitlife-life-simulator/play.html',
    thumbnail: 'https://i.ytimg.com/vi/WUTrv--kZtI/maxresdefault.jpg',
    category: 'kids'  
 },
  }
];
