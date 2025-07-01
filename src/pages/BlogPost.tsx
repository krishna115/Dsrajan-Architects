import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlogById } from '../firebase';
import type { Blog } from '../types/Blog';
import type { EditorBlock } from '../types/EditorBlock';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error('Failed to load blog:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 py-32">Loading blog post...</p>;
  }

  if (!blog) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Blog Not Found</h2>
        <Link to="/blog" className="text-blue-500 underline">← Back to Articles</Link>
      </div>
    );
  }

  const renderBlock = (block: EditorBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return <h2 key={index} className="text-3xl font-semibold mt-10 mb-4">{block.content}</h2>;
      case 'subheading':
        return <h3 key={index} className="text-xl font-medium mt-6 mb-3">{block.content}</h3>;
      case 'paragraph':
        return <p key={index} className="text-gray-800 leading-relaxed mb-4">{block.content}</p>;
      case 'quote':
        return <blockquote key={index} className="border-l-4 pl-4 italic text-gray-600 mb-4">{block.content}</blockquote>;
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {block.items.map((item, i) => (
              <li key={i} className="text-gray-800">{item}</li>
            ))}
          </ul>
        );
      case 'image':
        return (
          <div key={index} className="my-6 text-center">
            <img src={block.url} alt={block.caption || 'Blog image'} className="mx-auto rounded shadow max-h-[500px]" />
            {block.caption && <p className="text-sm text-gray-500 mt-2">{block.caption}</p>}
          </div>
        );
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      {blog.thumbnailUrl && (
        <img
          src={blog.thumbnailUrl}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-4">
        {blog.author} · {blog.createdAt.toDate().toLocaleDateString()}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {blog.tags.map(tag => (
          <span
            key={tag}
            className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <article className="prose prose-lg max-w-none">
        {blog.blocks
          ? blog.blocks.map((block, index) => renderBlock(block, index))
          : (
            <div
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available.</p>' }}
            />
          )}
      </article>
    </section>
  );
}
