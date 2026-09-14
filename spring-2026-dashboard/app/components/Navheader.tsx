import { Link, useLocation } from "react-router";
import { useAuth } from "~/components/AuthContext";

export function NavHeader() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

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

  const navItem = (path: string, label: string) => {
    if (!isAuthenticated && path !== "/") {
      return (
        <span
          key={path}
          className="cursor-not-allowed rounded-lg px-4 py-2 font-medium text-white/40"
          aria-disabled="true"
          title="Sign in to access this workspace"
        >
          {label}
        </span>
      );
    }

    return <Link key={path} to={path} className={linkClass(path)}>{label}</Link>;
  };

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
            {navItem("/", "Home")}
            {navItem("/sentiment", "Sentiment")}
            {navItem("/grades", "Grades")}
            {navItem("/topics", "Topics")}
            {isAuthenticated && (
              <button type="button" onClick={logout} className="ml-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/50 hover:text-white">
                Sign out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
