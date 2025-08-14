import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed
import type { Project } from '../types/Project';

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Featured <span className="italic font-light">Projects</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/projects"
            className="inline-block bg-slate-700 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
