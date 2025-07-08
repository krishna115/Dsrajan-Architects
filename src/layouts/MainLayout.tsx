// src/layouts/MainLayout.tsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/next';


export default function MainLayout() {
  return (
    <>
      <Analytics />
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}
