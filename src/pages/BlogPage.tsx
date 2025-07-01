import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from '../types/Blog';
import { fetchBlogs } from '../firebase';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-gray-200 h-80 rounded-xl shadow" />
            ))
          : blogs.map(blog => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <div className="rounded-xl shadow hover:shadow-md transition bg-white">
                  {blog.thumbnailUrl && (
                    <img
                      src={blog.thumbnailUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {blog.author} · {blog.createdAt.toDate().toLocaleDateString()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {blog.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
