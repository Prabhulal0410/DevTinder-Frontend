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
import { useSelector } from "react-redux";

const navLinks = [
  { name: "Discover", icon: <Code2 size={18} /> },
  { name: "Requests", icon: <Heart size={18} /> },
  { name: "Connections", icon: <Users size={18} /> },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const user = useSelector((store)=>store.user)

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-borderc">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">

        {/* Logo */}
        <div className="flex-1">
          <a className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-dark border border-borderc flex items-center justify-center">
              <Code2 className="text-accent" size={18} />
            </div>

            <div className="leading-tight">
              <h1 className="font-bold text-lg text-text tracking-tight">
                dev<span className="text-accent">/</span>tinder
              </h1>
              <p className="hidden sm:block text-xs text-muted">
                Connect. Collaborate. Code.
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 font-medium">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a className="rounded-lg text-muted hover:text-text hover:bg-dark transition-colors duration-200 gap-2">
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex-none flex items-center gap-1 sm:gap-2">

          {user && (
            <>
              {/* Notification */}
              <button className="btn btn-ghost btn-circle relative text-muted hover:text-text hover:bg-dark">
                <Bell size={20} />
                <span className="w-2 h-2 rounded-full bg-accent absolute top-2 right-2"></span>
              </button>

              {/* Avatar */}
              <div className="dropdown dropdown-end">
                <button
                  type="button"
                  tabIndex={0}
                  className="cursor-pointer flex items-center"
                >
                  <div className="avatar online">
                    <div className="w-9 rounded-full ring ring-accent ring-offset-surface ring-offset-2">
                      <img
                        src={user.data.photoUrl}
                        alt="User avatar"
                      />
                    </div>
                  </div>
                </button>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-4 p-2 shadow-xl bg-surface rounded-xl w-56 border border-borderc"
                >
                  <div className="px-3 py-2.5 border-b border-borderc mb-1">
                    <h2 className="font-semibold text-text text-sm">Prabhulal</h2>
                    <p className="text-xs text-muted">Frontend Developer</p>
                  </div>

                  <li>
                    <a className="rounded-lg text-muted hover:text-text hover:bg-dark gap-2">
                      <User size={16} />
                      Profile
                    </a>
                  </li>

                  <li>
                    <a className="rounded-lg text-muted hover:text-text hover:bg-dark gap-2">
                      <Settings size={16} />
                      Settings
                    </a>
                  </li>

                  <li>
                    <a className="rounded-lg text-danger hover:bg-danger/10 gap-2">
                      <LogOut size={16} />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Mobile Button */}
          <button
            className="btn btn-ghost btn-circle lg:hidden text-muted hover:text-text hover:bg-dark"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenu ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-borderc bg-surface">
          <ul className="menu w-full gap-1 pt-2">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a className="rounded-lg text-muted hover:text-text hover:bg-dark gap-2">
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