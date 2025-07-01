
// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Outlet />
    </main>
  );
}
