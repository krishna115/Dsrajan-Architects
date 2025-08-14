import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Projects from './pages/Projects';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import Write from './pages/Write';
import Dashboard from './pages/Dashboard';
import WritingInternship from './pages/WritingInternship';
import SubmitProject from './pages/SubmitProject';
import SubmitDissertation from './pages/SubmitDissertation';
import SubmitStory from './pages/SubmitStory';
import ContactPage from './pages/ContactPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Articles from './pages/dashboard/AdminArticles';
import SubmittedProjects from './pages/dashboard/SubmittedProjects';
import SubmittedDissertations from './pages/dashboard/SubmittedDissertation';
import SubmittedStories from './pages/dashboard/SubmittedStories';
import InternshipForms from './pages/dashboard/InternshipForms';
import AdminArticles from './pages/dashboard/AdminArticles';
import AdminProjects from './pages/dashboard/AdminProjects';
import CAD from './pages/CAD';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/submit-your-project" element={<SubmitProject />} />
          <Route path="/submit-your-dissertation" element={<SubmitDissertation />} />
          <Route path="/submit-your-story" element={<SubmitStory />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/cad" element={<CAD />} />



          <Route path="/writing-internship" element={<WritingInternship />} />

        </Route>

        {/* Admin Pages */}
        <Route path="/admin" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="projects" element={<AdminProjects />} />
  <Route path="articles" element={<AdminArticles />} />
  <Route path="submitted-projects" element={<SubmittedProjects />} />
  <Route path="submitted-dissertations" element={<SubmittedDissertations />} />
  <Route path="submitted-stories" element={<SubmittedStories />} />
  <Route path="internship-forms" element={<InternshipForms />} />
  <Route path="write" element={<Write />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
