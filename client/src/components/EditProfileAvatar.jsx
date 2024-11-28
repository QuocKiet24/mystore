import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updatedAvatar } from "../redux/UserSlice";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const EditProfileAvatar = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      toast.success(responseData.message);
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-70 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full p-4 rounded flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-800 w-fit block ml-auto"
        >
          <IoClose size={20} />
        </button>
        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg ">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-100 hover:bg-primary-200 px-4 py-1 rounded my-4 text-sm">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default EditProfileAvatar;
