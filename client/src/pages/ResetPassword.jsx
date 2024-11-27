import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateValue = Object.values(data).every((value) => value);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);
  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.resetpassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
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
          Enter your new password :
        </h1>

        <form className="grid mt-6 gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="w-full outline-none"
                value={data.newPassword}
                onChange={HandleOnChange}
                placeholder="Enter your new password"
              />
              <div>
                {showNewPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => setShowNewPassword((preve) => !preve)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => setShowNewPassword((preve) => !preve)}
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
                value={data.password}
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
            Change Password
          </button>
        </form>

        <p>
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

export default ResetPassword;
