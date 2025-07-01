import type { Timestamp } from "firebase/firestore";
import type { EditorBlock } from './EditorBlock';

export interface Blog {
  id: string;
  title: string;
  author: string;
  content?: string; // optional, for legacy support
  blocks?: EditorBlock[]; // new rich content structure
  createdAt: Timestamp;
  tags: string[];
  thumbnailUrl?: string;
}
