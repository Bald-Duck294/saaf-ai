import axiosInstance from "../axiosInstance";
import API_BASE_URL from "../utils/Constant";

export const AssignmentsApi = {
  /**
   * Creates a new cleaner assignment.
   * @param {object} assignmentData - The data for the new assignment.
   * @returns {Promise<object>}
   */
  createAssignment: async (assignmentData) => {
    console.log("in create assighments" , assignmentData);
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/assignments`, assignmentData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error creating assignment:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Fetches all cleaner assignments.
   * @returns {Promise<object>}
   */
  getAllAssignments: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/assignments`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching assignments:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  // You can add getById, update, and delete methods here following the same pattern
};
