import { useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { fetchProjects } from '../firebase';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-xl shadow bg-gray-200 h-80"
              ></div>
            ))
          : projects.map(project => (
              <div key={project.id} className="rounded-xl shadow hover:shadow-lg transition">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="bg-white p-4 rounded-b-xl">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
