import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import FetchUserDetails from "../utils/FetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/UserSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateValue = Object.values(data).every((value) => value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await FetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Welcome Back!
        </h1>

        <form className="grid mt-6 gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              value={data.email}
              onChange={HandleOnChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
                value={data.password}
                onChange={HandleOnChange}
                placeholder="Enter your password"
              />
              <div>
                {showPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => setShowPassword((preve) => !preve)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => setShowPassword((preve) => !preve)}
                  />
                )}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
            }   py-2 rounded text-white font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p>
          Don&apos;t have account?{" "}
          <Link
            to="/register"
            className="font-bold text-green-700 hover:text-green-800 "
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
