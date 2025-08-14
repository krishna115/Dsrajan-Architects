import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import type { Project } from '../types/Project';
import type { Blog } from '../types/Blog';

interface ProjectForm {
  id: string;
  name: string;
  email: string;
  address: string;
  driveLink: string;
}

interface DissertationForm extends ProjectForm {
  institution: string;
}

interface StoryForm {
  id: string;
  name: string;
  email: string;
  profession: string;
  story: string;
}

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

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [submissions, setSubmissions] = useState<ProjectForm[]>([]);
  const [dissertations, setDissertations] = useState<DissertationForm[]>([]);
  const [stories, setStories] = useState<StoryForm[]>([]);
  const [internships, setInternships] = useState<InternshipForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [projectsSnap, blogsSnap, projectsSubSnap, dissertationsSnap, storiesSnap, internshipsSnap] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'blogs')),
        getDocs(collection(db, 'project_submission')),
        getDocs(collection(db, 'dissertation_submission')),
        getDocs(collection(db, 'story_submission')),
        getDocs(collection(db, 'writing_internship_submission')),
      ]);

      setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);
      setBlogs(blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Blog[]);
      setSubmissions(projectsSubSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProjectForm[]);
      setDissertations(dissertationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DissertationForm[]);
      setStories(storiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StoryForm[]);
      setInternships(internshipsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InternshipForm[]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const renderCard = (title: string, description: string, extra?: string) => (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      {extra && <a href={extra} target="_blank" className="text-blue-600 text-sm underline mt-2 block">View</a>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage all your content from one place</p>
      </header>

      {/* Projects */}
      <Section title="Projects" loading={loading} items={projects} addLink="/submit-project" addLabel="+ Add Project">
        {projects.map(p => renderCard(p.title, `${p.location} • ${p.year}`, p.thumbnailUrl))}
      </Section>

      {/* Articles */}
      <Section title="Articles" loading={loading} items={blogs} addLink="/admin/write" addLabel="+ Write Article">
        {blogs.map(b => renderCard(b.title, `By ${b.author}`, b.thumbnailUrl))}
      </Section>

      {/* Project Submissions */}
      <Section title="Submitted Projects" loading={loading} items={submissions}>
        {submissions.map(s => renderCard(s.name, s.email, s.driveLink))}
      </Section>

      {/* Dissertation Submissions */}
      <Section title="Dissertations" loading={loading} items={dissertations}>
        {dissertations.map(d => renderCard(d.name, `${d.email} • ${d.institution}`, d.driveLink))}
      </Section>

      {/* Stories */}
      <Section title="Stories" loading={loading} items={stories}>
        {stories.map(story => renderCard(story.name, story.profession))}
      </Section>

      {/* Internship Submissions */}
      <Section title="Internship Applications" loading={loading} items={internships}>
        {internships.map(app => renderCard(app.name, app.profession, app.driveFolderLink))}
      </Section>
    </div>
  );
}

function Section({
  title,
  loading,
  items,
  addLink,
  addLabel,
  children,
}: {
  title: string;
  loading: boolean;
  items: any[];
  addLink?: string;
  addLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {addLink && addLabel && (
          <Link to={addLink} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {addLabel}
          </Link>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No entries found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
      )}
    </section>
  );
}
