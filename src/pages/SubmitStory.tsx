import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function SubmitStory() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    profession: '',
    story: '',
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
      await addDoc(collection(db, 'story_submission'), {
        ...form,
        submittedAt: new Date(),
      });
      alert('Thank you for sharing your story!');
      setForm({
        name: '',
        email: '',
        profession: '',
        story: '',
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Error saving story:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 space-y-10 text-gray-800">
      {/* Intro */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Submit Your Story</h1>
        <p>
          Everyone has a story. Whether you’re a student, architect, designer, or someone who found
          inspiration in spaces and structures — we want to hear yours.
        </p>
        <p>
          Your journey, your struggles, your breakthroughs — when shared, they inspire and connect
          others. This is your chance to be heard and featured on our platform.
        </p>
      </section>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl shadow-md p-8 space-y-6">
        <h3 className="text-xl font-bold border-b border-gray-300 pb-2">Share Your Story</h3>

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

          {/* Profession */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Profession</label>
            <input
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              placeholder="e.g. Architecture Student, Urban Designer, etc."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Story */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Your Story</label>
            <textarea
              name="story"
              value={form.story}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us your journey, challenges, or what inspires you..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition font-medium w-fit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Story'}
        </button>
      </form>
    </div>
  );
}
