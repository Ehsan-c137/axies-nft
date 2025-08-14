const CATEGORY = ["art", "music", "virtual_world", "sports", "utility"];
const CHAINS = ["ethereum", "polygon", "klaytn"];
const COLLECTION = ["abstraction", "patternlicious", "cartoonism"];

const MOCK_DATE = new Date("2025-08-01T12:00:00Z");

export const profileData = {
  id: 1,
  name: "Mock User",
  username: "ehsanmc",
  image: "https://placehold.co/600x400/EEE/4e3fee",
  backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
  createdAt: MOCK_DATE,
  updatedAt: MOCK_DATE,
  walletAddress: "0x1234567890abcdef",
  balance: "24.04 ETH",
  posts: Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
    title: `Post ${i + 1}`,
    content: `This is the content of Post ${i + 1}`,
  })),
  email: "test@example.com",
};

export const MOCK_USER = {
  id: "mock-user-id-123",
  email: "test@example.com",
  name: "Mock User",
  role: "admin",
  balance: "24.04 ETH",
  username: "mock-user",
};

export const userDetail = {
  id: "mock-user-id-123",
  email: "test@example.com",
  name: "Mock User",
  role: "admin",
  balance: "24.04 ETH",
  username: "mock-user",
  image: "https://placehold.co/600x400/EEE/4e3fee",
  backgroundImage: "https://placehold.co/1920x1080/EEE/4e3fee",
  createdAt: MOCK_DATE,
  updatedAt: MOCK_DATE,
  walletAddress: "0x1234567890abcdef",
  posts: Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
    title: `Post ${i + 1}`,
    content: `This is the content of Post ${i + 1}`,
  })),
};

// Payload example: { "userId": "mock-user-id-123", "email": "test@example.com", "exp": <future_timestamp> }
export const MOCK_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtb2NrLXVzZXItaWQtMTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6Ik1vY2sgVXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.Somesecr3tM0ckS1gnatur3";

export const allUsers = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    image: "https://placehold.co/600x400/4e3fee/EEE",
    backgroundImage: "https://placehold.co/1920x1080/4e3fee/EEE",
    username: `user${i + 1}`,
    createdAt: MOCK_DATE,
    updatedAt: MOCK_DATE,
    walletAddress: "0x1234567890abcdef",
    balance: "24.04 ETH",
    posts: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
      title: `Post ${i + 1}`,
      content: `This is the content of Post ${i + 1}`,
    })),
  })),
  profileData,
];

export const blogPosts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  content: `This is the content of Blog Post ${i + 1}`,
  authorId: i + 1,
  authorName: `Author ${i + 1}`,
  authorImage: "https://placehold.co/60x60/4e3fee/EEE",
  createdAt: MOCK_DATE,
  updatedAt: MOCK_DATE,
  thumbnail: "https://placehold.co/600x400/4e3fee/EEE",
  slug: `blog-post-${i + 1}`,
  description: "This is the description of Blog Post",
}));

export const allProducts = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  image: `https://placehold.co/600x400/4e3fee/EEE?text=product+${i + 1}`,
  slug: `product-${i + 1}`,
  createdAt: MOCK_DATE,
  updatedAt: MOCK_DATE,
  stock: Math.floor(Math.random() * 100) + 1,
  rating: (Math.random() * 5).toFixed(1),
  seen: Math.floor(Math.random() * 1000),
  likes: Math.floor(Math.random() * 500),
  currentBid: (Math.random() * 100).toFixed(2),
  description: `Detailed description for Product ${i + 1}. This product is known for its quality and durability.`,
  ownedBy: {
    id: Math.floor(Math.random() * 150) + 1,
    name: `User ${Math.floor(Math.random() * 150) + 1}`,
    image: "https://placehold.co/60x60/4e3fee/EEE",
    username: `user${Math.floor(Math.random() * 150) + 1}`,
  },
  createdBy: {
    id: Math.floor(Math.random() * 150) + 1,
    name: `User ${Math.floor(Math.random() * 150) + 1}`,
    image: "https://placehold.co/60x60/4e3fee/EEE",
    username: `user${Math.floor(Math.random() * 150) + 1}`,
  },
  countdown: Math.floor(MOCK_DATE.getTime() / 1000 + 60 * 60 * 24 * 7),
  chain: CHAINS[Math.floor(Math.random() * CHAINS.length)],
  collection: COLLECTION[Math.floor(Math.random() * COLLECTION.length)],
  category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
  platform: "BSC",
  isFavorite: false,
}));
