import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  author: string;
  thumbnailUrl?: string;
}

export default function AdminArticles() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, 'blogs'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];

      setBlogs(data);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Articles</h2>
        <Link to="/admin/write" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Write Article
          </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white p-4 rounded shadow">
              {blog.thumbnailUrl && (
                <img
                  src={blog.thumbnailUrl}
                  alt={`Thumbnail for ${blog.title}`}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h3 className="font-semibold text-lg mt-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
