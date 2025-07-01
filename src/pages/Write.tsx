import { useState } from 'react';
import type { EditorBlock } from '../types/EditorBlock';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Blog } from '../types/Blog';

export default function Write() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBlock = (type: EditorBlock['type']) => {
    const newBlock: EditorBlock =
      type === 'list'
        ? { type: 'list', items: [''] }
        : type === 'image'
        ? { type: 'image', url: '', caption: '' }
        : { type, content: '' };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updated: EditorBlock) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updated;
    setBlocks(newBlocks);
  };

  const renderBlockInput = (block: EditorBlock, index: number) => {
    switch (block.type) {
      case 'heading':
      case 'subheading':
      case 'paragraph':
      case 'quote':
        return (
          <textarea
            key={index}
            className="w-full p-2 border rounded mb-4"
            rows={block.type === 'paragraph' ? 4 : 2}
            placeholder={block.type}
            value={block.content}
            onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
          />
        );
      case 'list':
        return (
          <div key={index} className="space-y-2 mb-4">
            {block.items.map((item, i) => (
              <input
                key={i}
                className="w-full p-2 border rounded"
                placeholder={`Item ${i + 1}`}
                value={item}
                onChange={(e) => {
                  const newItems = [...block.items];
                  newItems[i] = e.target.value;
                  updateBlock(index, { ...block, items: newItems });
                }}
              />
            ))}
            <button
              type="button"
              className="text-blue-500 text-sm mt-1"
              onClick={() => updateBlock(index, { ...block, items: [...block.items, ''] })}
            >
              + Add item
            </button>
          </div>
        );
      case 'image':
        return (
          <div key={index} className="space-y-2 mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Image URL"
              value={block.url}
              onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Caption"
              value={block.caption || ''}
              onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
            />
          </div>
        );
    }
  };

  const handleSubmit = async () => {
    if (!title || blocks.length === 0) {
      alert('Please add a title and at least one content block.');
      return;
    }

    const blogData: Omit<Blog, 'id'> = {
      title: title.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      blocks,
      author: 'Admin',
      createdAt: Timestamp.now(),
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      content: '', // optional, fallback for compatibility
    };

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'blogs'), blogData);
      alert('Article published successfully!');
      setTitle('');
      setTags('');
      setBlocks([]);
      setThumbnailUrl('');
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to publish article.');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Write New Article</h1>

      <input
        type="text"
        className="w-full p-3 border text-lg font-semibold rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Thumbnail URL (optional)"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />

      <input
        type="text"
        className="w-full p-2 border rounded mb-6"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="space-y-6">
        {blocks.map((block, index) => (
          <div key={index}>{renderBlockInput(block, index)}</div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {['heading', 'subheading', 'paragraph', 'quote', 'list', 'image'].map((type) => (
          <button
            key={type}
            type="button"
            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
            onClick={() => addBlock(type as EditorBlock['type'])}
          >
            + {type}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-10 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Publishing...' : 'Publish'}
      </button>
    </section>
  );
}
