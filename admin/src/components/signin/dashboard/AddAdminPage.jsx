import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap'; 

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({
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
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAdminData({
        ...adminData,
        photo: URL.createObjectURL(file),
      });
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!adminData.name) newErrors.name = "Name is required.";
    if (!adminData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminData.email)) newErrors.email = "Invalid email format.";
    if (!adminData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(adminData.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!adminData.password) newErrors.password = "Password is required.";
    else if (adminData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const newAdmin = {
        id: Date.now(), 
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
        password: adminData.password,
        photo: adminData.photo,
        joinedDate: formattedDate,
      };

      
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      admins.push(newAdmin);
      localStorage.setItem('admins', JSON.stringify(admins));

      

      
      setAdminData({ name: '', email: '', phone: '', password: '', photo: null });

      setTimeout(() => {
        setShowToast(false); 
        navigate('/admins'); 
      }, 3000);
    } else {
      console.log('Validation errors:', validationErrors);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', padding: '0', width: '100vw' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={adminData.name}
              onChange={handleInputChange}
              placeholder="Enter admin's name"
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
              value={adminData.email}
              onChange={handleInputChange}
              placeholder="Enter admin's email"
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
              value={adminData.phone}
              onChange={handleInputChange}
              placeholder="Enter admin's phone number"
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
              value={adminData.password}
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

          {adminData.photo && (
            <div className="mb-3">
              <img src={adminData.photo} alt="Admin Preview" className="img-fluid" />
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
        <Toast.Body className="text-white">Admin Added Successfully!</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddAdmin;
