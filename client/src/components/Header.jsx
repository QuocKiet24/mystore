import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
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
            {/* user icons only display in mobile */}
            <button className="lg:hidden text-neutral-600">
              <FaRegUserCircle size={20} />
            </button>
            {/* desktop */}
            <div className="hidden lg:flex items-center gap-12">
              <button
                onClick={redirectToLoginPage}
                className="text-neutral-600 text-lg px-2"
              >
                Login
              </button>
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
