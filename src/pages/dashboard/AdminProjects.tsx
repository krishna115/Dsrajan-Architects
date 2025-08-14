import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  thumbnailUrl?: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.location} • {project.year}
              </p>
              {project.thumbnailUrl && (
                <img
                  src={project.thumbnailUrl}
                  alt={`Thumbnail for ${project.title}`}
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
