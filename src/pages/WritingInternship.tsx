import { useState } from 'react';
import { submitInternshipApplication } from '../firebase';

export default function WritingInternship() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    profession: '',
    blogUrl: '',
    driveFolderLink: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitInternshipApplication(form);
      alert('Application submitted!');
      setForm({
        name: '',
        email: '',
        birthDate: '',
        gender: '',
        profession: '',
        blogUrl: '',
        driveFolderLink: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 space-y-10 text-gray-800">
      {/* Intro */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Architectural Writing Internship</h1>
        <p>
          Are you passionate about architecture and storytelling? Join our editorial training
          program and become a voice in the world of design.
        </p>
        <p>
          Whether you design buildings or admire them, your perspective matters. This remote
          internship is designed for creative individuals who want to write powerful, insightful
          stories about architecture and design.
        </p>
        <p>
          We expect just one well-written article per week. In return, you get regular feedback,
          visibility, and a certificate upon completion. If you're ready to bring architecture to
          life through words — we’re ready to have you.
        </p>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 text-gray-800 rounded-xl p-8 shadow-md w-full space-y-6"
      >
        <h3 className="text-xl font-bold border-b border-gray-300 pb-2">Apply Now</h3>

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

          {/* Birth Date */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          {/* Profession */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Profession</label>
            <input
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              placeholder="e.g. Architect"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Blog URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Blog URL (if any)</label>
            <input
              type="url"
              name="blogUrl"
              value={form.blogUrl}
              onChange={handleChange}
              placeholder="https://yourblog.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Google Drive Folder Link */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Google Drive Folder Link (Sample Article + CV)
            </label>
            <input
              type="url"
              name="driveFolderLink"
              value={form.driveFolderLink}
              onChange={handleChange}
              required
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your <strong>sample article</strong> and <strong>CV</strong> into a Google
              Drive folder. Make sure the folder is shared as “Anyone with the link can view”, and
              paste the folder link here.
            </p>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Why do you want to join?</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us why you're a good fit..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition font-medium w-fit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
