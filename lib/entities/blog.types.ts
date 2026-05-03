export type BlogBlock = {
  id: string;
  title?: string;
  text: string;
  images: string[];
};

export type BlogPost = {
  id: string;
  header: {
    title: string;
    image?: string;
    text?: string;
  };
  blocks: BlogBlock[];
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
};
