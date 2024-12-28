import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import FetchUserDetails from "./utils/FetchUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./redux/UserSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./redux/ProductSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const FetchUser = async () => {
    if (user._id) {
      const userData = await FetchUserDetails();
      dispatch(setUserDetails(userData.data));
    }
    return null;
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    const response = await Axios({
      ...SummaryApi.getSubCategory,
    });
    const { data: responseData } = response;

    if (responseData.success) {
      dispatch(
        setAllSubCategory(
          responseData.data.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
    }
  };

  useEffect(() => {
    FetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
