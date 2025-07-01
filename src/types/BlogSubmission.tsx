import type { Timestamp } from "firebase/firestore";
import type { EditorBlock } from "./EditorBlock";

export interface BlogSubmission {
title: string;
  tags: string[];
  coverImage: string;
  author: string;
  createdAt: Timestamp;
  blocks: EditorBlock[];
}
