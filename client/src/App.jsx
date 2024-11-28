import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import FetchUserDetails from "./utils/FetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/UserSlice";

function App() {
  const dispatch = useDispatch();
  const FetchUser = async () => {
    const userData = await FetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
