import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <div>
      <h1>SubCategory</h1>
      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategory}
          close={() => setOpenAddSubCategory(false)}
        />
      )}
    </div>
  );
};

export default SubCategoryPage;
