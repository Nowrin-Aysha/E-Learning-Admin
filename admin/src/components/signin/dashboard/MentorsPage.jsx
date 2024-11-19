import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card, Navbar, Nav, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const MentorsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedMentor, setEditedMentor] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5001/api/getMentors', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMentors(response.data.data);
    };
    fetchData();
  }, [reload]);

  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
    setEditedMentor({ ...mentor });
    setImagePreview(mentor.photo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(false);
    setSelectedMentor(null);
    setEditedMentor(null);
    setImagePreview(null);
    setErrors({});
  };

  const handleDeleteMentor = (mentorId) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(`http://localhost:5001/api/deleteMentor/${mentorId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.data.error === false) {
          Swal.fire('Deleted!', 'Your mentor has been deleted.', 'success');
          setReload(!reload);
        }
        handleCloseModal();
      }
    });
  };

  const handleEditMentor = () => {
    setEditing(true);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    
    const validationErrors = validateMentor(editedMentor);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

   
    const isEmailUnique = !mentors.some(mentor => mentor.email === editedMentor.email && mentor._id !== selectedMentor._id);
    const isPhoneUnique = !mentors.some(mentor => mentor.phone === editedMentor.phone && mentor._id !== selectedMentor._id);

    if (!isEmailUnique) {
      setErrors(prev => ({ ...prev, email: 'Email is already in use. it must be unique.' }));
      return;
    }

    if (!isPhoneUnique) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be unique.' }));
      return;
    }

    const formData = new FormData();
    formData.append('name', editedMentor.name);
    formData.append('email', editedMentor.email);
    formData.append('phone', editedMentor.phone);
    formData.append('photo', editedMentor.photo);

    try {
      const response = await axios.post(`http://localhost:5001/api/updatementor/${selectedMentor._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error === false) {
        setReload(!reload);
        Swal.fire('Success!', 'Mentor details updated successfully.', 'success');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating mentor:', error);
      Swal.fire('Error!', 'There was an error updating the mentor details.', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMentor({
      ...editedMentor,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedMentor({
          ...editedMentor,
          photo: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateMentor = (mentor) => {
    const errors = {};

    if (!mentor.name || mentor.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (!mentor.email || mentor.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mentor.email)) {
      errors.email = 'Invalid email format';
    }

    if (!mentor.phone || mentor.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(mentor.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    if (!mentor.photo) {
      errors.photo = 'Profile photo is required';
    }

    return errors;
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div
        style={{
          width: '250px',
          backgroundColor: '#001f3d',
          color: '#fff',
          height: '100vh',
          padding: '20px',
          position: 'fixed',
        }}
      >
        <h3>Dashboard</h3>
        <Nav className="flex-column">
          <Nav.Link href="/dashboard" style={{ color: '#fff' }}>
            Dashboard
          </Nav.Link>
          <Nav.Link href="/courses" style={{ color: '#fff' }}>
            Courses
          </Nav.Link>
          <Nav.Link href="/communication" style={{ color: '#fff' }}>
            Communication
          </Nav.Link>
          <Nav.Link href="/revenue" style={{ color: '#fff' }}>
            Revenue
          </Nav.Link>
          <Nav.Link href="/students" style={{ color: '#fff' }}>
            Student Details
          </Nav.Link>
        </Nav>
      </div>

      <div style={{ flex: 1, marginLeft: '250px' }}>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ backgroundColor: '#001f3d' }}>
          <Nav className="ml-auto">
            <Nav.Link href="/add-mentor" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Mentor
            </Nav.Link>
            <Nav.Link href="/add-admin" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Admin
            </Nav.Link>
            <Nav.Link href="/add-course" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Course
            </Nav.Link>
          </Nav>
        </Navbar>

        <div style={{ padding: '20px' }}>
          <h2 className="text-center mb-4">Our Mentors</h2>
          <Row className="my-4">
            {mentors.map((mentor) => (
              <Col key={mentor._id} md={4} className="mb-4">
                <Card>
                  <Card.Body className="text-center">
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleMentorClick(mentor)}
                    >
                      <img
                        src={`http://localhost:5001/${mentor.photo}`}
                        alt={mentor.name}
                        className="img-fluid"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <h6 className="mt-3">{mentor.name}</h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {selectedMentor && (
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Edit Mentor' : selectedMentor.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <img
                    src={`http://localhost:5001/${selectedMentor.photo}` || imagePreview}
                    alt={selectedMentor.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      marginBottom: '20px',
                    }}
                    className="img-fluid"
                  />
                  <h5>{editing ? 'Edit Mentor Information' : selectedMentor.name}</h5>
                </div>
                {editing ? (
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editedMentor.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={editedMentor.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={editedMentor.phone}
                        onChange={handleInputChange}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPhoto">
                      <Form.Label>Profile Photo</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        isInvalid={!!errors.photo}
                      />
                      <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                ) : (
                  <>
                    <p><strong>Email:</strong> {selectedMentor.email}</p>
                    <p><strong>Phone:</strong> {selectedMentor.phone}</p>
                    <p><strong>Joined Date:</strong> {new Date(selectedMentor.joinedDate).toLocaleDateString()}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                {editing ? (
                  <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                ) : (
                  <Button variant="primary" onClick={handleEditMentor}>Edit</Button>
                )}
                <Button variant="danger" onClick={() => handleDeleteMentor(selectedMentor._id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
