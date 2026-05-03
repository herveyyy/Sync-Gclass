import { BlogPost } from "@/lib/entities/blog.types";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    header: {
      title: "Getting Started with Our Learning Platform",
    },
    blocks: [
      {
        id: "b1",
        text: "Welcome! This platform allows students to explore blog posts, share ideas, and collaborate. Stay tuned for more updates and features.",
        images: [],
      }
    ],
    created_at: "2026-04-20T08:30:00Z",
    author: {
      id: "u1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "2",
    header: {
      title: "Study Tips for Better Focus",
    },
    blocks: [
      {
        id: "b1",
        text: "Here are some powerful study techniques you can apply immediately to improve focus.",
        images: [
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        ],
      }
    ],
    created_at: "2026-04-21T10:15:00Z",
    author: {
      id: "u2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    id: "3",
    header: {
      title: "Why Group Study Works",
    },
    blocks: [
      {
        id: "b1",
        text: "Group study sessions help reinforce knowledge, allow discussion, and improve understanding through collaboration.",
        images: [],
      }
    ],
    created_at: "2026-04-22T13:45:00Z",
    author: {
      id: "u3",
      name: "Michael Lee",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: "4",
    header: {
      title: "Top Productivity Tools",
    },
    blocks: [
      {
        id: "b1",
        text: "These tools help students stay organized and efficient.",
        images: ["https://images.unsplash.com/photo-1553877522-43269d4ea984"],
      }
    ],
    created_at: "2026-04-23T09:20:00Z",
    author: {
      id: "u1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "5",
    header: {
      title: "How to Prepare for Exams",
    },
    blocks: [
      {
        id: "b1",
        text: "Start early, create a schedule, practice past exams, and ensure proper rest before exams.",
        images: [],
      }
    ],
    created_at: "2026-04-24T16:00:00Z",
    author: {
      id: "u4",
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    id: "6",
    header: {
      title: "Balancing School and Life",
    },
    blocks: [
      {
        id: "b1",
        text: "Time management is key to balancing studies, hobbies, and rest effectively.",
        images: [],
      }
    ],
    created_at: "2026-04-25T11:10:00Z",
    author: {
      id: "u5",
      name: "Chris Brown",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
];
