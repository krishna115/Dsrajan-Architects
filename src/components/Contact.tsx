import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt} from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { Contact } from '../types/Contact'; 



export default function Contact() {
  const initialForm: Omit<Contact, 'createdAt'> = {
  name: '',
  email: '',
  message: ''
};

const [form, setForm] = useState<Omit<Contact, 'createdAt'>>(initialForm);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData: Contact = {
    ...form,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, 'contacts'), formData);
    alert('Message sent!');
    setForm(initialForm);
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Something went wrong. Please try again later.');
  }

  setIsSubmitting(false);
};
  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="space-y-10">
   <div className="bg-gray-50 text-gray-800 rounded-xl p-8 shadow-md w-full">
              <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
                CONTACT INFORMATION
              </h3>
              
              <div className="flex items-start gap-4 mb-4">
                <FaEnvelope className="mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">contact@dsrajan.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <FaPhone className="mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+91 94525 62282</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <FaMapMarkerAlt className="mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-gray-600">Kanpur, Uttar Pradesh</p>
                </div>
              </div>
            </div>
            

            {/* Business Hours Card */}
            <div className="bg-gray-50 text-gray-800 rounded-xl p-8 shadow-md w-full">
              <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
                BUSINESS HOURS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6 mt-6">
                <div>
                  <p className="uppercase font-semibold text-sm tracking-wide mb-1">Monday – Friday</p>
                  <p className="text-gray-600 text-sm">9:00 am – 8:00 pm</p>
                </div>
                <div>
                  <p className="uppercase font-semibold text-sm tracking-wide mb-1">Saturday</p>
                  <p className="text-gray-600 text-sm">9:00 am – 6:00 pm</p>
                </div>
                <div>
                  <p className="uppercase font-semibold text-sm tracking-wide mb-1">Sunday</p>
                  <p className="text-gray-600 text-sm">9:00 am – 5:00 pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-50 text-gray-800 rounded-xl p-8 shadow-md w-full space-y-2">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
                BUSINESS HOURS
              </h3>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Write your message..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition font-medium w-fit"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
