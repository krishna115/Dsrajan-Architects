export type EditorBlock =
  | { type: 'heading'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'quote'; content: string }
  | { type: 'list'; items: string[] };
