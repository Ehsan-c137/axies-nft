import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export const BLOG_QUERY = {
  allBlogs: () => ["blog-posts"],
  blogDetail: (id: number) => ({
    queryKey: [...BLOG_QUERY.allBlogs(), id],
    queryFn: () => getBlogDetail(id),
    staleTime: 5 * 1000,
  }),
};

export async function getBlogPosts(page: number = 1, limit: number = 8) {
  try {
    const response = await fetch(
      `${BASE_URL}/blog?page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      console.log("something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

async function getBlogDetail(id: number) {
  const response = fetch(`${BASE_URL}/blog/${id}`);
  return (await response).json();
}

export function useBlogPosts(page = 1, ...args: any) {
  return useQuery({
    queryKey: [...BLOG_QUERY.allBlogs(), page],
    queryFn: () => getBlogPosts(page),
    placeholderData: (previousData) => previousData,
    ...args,
  });
}

export function useBlogDetail(id: number, ...args: any) {
  return useQuery(BLOG_QUERY.blogDetail(id));
}

const blogPosts = {
  data: [
    {
      id: 1,
      title: "The Ultimate Guide to Axie Infinity",
      author: "John Doe",
      date: "2023-10-27",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "ultimate-guide-axie-infinity",
    },
    {
      id: 2,
      title: "Top 5 Axies for Beginners",
      author: "Jane Smith",
      date: "2023-10-25",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "top-5-axies-for-beginners",
    },
    {
      id: 3,
      title: "Understanding Axie Genetics",
      author: "Peter Jones",
      date: "2023-10-22",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "understanding-axie-genetics",
    },
    {
      id: 4,
      title: "Advanced PVP Strategies in Axie Infinity",
      author: "John Doe",
      date: "2023-10-20",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "advanced-pvp-strategies",
    },
    {
      id: 5,
      title: "Axie Infinity Economics: A Deep Dive",
      author: "Jane Smith",
      date: "2023-10-18",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "axie-infinity-economics",
    },
    {
      id: 6,
      title: "The Future of Play-to-Earn Gaming",
      author: "Peter Jones",
      date: "2023-10-15",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "future-of-play-to-earn",
    },
    {
      id: 7,
      title: "Breeding Guide: Creating Powerful Axies",
      author: "John Doe",
      date: "2023-10-12",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "breeding-guide-powerful-axies",
    },
    {
      id: 8,
      title: "Maximizing Your SLP Earnings",
      author: "Jane Smith",
      date: "2023-10-10",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "maximizing-slp-earnings",
    },
    {
      id: 9,
      title: "Axie Infinity Land Gameplay: What to Expect",
      author: "Peter Jones",
      date: "2023-10-08",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "axie-land-gameplay-expectations",
    },
    {
      id: 10,
      title: "The Role of Ronin Wallet in Axie Infinity",
      author: "John Doe",
      date: "2023-10-05",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "ronin-wallet-role",
    },
    {
      id: 11,
      title: "Community Spotlight: Top Axie Players",
      author: "Jane Smith",
      date: "2023-10-02",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "community-spotlight-top-players",
    },
    {
      id: 12,
      title: "Understanding Axie Classes and Abilities",
      author: "Peter Jones",
      date: "2023-09-30",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "understanding-axie-classes",
    },
    {
      id: 13,
      title: "Is Axie Infinity Still a Good Investment?",
      author: "John Doe",
      date: "2023-09-28",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "axie-infinity-good-investment",
    },
    {
      id: 14,
      title: "A Look at Axie Infinity: Origin",
      author: "Jane Smith",
      date: "2023-09-25",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "look-at-axie-origin",
    },
    {
      id: 15,
      title: "How to Secure Your Axie Assets",
      author: "Peter Jones",
      date: "2023-09-22",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "secure-axie-assets",
    },
    {
      id: 16,
      title: "The Philosophy Behind Play-to-Earn",
      author: "John Doe",
      date: "2023-09-20",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "philosophy-play-to-earn",
    },
    {
      id: 17,
      title: "Building a Balanced Axie Team",
      author: "Jane Smith",
      date: "2023-09-18",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "building-balanced-axie-team",
    },
    {
      id: 18,
      title: "Navigating the Axie Infinity Marketplace",
      author: "Peter Jones",
      date: "2023-09-15",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "navigating-axie-marketplace",
    },
    {
      id: 19,
      title: "The Impact of Lunacia's Lore on the Game",
      author: "John Doe",
      date: "2023-09-12",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "lunacia-lore-impact",
    },
    {
      id: 20,
      title: "Preparing for Axie Infinity Tournaments",
      author: "Jane Smith",
      date: "2023-09-10",
      image: "https://placehold.co/600x400/EEE/31343C",
      slug: "preparing-for-tournaments",
    },
  ],
  meta: {
    total: 4,
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    prev: null,
    next: null,
  },
};
