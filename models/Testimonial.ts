import { Image } from "./Image";

export interface Testimonial {
  id: string;
  comment: string;
  author: string;
  title: string;
  photo: Array<Image>;
  published_at: Date;
}
