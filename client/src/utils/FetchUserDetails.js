import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";
import AxiosToastError from "./AxiosToastError";

const FetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });

    return response.data;
  } catch (error) {
    AxiosToastError(error);
  }
};

export default FetchUserDetails;
