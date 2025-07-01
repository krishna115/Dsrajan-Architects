import { FaDraftingCompass, FaCouch, FaCity, FaSolarPanel } from 'react-icons/fa'; // FontAwesome icons

const expertise = [
  {
    icon: <FaDraftingCompass size={36} className="text-slate-600" />,
    title: 'Architectural Design',
    description:
      'We design functional, aesthetic spaces tailored to your lifestyle and vision.',
  },
  {
    icon: <FaCouch size={36} className="text-slate-600" />,
    title: 'Interior Design',
    description:
      'We craft timeless interiors that balance beauty with practicality.',
  },
  {
    icon: <FaCity size={36} className="text-slate-600" />,
    title: 'Urban Planning',
    description:
      'We shape sustainable urban spaces that support vibrant communities.',
  },
  {
    icon: <FaSolarPanel size={36} className="text-slate-600" />,
    title: 'Sustainable Solutions',
    description:
      'From energy-efficient designs to eco-friendly materials, sustainability is at our core.',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Our <span className="italic font-light">Expertise</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-left">
          {expertise.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
