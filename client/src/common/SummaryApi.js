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
};

export default SummaryApi;
