import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border border-neutral-300 text-neutral-700 overflow-hidden flex items-center bg-slate-50  group focus-within:border-primary-200">
      <button className="h-full flex items-center justify-center p-3 group-focus-within:text-primary-200">
        <IoSearch size={22} />
      </button>
      <div className="w-full h-full">
        {!isSearchPage ? (
          // not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;