import axiosInstance from "../axiosInstance";
import API_BASE_URL from "../utils/Constant";

export const UsersApi = {
  /**
   * Fetches all users, optionally filtered by company ID.
   * @param {string|number} [companyId] - Optional company ID to filter users.
   * @returns {Promise<object>}
   */
  getAllUsers: async (companyId = null) => {
    try {
      const params = new URLSearchParams();
      if (companyId) {
        params.append("companyId", companyId);
      }
      const response = await axiosInstance.get(`${API_BASE_URL}/users?${params.toString()}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Fetches a single user by their ID.
   * @param {string|number} id - The ID of the user to fetch.
   * @returns {Promise<object>}
   */
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/users/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },
};
