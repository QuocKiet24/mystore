import { useSelector } from "react-redux";

const Home = () => {
  const bannerUrl = "https://placehold.co/2560x470.png";
  const mobileBannerUrl = "https://placehold.co/1200x900.png";
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const category = useSelector((state) => state.product.allCategory);

  const categorySkeleton = new Array(10).fill(null);

  return (
    <section className="bg-white py-2">
      <div className="container mx-auto">
        <div
          className={`w-full h-48 lg:h-64 min-h-48 bg-blue-200 rounded ${
            !bannerUrl && "animate-pulse"
          }`}
        >
          <img
            src={bannerUrl}
            alt="Mobile Banner"
            className="w-full h-full object-cover rounded hidden lg:block"
          />
          <img
            src={mobileBannerUrl}
            alt="Website Banner"
            loading="lazy"
            className="w-full h-full object-cover rounded block lg:hidden"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 my-2 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? categorySkeleton.map((item, index) => (
              <div
                key={index + "loadingCategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          : category.map((item) => (
              <div key={item._id + "category"} className="w-full h-full">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 mb-2">
                    <img
                      src="https://placehold.co/500x500.png"
                      alt="product image"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <p className="text-sm font-medium text-center text-gray-800 truncate">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Home;
