import { Link } from 'react-router-dom';
import projectImg from '../assets/hero.jpg'; // Replace with actual images

const projects = [
  {
    id: 1,
    title: 'Courtyard House',
    type: 'Residential',
    location: 'Indore, MP',
    image: projectImg,
  },
  {
    id: 2,
    title: 'Glass Facade Office',
    type: 'Commercial',
    location: 'Bhopal, MP',
    image: projectImg,
  },
  {
    id: 3,
    title: 'Sustainable Villa',
    type: 'Eco-Luxury',
    location: 'Pune, MH',
    image: projectImg,
  },
];

export default function ProjectsPreview() {
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
                src={project.image}
                alt={project.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.type} • {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
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
