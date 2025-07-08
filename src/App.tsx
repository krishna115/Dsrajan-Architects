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


          <Route path="/writing-internship" element={<WritingInternship />} />

        </Route>

        {/* Admin Pages */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/write" element={<Write />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
