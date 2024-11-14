import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";

export async function registerUser(credential) {
  try {
    const response = await axios.post("/api/register", credential);
    return response.data;
  } catch (error) {
    console.log('Error during registration:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      return Promise.reject(error.response.data);
    }

    return Promise.reject({ error: 'Internal Server Error' });
  }
}

export async function loginUser(credentials) {
  try {
    const response = await axios.post('/api/login', credentials);

    await localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data || { error: 'Internal Server Error' };
  }
};

export async function addMentor(mentorData) {
  console.log("Attempting to add mentor with the following data:", mentorData);

  try {
    const response = await axios.post('/api/mentors', mentorData);
    console.log("Response received from server:", response);

    return response.data;
  } catch (error) {
    console.log('Error during adding mentor:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      return Promise.reject(error.response.data);
    }

    console.error('Error message:', error.message);
    return Promise.reject({ error: 'Internal Server Error' });
  }
}

export async function addAdmin(adminData) {
  try {
    const response = await axios.post('/api/admins', adminData);
    return response.data;
  } catch (error) {
    console.log('Error during adding admin:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ error: 'Internal Server Error' });
  }
}

export async function getAdmins() {
  try {
    const response = await axios.get('/api/admins');
    return response.data;
  } catch (error) {
    console.log('Error fetching admins:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ error: 'Internal Server Error' });
  }
}

export async function getMentors() {
  try {
    const response = await axios.get('/api/mentors');
    return response.data;
  } catch (error) {
    console.log('Error fetching mentors:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ error: 'Internal Server Error' });
  }
}
