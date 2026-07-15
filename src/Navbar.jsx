import React from "react";
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Users,
  Heart,
  Code2,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  // Temporary
  const isAuthenticated = true;

  const navLinks = [
    { name: "Discover", icon: <Code2 size={18} /> },
    { name: "Requests", icon: <Heart size={18} /> },
    { name: "Connections", icon: <Users size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-5">

        {/* Logo */}
        <div className="flex-1">
          <a className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
              <Code2 className="text-white" size={22} />
            </div>

            <div>
              <h1 className="font-bold text-xl tracking-wide">
                DevTinder
              </h1>
              <p className="text-xs opacity-60">
                Connect. Collaborate. Code.
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-medium">

            {navLinks.map((item) => (
              <li key={item.name}>
                <a className="rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}

          </ul>
        </div>

        {/* Right Side */}
        <div className="flex-none gap-3">

          {isAuthenticated ? (
            <>
              {/* Notification */}
              <button className="btn btn-ghost btn-circle relative hover:scale-105 transition">
                <Bell size={21} />
                <span className="badge badge-primary badge-xs absolute top-2 right-2"></span>
              </button>

              {/* Avatar */}
              <div className="dropdown dropdown-end">

                <label tabIndex={0} className="cursor-pointer">

                  <div className="avatar online">
                    <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src="https://i.pravatar.cc/150?img=15"
                        alt="avatar"
                      />
                    </div>
                  </div>

                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-4 p-2 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-300"
                >
                  <div className="px-4 py-3 border-b border-base-300">
                    <h2 className="font-bold">Prabhulal</h2>
                    <p className="text-sm opacity-60">
                      Frontend Developer
                    </p>
                  </div>

                  <li className="mt-2">
                    <a>
                      <User size={18} />
                      Profile
                    </a>
                  </li>

                  <li>
                    <a>
                      <Settings size={18} />
                      Settings
                    </a>
                  </li>

                  <li className="text-error">
                    <a>
                      <LogOut size={18} />
                      Logout
                    </a>
                  </li>
                </ul>

              </div>
            </>
          ) : (
            <>
              <button className="btn btn-ghost">
                Login
              </button>

              <button className="btn btn-primary rounded-xl">
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Button */}
          <button
            className="btn btn-ghost lg:hidden btn-circle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenu ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 border-t border-base-300 bg-base-100">

          <ul className="menu w-full gap-2">

            {navLinks.map((item) => (
              <li key={item.name}>
                <a className="rounded-xl">
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}

          </ul>

        </div>
      </div>
    </header>
  );
};

export default Navbar;