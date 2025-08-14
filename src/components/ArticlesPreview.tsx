import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed
import type { Blog } from '../types/Blog';

export default function ArticlesPreview() {
  const [articles, setArticles] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Blog[];
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <section id="articles" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Insights from <span className="italic font-light">D</span><span className="font-semibold">srajan</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-gray-100 rounded shadow-md overflow-hidden flex flex-col">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{article.title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {article.author}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/blog/${article.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline mt-auto"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-slate-700 text-white px-6 py-3 rounded hover:bg-slate-900 transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
