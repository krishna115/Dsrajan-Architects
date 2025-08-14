import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-32 px-6 text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533049022227-8f8f12c94958?auto=format&fit=crop&w=2100&q=80"
            alt="Contact Banner"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Let’s Get in Touch</h1>
          <p className="text-lg text-gray-200">
            Whether you're looking to collaborate, ask a question, or just say hi — we’d love to hear from you.
          </p>
        </div>
      </div>

      {/* Intro Paragraph */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Reach out anytime</h2>
        <p className="text-lg">
          Our team is always open to inquiries related to projects, internships, press, or just to
          have a good conversation about design and architecture. We’ll try our best to respond
          within 24–48 hours.
        </p>
      </div>

      {/* Contact Component (Form + Info + Hours) */}
      <Contact />
    </div>
  );
}
