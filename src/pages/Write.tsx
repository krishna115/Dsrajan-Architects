import { useState } from 'react';
import type { EditorBlock } from '../types/EditorBlock';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Blog } from '../types/Blog';
import { AutoResizingTextArea } from '../components/AutoResizingTextArea';
import { MdCancel } from 'react-icons/md';

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

  const deleteBlock = (index: number) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };

  const renderBlockInput = (block: EditorBlock, index: number) => (
    <div key={index} className="group relative mb-6">
      {/* 🗑 Delete Icon on hover */}
      <button
        onClick={() => deleteBlock(index)}
        className="absolute -right-6 top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
        title="Delete block"
      >
        <MdCancel size={20} />
      </button>

      {/* Render block type */}
      {(() => {
        switch (block.type) {
          case 'heading':
            return (
              <AutoResizingTextArea
                className="w-full text-3xl font-bold text-gray-800 focus:outline-none placeholder-gray-400"
                placeholder="Heading"
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlock(index, { ...block, content: e.target.value })}
              />
            );
          case 'subheading':
            return (
              <AutoResizingTextArea
                className="w-full text-xl font-semibold text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Subheading"
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlock(index, { ...block, content: e.target.value })}
              />
            );
          case 'paragraph':
            return (
              <AutoResizingTextArea
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlock(index, { ...block, content: e.target.value })}
                placeholder="Write something..."
                className="w-full text-base leading-relaxed text-gray-800 focus:outline-none placeholder-gray-400"
              />
            );
          case 'quote':
            return (
              <AutoResizingTextArea
                className="w-full italic text-gray-600 focus:outline-none placeholder-gray-400 pl-4 border-l-4 border-gray-300 bg-gray-50"
                placeholder="Quote"
                value={block.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlock(index, { ...block, content: e.target.value })}
              />
            );
          case 'list':
            return (
              <div className="space-y-2">
                {block.items.map((item, i) => (
                  <input
                    key={i}
                    className="w-full text-base text-gray-800 focus:outline-none placeholder-gray-400 pl-4"
                    placeholder={`• List item ${i + 1}`}
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
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => updateBlock(index, { ...block, items: [...block.items, ''] })}
                >
                  + Add item
                </button>
              </div>
            );
          case 'image':
            return (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full text-base text-gray-800 focus:outline-none placeholder-gray-400"
                  placeholder="Image URL"
                  value={block.url}
                  onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full text-sm text-gray-500 italic focus:outline-none placeholder-gray-300"
                  placeholder="Caption (optional)"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                />
              </div>
            );
        }
      })()}
    </div>
  );

  const handleSubmit = async () => {
    if (!title || blocks.length === 0) {
      alert('Please add a title and at least one content block.');
      return;
    }

    const blogData: Omit<Blog, 'id'> = {
      title: title.trim(),
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      blocks,
      author: 'Admin',
      createdAt: Timestamp.now(),
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      content: '',
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
    <section className="max-w-4xl mx-auto px-6 py-12 font-serif">
      {/* <h1 className="text-4xl font-bold text-gray-900 mb-6">Write New Article</h1> */}

      <input
        type="text"
        className="w-full text-5xl font-bold text-gray-800 focus:outline-none placeholder-gray-400 mb-6"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className="w-full text-sm mb-4 focus:outline-none placeholder-gray-400 text-gray-500"
        placeholder="Thumbnail URL (optional)"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />

      <input
        type="text"
        className="w-full text-sm mb-8 focus:outline-none placeholder-gray-400 text-gray-500"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="space-y-8">
        {blocks.map((block, index) => renderBlockInput(block, index))}
      </div>

      <div className="flex flex-wrap gap-2 mt-10">
        {['heading', 'subheading', 'paragraph', 'quote', 'list', 'image'].map((type) => (
          <button
            key={type}
            type="button"
            className="px-4 py-1.5 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition"
            onClick={() => addBlock(type as EditorBlock['type'])}
          >
            + {type}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-12 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {isSubmitting ? 'Publishing...' : 'Publish'}
      </button>
    </section>
  );
}
