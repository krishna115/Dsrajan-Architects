import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import type { Project } from '../types/Project';
import type { Blog } from '../types/Blog';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const blogsSnapshot = await getDocs(collection(db, 'blogs'));

      setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);
      setBlogs(blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Blog[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage all your content from one place</p>
      </header>

      {/* ---------------- Projects Section ---------------- */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
          <Link
            to="/submit-project"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Project
          </Link>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white p-4 rounded shadow">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.location} • {project.year}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- Articles Section ---------------- */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Articles</h2>
          <Link
            to="/admin/write"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Write Article
          </Link>
        </div>

        {loading ? (
          <p>Loading articles...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white p-4 rounded shadow">
                <img
                  src={blog.thumbnailUrl}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.author}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
