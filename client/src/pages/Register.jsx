import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateValue = Object.values(data).every((value) => value);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(data);
    } catch (error) {
      console.log(error);
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
            className={`${
              validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
            }   py-2 rounded text-white font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
