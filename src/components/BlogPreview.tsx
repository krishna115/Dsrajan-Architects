import { Link } from 'react-router-dom';
import blogImg from '../assets/hero.jpg'; // Replace with actual thumbnails

const blogs = [
  {
    id: 1,
    title: 'The Art of Space Optimization',
    excerpt: 'Explore techniques used in modern architecture to maximize function without compromising beauty...',
    image: blogImg,
    date: 'June 15, 2025',
    author: 'Krishna Gupta',
    tags: ['Architecture', 'Design'],
  },
  {
    id: 2,
    title: 'Why Sustainable Design Matters',
    excerpt: 'Learn how green buildings are reshaping our future and how DSrajan integrates them into every design...',
    image: blogImg,
    date: 'June 10, 2025',
    author: 'Team DSrajan',
    tags: ['Sustainability', 'Eco-Friendly'],
  },
  {
    id: 3,
    title: 'Minimalism in Indian Interiors',
    excerpt: 'A dive into how minimalism blends with cultural aesthetics for timeless interior designs...',
    image: blogImg,
    date: 'June 1, 2025',
    author: 'DSrajan',
    tags: ['Interior', 'Minimalism'],
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Insights from <span className="italic font-light">D</span><span className="font-semibold">srajan</span>
        </h2>

        {/* Blog Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-gray-100 rounded shadow-md overflow-hidden flex flex-col">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {blog.date} • {blog.author}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.map((tag, index) => (
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
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline mt-auto"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
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
