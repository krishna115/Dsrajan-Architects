import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import ProjectsPreview from '../components/ProjectsPreview';
import BlogPreview from '../components/BlogPreview';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <ProjectsPreview />
      <BlogPreview />
      <Contact />
    </>
  );
}
