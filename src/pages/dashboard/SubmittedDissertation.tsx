import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface DissertationForm {
  id: string;
  name: string;
  email: string;
  address: string;
  institution: string;
  driveLink: string;
}

export default function SubmittedDissertations() {
  const [dissertations, setDissertations] = useState<DissertationForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDissertations = async () => {
      const snapshot = await getDocs(collection(db, 'dissertation_submission'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DissertationForm[];

      setDissertations(data);
      setLoading(false);
    };

    fetchDissertations();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Submitted Dissertations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : dissertations.length === 0 ? (
        <p className="text-gray-500">No dissertation submissions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dissertations.map(dis => (
            <div key={dis.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{dis.name}</h3>
              <p className="text-sm text-gray-600">{dis.email}</p>
              <p className="text-sm text-gray-600 mb-1">{dis.institution}</p>
              {dis.driveLink && (
                <a
                  href={dis.driveLink}
                  className="text-blue-600 text-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Dissertation
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
