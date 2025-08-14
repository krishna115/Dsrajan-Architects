import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface StoryForm {
  id: string;
  name: string;
  email: string;
  profession: string;
  story: string;
}

export default function SubmittedStories() {
  const [stories, setStories] = useState<StoryForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const snapshot = await getDocs(collection(db, 'story_submission'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as StoryForm[];

      setStories(data);
      setLoading(false);
    };

    fetchStories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Submitted Stories</h2>

      {loading ? (
        <p>Loading...</p>
      ) : stories.length === 0 ? (
        <p className="text-gray-500">No story submissions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <div key={story.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{story.name}</h3>
              <p className="text-sm text-gray-600">{story.email}</p>
              <p className="text-sm text-gray-600 mb-2">{story.profession}</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">{story.story}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
