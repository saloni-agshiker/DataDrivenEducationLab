import { Link, useLocation } from "react-router";

export function NavHeader() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive(path)
        ? "bg-[#B3A369] text-[#003057]"
        : "text-white hover:bg-[#004477]"
    }`;

  return (
    <header className="bg-[#003057] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/gt.png" alt="Georgia Tech" className="h-8 w-auto bg-white rounded p-1" />
            <div>
              <h1 className="text-xl font-bold text-white">Discussion Forum Dashboard</h1>
              <p className="text-[#B3A369] text-sm">Georgia Tech - Data Driven Education</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/sentiment" className={linkClass("/sentiment")}>Sentiment</Link>
            <Link to="/grades" className={linkClass("/grades")}>Grades</Link>
            <Link to="/topics" className={linkClass("/topics")}>Topics</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}