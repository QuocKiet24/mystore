import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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
        ...SummaryApi.forgotpassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Forgot Your Password?
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

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
            }   py-2 rounded text-white font-semibold my-3 tracking-wide`}
          >
            Send OTP
          </button>
        </form>

        <p>
          Remembered your password? &nbsp;
          <Link
            to="/login"
            className="font-bold text-green-700 hover:text-green-800 "
          >
            Go back to login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
