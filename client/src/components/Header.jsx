import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import useMobile from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleShowUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  const user = useSelector((state) => state?.user);
  console.log("user from store", user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-4 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                alt="logo"
                width={240}
                height={120}
                className="hidden lg:block"
              />
              <img
                src={logo}
                alt="logo"
                width={100}
                height={80}
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* search */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* cart and login */}
          <div className="">
            {/* user icons in mobile */}
            <button
              className="lg:hidden text-neutral-600"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={20} />
            </button>
            {/* desktop */}
            <div className="hidden lg:flex items-center gap-12">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={handleShowUserMenu}
                    className="flex items-center gap-1 cursor-pointer select-none"
                  >
                    <p>Account</p>
                    {showUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                  {showUserMenu && (
                    <div className="absolute top-12 right-0">
                      <div className="bg-white shadow-lg p-4 rounded min-w-52 lg:shadow-lg">
                        <UserMenu close={() => setShowUserMenu(false)} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-neutral-600 text-lg px-2"
                >
                  Login
                </button>
              )}

              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-3 py-3 rounded text-white">
                <div>
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
