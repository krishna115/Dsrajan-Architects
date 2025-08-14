import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface InternshipForm {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  profession: string;
  blogUrl: string;
  driveFolderLink: string;
  message: string;
}

export default function InternshipForms() {
  const [forms, setForms] = useState<InternshipForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const snapshot = await getDocs(collection(db, 'writing_internship_submission'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as InternshipForm[];

      setForms(data);
      setLoading(false);
    };

    fetchForms();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Internship Forms</h2>

      {loading ? (
        <p>Loading...</p>
      ) : forms.length === 0 ? (
        <p className="text-gray-500">No internship forms submitted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(form => (
            <div key={form.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{form.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{form.email}</p>
              <p className="text-sm text-gray-600 mb-1">
                {form.profession} • {form.gender} • {form.birthDate}
              </p>
              <p className="text-sm text-gray-600 mb-2">{form.message}</p>

              {form.blogUrl && (
                <a
                  href={form.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline block"
                >
                  View Blog
                </a>
              )}

              {form.driveFolderLink && (
                <a
                  href={form.driveFolderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline block mt-1"
                >
                  Drive Folder
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
