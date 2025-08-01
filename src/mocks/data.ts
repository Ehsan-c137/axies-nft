const CATEGORY = ["art", "music", "virtual_world", "sports", "utility"];
const CHAINS = ["ethereium", "polygon", "klaytn"];
const COLLECTION = ["abstraction", "patternlicious", "cartoonism"];

export const profileData = {
  name: "Ehsan M",
  userename: "ehsanmc",
  balance: "24.04 ETH",
  profileLink: "/profile/asf",
  walletLink: "/wallet",
  logoutLink: "/logout",
  image: "https://placehold.co/600x400/EEE/31343C",
};

export const allUsers = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  image: "https://placehold.co/600x400/EEE/31343C",
  backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
  username: `user${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  walletAddress: "0x1234567890abcdef",
}));

export const blogPosts = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  content: `This is the content of Blog Post ${i + 1}`,
  authorId: i + 1,
  authorName: `Author ${i + 1}`,
  authorImage: "https://placehold.co/60x60/EEE/31343C",
  createdAt: new Date(),
  updatedAt: new Date(),
  thumbnail: "https://placehold.co/600x400/EEE/31343C",
  slug: `blog-post-${i + 1}`,
  description: "This is the description of Blog Post",
}));

export const allProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  image: `https://placehold.co/600x400?text=product+${i + 1}`,
  slug: `product-${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  stock: Math.floor(Math.random() * 100) + 1,
  rating: (Math.random() * 5).toFixed(1),
  seen: Math.floor(Math.random() * 1000),
  likes: Math.floor(Math.random() * 500),
  currentBid: (Math.random() * 100).toFixed(2),
  description: `Detailed description for Product ${i + 1}. This product is known for its quality and durability.`,
  ownedBy: {
    id: Math.floor(Math.random() * 150) + 1,
    name: `User ${Math.floor(Math.random() * 150) + 1}`,
    image: "https://placehold.co/60x60/EEE/31343C",
    username: `user${Math.floor(Math.random() * 150) + 1}`,
  },
  createdBy: {
    id: Math.floor(Math.random() * 150) + 1,
    name: `User ${Math.floor(Math.random() * 150) + 1}`,
    image: "https://placehold.co/60x60/EEE/31343C",
    username: `user${Math.floor(Math.random() * 150) + 1}`,
  },
  countdown: Math.floor(new Date().getTime() / 1000 + 60 * 60 * 24 * 7),
  chain: CHAINS[Math.floor(Math.random() * CHAINS.length)],
  collection: COLLECTION[Math.floor(Math.random() * COLLECTION.length)],
  category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
  platform: "BSC",
  isFavorite: false,
}));
