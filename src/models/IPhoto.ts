export interface IPhoto {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    regular: string;
    small: string;
  };
  likes: number;
  user: {
    username: string;
    name: string;
  };
  tags: {
    type: string;
    title: string;
  }[];
}
