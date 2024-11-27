import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateValue = Object.values(data).every((value) => value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
      }

      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h1>Welcome to Grocerystore</h1>

        <form className="grid mt-6 gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              id="name"
              name="name"
              type="text"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              value={data.name}
              onChange={HandleOnChange}
              placeholder="Enter your name"
            />
          </div>
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
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full outline-none"
                value={data.confirmPassword}
                onChange={HandleOnChange}
                placeholder="Enter your confirm password"
              />
              <div>
                {showConfirmPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  />
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
            }   py-2 rounded text-white font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-green-700 hover:text-green-800 "
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
