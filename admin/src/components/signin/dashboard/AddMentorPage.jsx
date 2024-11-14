import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import axios from 'axios';


const AddMentor = () => {
  const [mentorData, setMentorData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setMentorData({
        ...mentorData,
        photo: file,
      });
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!mentorData.name) newErrors.name = "Name is required.";
    if (!mentorData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mentorData.email)) newErrors.email = "Invalid email format.";
    if (!mentorData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(mentorData.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!mentorData.password) newErrors.password = "Password is required.";
    else if (mentorData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('name', mentorData.name);
      formData.append('email', mentorData.email);
      formData.append('phone', mentorData.phone);
      formData.append('password', mentorData.password);
      formData.append('photo', mentorData.photo);

      try {
        const response = await axios.post('http://localhost:5001/api/addmentor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
      console.log(response);
      

        if (response.status === 200) {
          setShowToast(true);
          setMentorData({ name: '', email: '', phone: '', password: '', photo: null });

          setTimeout(() => {
            setShowToast(false);
            console.log('Navigating to /mentors');
            navigate('/mentors');
          }, 3000);
        } 
      } catch (error) {
        console.error('Error adding mentor:', error);
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', padding: '0', width: '100vw' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Add Mentor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={mentorData.name}
              onChange={handleInputChange}
              placeholder="Enter mentor's name"
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={mentorData.email}
              onChange={handleInputChange}
              placeholder="Enter mentor's email"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={mentorData.phone}
              onChange={handleInputChange}
              placeholder="Enter mentor's phone number"
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={mentorData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Upload Photo (Optional)</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              onChange={handlePhotoUpload}
            />
          </div>

          {mentorData.photo && (
            <div className="mb-3">
              <img src={URL.createObjectURL(mentorData.photo)} alt="Mentor Preview" className="img-fluid" />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#001f3d' }}
          >
            Add Now
          </button>
        </form>
      </div>

      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        className="position-fixed bottom-0 end-0 m-3" 
        bg="success"
        delay={3000} 
        autohide
      >
        <Toast.Body className="text-white">Mentor Added Successfully!</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddMentor;
