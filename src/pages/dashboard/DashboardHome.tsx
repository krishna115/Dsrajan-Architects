
import { Link } from "react-router-dom";

const   DashboardHome = () => {
  const links = [
    { title: "Projects", path: "/admin/projects" },
    { title: "Articles", path: "/admin/articles" },
    { title: "Submitted Projects", path: "/admin/submitted-projects" },
    { title: "Submitted Dissertations", path: "/admin/submitted-dissertations" },
    { title: "Submitted Stories", path: "/admin/submitted-stories" },
    { title: "Internship Forms", path: "/admin/internships" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
