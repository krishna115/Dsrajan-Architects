import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function SubmitProject() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    driveLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'project_submission'), {
        ...form,
        submittedAt: new Date(),
      });
      alert('Submission received successfully!');
      setForm({
        name: '',
        email: '',
        address: '',
        driveLink: '',
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Error saving submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 space-y-10 text-gray-800">
      {/* Intro */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Submit Your Project</h1>
        <p>
          We welcome submissions in Architecture, Interior Design, Furniture, Lighting,
          Home Decor, Art, Landscape, and Urban Planning. If you have a unique project, share
          it with us and reach our global audience.
        </p>
      </section>

      {/* Guidelines Box */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Updated Requirements */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">What to Include</h2>
            <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
              <li>Project title and detailed description (around 500–600 words).</li>
              <li>Year of completion.</li>
              <li>Official website, Instagram, and Facebook links (if any).</li>
              <li>Firm’s profile and Principal Architect/Designer’s portrait photo.</li>
              <li>Firm logo in JPEG/PNG format.</li>
            </ul>
          </div>

          {/* Updated Photo Guidelines */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Photos and Images</h2>
            <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
              <li>Upload high-quality images (minimum 800px wide) in JPEG or PNG format.</li>
              <li>Do not include watermarks or logos on the images.</li>
              <li>Bundle all materials in a Google Drive folder.</li>
              <li><strong>Do not send .rar files.</strong></li>
              <li>Make sure the folder link is accessible (anyone with the link can view).</li>
            </ul>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">Submit Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Drive Link */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Google Drive Folder Link (Project Files)
              </label>
              <input
                type="url"
                name="driveLink"
                value={form.driveLink}
                onChange={handleChange}
                required
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <p className="text-sm text-gray-500 mt-1">
                Make sure this folder includes your images, description, logo, and other details.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition font-medium w-fit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
