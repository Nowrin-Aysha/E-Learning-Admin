import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card, Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins);
  }, []);

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setEditedAdmin({ ...admin });
    setImagePreview(admin.photo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(false);
    setSelectedAdmin(null);
    setEditedAdmin(null);
    setImagePreview(null);
  };

  const handleDeleteAdmin = (adminId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAdmins = admins.filter((admin) => admin.id !== adminId);
        localStorage.setItem('admins', JSON.stringify(updatedAdmins));
        setAdmins(updatedAdmins);
        Swal.fire('Deleted!', 'Your admin has been deleted.', 'success');
        handleCloseModal();
      }
    });
  };

  const handleEditAdmin = () => {
    setEditing(true);
  };

  const handleSaveChanges = () => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === editedAdmin.id ? editedAdmin : admin
    );
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setAdmins(updatedAdmins);
    Swal.fire('Success!', 'Admin details updated successfully.', 'success');
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin({
      ...editedAdmin,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedAdmin({
          ...editedAdmin,
          photo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
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
          <Nav.Link href="/dashboard" style={{ color: '#fff' }}>Dashboard</Nav.Link>
          <Nav.Link href="/courses" style={{ color: '#fff' }}>Courses</Nav.Link>
          <Nav.Link href="/communication" style={{ color: '#fff' }}>Communication</Nav.Link>
          <Nav.Link href="/revenue" style={{ color: '#fff' }}>Revenue</Nav.Link>
          <Nav.Link href="/students" style={{ color: '#fff' }}>Student Details</Nav.Link>
        </Nav>
      </div>

      <div style={{ flex: 1, marginLeft: '250px' }}>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ backgroundColor: '#001f3d' }}>
          <Nav className="ml-auto">
            <Nav.Link href="/add-admin" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Admin
            </Nav.Link>
            <Nav.Link href="/add-mentor" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Mentor
            </Nav.Link>
            <Nav.Link href="/add-course" className="btn btn-primary mx-2" style={{ backgroundColor: '#001f3d' }}>
              Add Course
            </Nav.Link>
          </Nav>
        </Navbar>

        <div style={{ padding: '20px' }}>
          <h2 className="text-center mb-4">Our Admins</h2>

          <Row className="my-4">
            {admins.map((admin) => (
              <Col key={admin.id} md={4} className="mb-4">
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
                      onClick={() => handleAdminClick(admin)}
                    >
                      <img src={admin.photo || 'https://robohash.org/AdminDefault.png?size=200x200&set=set3'} alt={admin.name} className="img-fluid" />
                    </div>
                    <h6 className="mt-3">{admin.name}</h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {selectedAdmin && (
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Edit Admin' : selectedAdmin.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <img
                    src={imagePreview || selectedAdmin.photo}
                    alt={selectedAdmin.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      marginBottom: '20px',
                    }}
                    className="img-fluid"
                  />
                  <h5>{editing ? 'Edit Admin Information' : selectedAdmin.name}</h5>
                </div>
                {editing ? (
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editedAdmin.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={editedAdmin.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={editedAdmin.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={editedAdmin.password}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhoto">
                      <Form.Label>Profile Photo</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                  </Form>
                ) : (
                  <>
                    <p><strong>Email:</strong> {selectedAdmin.email}</p>
                    <p><strong>Phone:</strong> {selectedAdmin.phone}</p>
                    <p><strong>Password:</strong> {selectedAdmin.password}</p>
                    <p><strong>Joined Date:</strong> {new Date(selectedAdmin.joinedDate).toLocaleDateString()}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                {editing ? (
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleEditAdmin}>
                    Edit
                  </Button>
                )}
                <Button variant="danger" onClick={() => handleDeleteAdmin(selectedAdmin.id)}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminsPage;
