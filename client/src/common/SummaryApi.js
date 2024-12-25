export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  logout: {
    url: "/api/user/logout",
    method: "GET",
  },
  forgotpassword: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "PUT",
  },
  resetpassword: {
    url: "/api/user/reset-password",
    method: "PUT",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "POST",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "GET",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "PUT",
  },
  updateProfile: {
    url: "/api/user/update-user",
    method: "PUT",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "POST",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "POST",
  },
  getCategory: {
    url: "/api/category/get-category",
    method: "GET",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "PUT",
  },
  deleteCategory: {
    url: "/api/category/delete-category",
    method: "DELETE",
  },
  createSubCategory: {
    url: "/api/subcategory/create",
    method: "POST",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "get",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "POST",
  },
  updateProduct: {
    url: "/api/product/update-product-details",
    method: "PUT",
  },
  deleteProduct: {
    url: "/api/product/delete-product",
    method: "DELETE",
  },
  getProductByCategory: {
    url: "/api/subcategory/get-product-by-category",
    method: "get",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-pruduct-by-category-and-subcategory",
    method: "get",
  },
  getProductDetail: {
    url: "/api/product/get-product-details",
    method: "get",
  },
  getProduct: {
    url: "/api/product/get",
    method: "GET",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "POST",
  },
};

export default SummaryApi;
