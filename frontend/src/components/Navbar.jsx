import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-base-300 border-b border-base-content/10 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-2">

          <Link 
            to="/" 
            className="text-xl sm:text-3xl font-bold text-primary font-mono tracking-tight shrink-0"
          >
            Thinkboard
          </Link>


          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/create" className="btn btn-primary btn-sm sm:btn-md">
                <PlusIcon className="size-4 sm:size-5" />
                <span className="hidden sm:inline">New Note</span>
              </Link>

              <div className="dropdown dropdown-end">
                <div 
                  tabIndex={0} 
                  role="button" 
                  className="btn btn-ghost btn-circle avatar placeholder sm:btn-md"
                >
                  <div className="bg-primary text-primary-content rounded-full w-8 sm:w-10 flex items-center justify-center">
                    <span className="text-sm sm:text-lg font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow-lg bg-base-100 rounded-box w-52 sm:w-60 border border-base-content/10"
                >
                  <li className="px-3 py-2 border-b border-base-content/10">
                    <p className="font-semibold text-base-content truncate">{user.username}</p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                  </li>
                  <li className="mt-1">
                    <button onClick={logout} className="text-error flex items-center gap-2">
                      <LogOutIcon className="size-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm sm:btn-md">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm sm:btn-md">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;