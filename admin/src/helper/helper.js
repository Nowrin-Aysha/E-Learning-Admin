import axios from "axios";

// Base URL Configuration
axios.defaults.baseURL = "http://localhost:5001";

// Utility function to handle errors
function handleError(error) {
  console.error("Error:", error);
  if (error.response) {
    console.error("Response data:", error.response.data);
    throw error.response.data;
  }
  throw { error: "Internal Server Error" };
}

/* ================================================
   Admin Services
   ================================================ */

export async function registerAdmin(credential) {
  try {
    const response = await axios.post("/api/admin/register", credential);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function loginAdmin(credentials) {
  try {
    const response = await axios.post("/api/admin/login", credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("data", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchAdmins(token) {
  try {
    const response = await axios.get("/api/admin/getAdmins", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteAdmin(adminId, token) {
  try {
    const response = await axios.post(
      `/api/admin/deleteAdmin/${adminId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateAdmin(selectedAdmin, formData, token) {
  try {
    const response = await axios.put(
      `/api/admin/updateAdmin/${selectedAdmin._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function blockAdmin(adminId, token) {
  try {
    const response = await axios.post(
      `/api/admin/blockAdmin/${adminId}`,
      { isBlocked: true },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function unblockAdmin(adminId, token) {
  try {
    const response = await axios.post(
      `/api/admin/unblockAdmin/${adminId}`,
      { isBlocked: false },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteAdmins(selectedAdmins, token) {
  try {
    const response = await axios.post(
      "/api/admin/deleteAdmins",
      { adminIds: selectedAdmins },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

/* ================================================
   Mentor Services
   ================================================ */

   export async function loginMentor(credentials) {
    try {
      const response = await axios.post("/api/mentor/loginMentor", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("data", JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function registerMentor(credential) {
    try {
      const response = await axios.post("/api/mentor/registerMentor", credential);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  

export async function addMentor(formData) {
  try {
    const response = await axios.post("/api/mentor/addmentor", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchMentors(token) {
  try {
    const response = await axios.get("/api/mentor/getMentors", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchPendingMentorsCount(token) {
  try {
    const response = await axios.get("/api/mentor/pendingMentorsCount", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.pendingMentors;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteMentor(mentorId, token) {
  try {
    const response = await axios.post(
      `/api/mentor/deleteMentor/${mentorId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateMentor(selectedMentor, formData, token) {
  try {
    const response = await axios.put(
      `/api/mentor/updatementor/${selectedMentor._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function blockMentor(mentorId, token) {
  try {
    const response = await axios.post(
      `/api/mentor/blockMentor/${mentorId}`,
      { isBlocked: true },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function unblockMentor(mentorId, token) {
  try {
    const response = await axios.post(
      `/api/mentor/unblockMentor/${mentorId}`,
      { isBlocked: false },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteMentors(selectedMentors, token) {
  try {
    const response = await axios.post(
      "/api/mentor/deleteMentors",
      { mentorIds: selectedMentors },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

/* ================================================
   Course, Media, Payment, and Student Progress
   ================================================ */

   export async function fetchInstructorCourseListService() {
    try {
      const response = await axios.get(`/api/course/get`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function addNewCourseService(formData) {
    try {
      const response = await axios.post(`/api/course/add`, formData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function fetchInstructorCourseDetailsService(id) {
    try {
      const response = await axios.get(`/api/course/get/details/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function updateCourseByIdService(id, formData) {
    try {
      const response = await axios.put(`/api/course/update/${id}`, formData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  /* ================================================
     Media Services
     ================================================ */
  
  export async function mediaUploadService(formData, onProgressCallback) {
    try {
      const response = await axios.post("/media/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function mediaDeleteService(id) {
    try {
      const response = await axios.delete(`/media/delete/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function mediaBulkUploadService(formData, onProgressCallback) {
    try {
      const response = await axios.post("/media/bulk-upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  /* ================================================
     Payment Services
     ================================================ */
  
  export async function createPaymentService(formData) {
    try {
      const response = await axios.post(`/student/order/create`, formData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function captureAndFinalizePaymentService(
    paymentId,
    payerId,
    orderId
  ) {
    try {
      const response = await axios.post(`/student/order/capture`, {
        paymentId,
        payerId,
        orderId,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  /* ================================================
     Student Progress Services
     ================================================ */
  
  export async function fetchStudentBoughtCoursesService(studentId) {
    try {
      const response = await axios.get(`/student/courses-bought/get/${studentId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function getCurrentCourseProgressService(userId, courseId) {
    try {
      const response = await axios.get(
        `/student/course-progress/get/${userId}/${courseId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function markLectureAsViewedService(userId, courseId, lectureId) {
    try {
      const response = await axios.post(
        `/student/course-progress/mark-lecture-viewed`,
        {
          userId,
          courseId,
          lectureId,
        }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export async function resetCourseProgressService(userId, courseId) {
    try {
      const response = await axios.post(
        `/student/course-progress/reset-progress`,
        {
          userId,
          courseId,
        }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
  