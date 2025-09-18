// // app/lib/cleanerReviewApi.js
// // import API_BASE_URL from "../utils/Constant";
// const API_BASE = "https://safai-index-backend.onrender.com/api";
// import axiosInstance from "../axiosInstance";

// // src/lib/api/cleanerReviewApi.js
// import API_BASE_URL from "../utils/Constant";

// export const CleanerReviewApi = {
//   //The status to filter by (e.g., 'ongoing', 'completed').

//   getAllCleanerReviews: async () => {
//     try {
//       const res = await axiosInstance(`${API_BASE}/cleaner-reviews`, {
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch cleaner reviews");
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching cleaner reviews:", error);
//       return [];
//     }
//   },

  
//   getReviewsByStatus: async (status) => {
//     try {
//       const response = await axiosInstance.get(
//         `${API_BASE_URL}/cleaner-reviews?status=${status}`
//       );
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error(`Error fetching '${status}' reviews:`, error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },
// };



// second update 

// // src/lib/api/cleanerReviewApi.js
// import axiosInstance from "../axiosInstance";
// import API_BASE_URL from "../utils/Constant";

// export const CleanerReviewApi = {
//   /**
//    * Fetches all cleaner reviews with optional filtering.
//    * @param {object} params - The filter parameters.
//    * @param {string} [params.status] - The status to filter by (e.g., 'ongoing', 'completed').
//    * @param {string|number} [params.cleanerId] - The ID of the cleaner to filter by.
//    * @returns {Promise<object>}
//    */
//   getAllCleanerReviews: async (params = {}) => {
//     try {
//       const queryParams = new URLSearchParams();
//       if (params.status) {
//         queryParams.append("status", params.status);
//       }
//       if (params.cleanerId) {
//         queryParams.append("cleaner_user_id", params.cleanerId);
//       }
      
//       const response = await axiosInstance.get(`${API_BASE_URL}/cleaner-reviews?${queryParams.toString()}`);
      
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error fetching cleaner reviews:", error);
//       return {
//         success: false,
//         error: error.response?.data?.message || error.message,
//       };
//     }
//   },

//   // This function is still useful for simpler calls, like on the dashboard.
//   getReviewsByStatus: async (status) => {
//     try {
//       const response = await axiosInstance.get(`${API_BASE_URL}/cleaner-reviews?status=${status}`);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error(`Error fetching '${status}' reviews:`, error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },
// };




// src/lib/api/cleanerReviewApi.js
import axiosInstance from "../axiosInstance";
import API_BASE_URL from "../utils/Constant";

export const CleanerReviewApi = {
  /**
   * Fetches all cleaner reviews with optional filtering.
   * @param {object} params - The filter parameters.
   * @param {string} [params.status] - The status to filter by (e.g., 'ongoing', 'completed').
   * @param {string|number} [params.cleanerId] - The ID of the cleaner to filter by.
   * @param {string} [params.date] - The date to filter by (format: YYYY-MM-DD).
   * @returns {Promise<object>}
   */
  getAllCleanerReviews: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.status) {
        queryParams.append("status", params.status);
      }
      if (params.cleanerId) {
        queryParams.append("cleaner_user_id", params.cleanerId);
      }
      if (params.date) {
        queryParams.append("date", params.date);
      }
      
      const response = await axiosInstance.get(`${API_BASE_URL}/cleaner-reviews?${queryParams.toString()}`);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching cleaner reviews:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  getReviewsByStatus: async (status) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/cleaner-reviews?status=${status}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(`Error fetching '${status}' reviews:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
