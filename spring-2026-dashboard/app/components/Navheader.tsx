import { Link, useLocation } from "react-router";
import { useClassContext } from "~/components/ClassContext";

export function NavHeader() {
  const location = useLocation();
  const { selectedClass, setSelectedClass, availableClasses } = useClassContext();

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
            <span className="text-2xl">🐝</span>
            <div>
              <h1 className="text-xl font-bold text-white">Discussion Forum Dashboard</h1>
              <p className="text-[#B3A369] text-sm">Georgia Tech - Data Driven Education</p>
            </div>
          </Link>

          {/* Navigation Links + Class Selector */}
          <div className="flex items-center gap-4">
            {/* Class Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="class-select" className="text-white text-sm font-medium">
                Class:
              </label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-white text-[#003057] px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-[#B3A369] focus:outline-none focus:ring-2 focus:ring-[#B3A369] cursor-pointer"
              >
                <option value="all">All Classes</option>
                {availableClasses.map((cls) => (
                  <option key={cls.courseId} value={cls.courseId}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/30" />

            {/* Navigation Links */}
            <nav className="flex items-center gap-2">
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/sentiment" className={linkClass("/sentiment")}>Sentiment</Link>
              <Link to="/grades" className={linkClass("/grades")}>Grades</Link>
              <Link to="/topics" className={linkClass("/topics")}>Topics</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}