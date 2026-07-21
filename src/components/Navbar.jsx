import React from "react";
import { User, LogOut, Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://geographyandyou.com/images/user-profile.png";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

    dispatch(removeUser());
    toast.success("Logged out successfully 👋");
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Logout failed. Please try again.");
  }
};

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-borderc">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2.5">
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
          </Link>
        </div>

        {/* Right Side - Avatar */}
        {user && (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="cursor-pointer flex items-center"
                aria-label="Open account menu"
              >
                <div className="avatar online">
                  <div className="w-9 rounded-full ring ring-accent ring-offset-surface ring-offset-2">
                    <img
                      src={user?.photoUrl || DEFAULT_AVATAR}
                      alt={`${user.firstName}'s avatar`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_AVATAR;
                      }}
                    />
                  </div>
                </div>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 p-2 shadow-xl bg-surface rounded-xl w-56 border border-borderc"
              >
                <div className="px-3 py-2.5 border-b border-borderc mb-1">
                  <h2 className="font-semibold text-text text-sm">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-xs text-muted truncate">
                    {user.emailId}
                  </p>
                </div>

                <li>
                  <Link
                    to="/profile"
                    className="rounded-lg text-muted hover:text-text hover:bg-dark gap-2"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg text-danger hover:bg-danger/10 gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;