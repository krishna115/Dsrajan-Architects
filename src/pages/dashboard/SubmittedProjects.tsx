import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface ProjectForm {
  id: string;
  name: string;
  email: string;
  address: string;
  driveLink: string;
}

export default function SubmittedProjects() {
  const [submissions, setSubmissions] = useState<ProjectForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const snapshot = await getDocs(collection(db, 'project_submission'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ProjectForm[];

      setSubmissions(data);
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Submitted Projects</h2>

      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500">No submitted projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map(project => (
            <div key={project.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{project.email}</p>
              {project.driveLink && (
                <a
                  href={project.driveLink}
                  className="text-blue-600 text-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Drive Folder
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
