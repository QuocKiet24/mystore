import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-red-500">
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
          <button className="lg:hidden text-neutral-600">
            <FaRegUserCircle size={20} />
          </button>
          <div className="hidden lg:block">
            <h1>Login and cart</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
