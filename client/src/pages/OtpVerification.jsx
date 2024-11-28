import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef([]);
  const validateValue = data.every((value) => value);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
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
          Enter your OTP :
        </h1>

        <form className="grid mt-6 gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">OTP :</label>
            <div className="flex  items-center gap-3 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1]?.focus();
                      }
                    }}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    id="otp"
                    type="text"
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-sm p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold text-xl"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
            }   py-2 rounded text-white font-semibold my-3 tracking-wide`}
          >
            Verify OTP
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

export default OtpVerification;
