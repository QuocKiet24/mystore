import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { logout } from "../redux/UserSlice";
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";

// eslint-disable-next-line react/prop-types
const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        if (close) {
          close();
        }
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className=" font-semibold">My account</div>
      <div className="text-sm font-bold flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name || user?.mobile}
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link
          onClick={handleClose}
          to={"/dashboard/category"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Category
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/subcategory"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Sub Category
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/upload-product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Upload Product
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Product
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
