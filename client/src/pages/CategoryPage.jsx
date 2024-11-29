import { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmDialog from "../components/ConfirmDialog";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [OpenUpload, setOpenUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }

      console.log(responseData);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section>
      <div className="p-4  bg-white shadow-md flex items-center justify-between">
        <h2 className="text-xl font-bold">Category</h2>
        <button
          onClick={() => setOpenUpload(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category) => {
          return (
            <div className="w-32 h-56 rounded shadow-md" key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                className="w-40 object-scale-down"
              />
              <div className="flex items-center h-8 gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1  hover:bg-slate-200 text-yellow-500 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1  hover:bg-slate-200 text-red-500 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}
      {OpenUpload && (
        <UploadCategory
          fetchData={fetchCategory}
          close={() => setOpenUpload(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          dataEdit={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}
      {openDelete && (
        <ConfirmDialog
          cancel={() => setOpenDelete(false)}
          confirm={handleDeleteCategory}
          close={() => setOpenDelete(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
