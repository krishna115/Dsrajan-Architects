import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function SubmitDissertation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: '',
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
      await addDoc(collection(db, 'dissertation_submission'), {
        ...form,
        submittedAt: new Date(),
      });
      alert('Dissertation submitted successfully!');
      setForm({
        name: '',
        email: '',
        institution: '',
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
        <h1 className="text-3xl font-bold">Submit Your Dissertation</h1>
        <p>
          If you’re an architecture student or researcher with a dissertation that deserves to be
          read by a broader audience, we welcome your submission.
        </p>
        <p>
          We publish quality academic work related to architectural theory, design, urbanism,
          sustainability, and built environments.
        </p>
      </section>

      {/* Guidelines Box */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* What to Include */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">What to Include</h2>
            <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
              <li>Dissertation Title and Abstract (approx. 250–300 words).</li>
              <li>Name of Institution and Year of Submission.</li>
              <li>Any diagrams, illustrations, or images included in the dissertation.</li>
              <li>A short student bio and profile photo (optional).</li>
              <li>Final dissertation document in PDF format.</li>
            </ul>
          </div>

          {/* File Upload Guidelines */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">File Submission</h2>
            <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
              <li>Bundle all relevant files into a Google Drive folder.</li>
              <li>Ensure the link is set to “Anyone with the link can view”.</li>
              <li>Accepted formats: PDF, JPEG, PNG, DOCX.</li>
              <li><strong>Do not send .rar files.</strong></li>
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

            {/* Institution */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Institution</label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                required
                placeholder="e.g. School of Planning and Architecture, Delhi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Address */}
            <div>
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
                Google Drive Folder Link (All Files)
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
                Upload your dissertation and any supporting material in a shared Google Drive
                folder.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition font-medium w-fit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Dissertation'}
          </button>
        </form>
      </div>
    </div>
  );
}
