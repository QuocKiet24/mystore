import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../components/UserMenuMobile";
import DashBoard from "../layout/DashBoard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import AdminPermision from "../layout/AdminPermision";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <CategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <SubCategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermision>
                <UploadProduct />
              </AdminPermision>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermision>
                <ProductPage />
              </AdminPermision>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
