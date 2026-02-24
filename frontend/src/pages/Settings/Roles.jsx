import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { FaSearch, FaUserShield, FaUserPlus } from 'react-icons/fa'
import "../../assets/css/Roles.css"
import ModalRoles from '../../components/common/RoleModals/ModalRoles'
import { fetchWithRetry } from '../../utils/network'
import { formatUpperCase } from '../../utils/formatters'

const Roles = () => {

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token'); 

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const getRoles = await fetchWithRetry(`${API_URL}/settings/roles`, {
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }, 3, 1000, 'Roles');
      
      // console.log(getRoles.data.permissions);
      setRoles(getRoles.data.roles);
      setPermissions(getRoles.data.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  // Open modal to add
  const handleAddRole = () => {
    setEditingRole(null);
    setModalOpen(true);
  };

  // Open modal to edit
  const handleEditRole = (role) => {
    setEditingRole(role);
    setModalOpen(true);
  };

  // Handle submit from modal
  const handleSubmitRole = (formData) => {
    if (formData.id) {
      console.log("Update role:", formData);
      // Call API to update
    } else {
      console.log("Add role:", formData);
      // Call API to add
    }
    setModalOpen(false);
  };

  useEffect(() => {
    fetchRoles();
  }, [token, API_URL]);

  return (
    <div>
      <div className="ci-header">
        <h4>USERS ROLES</h4>
      </div>

      <div className="ci-page">
        <Row>
          <Col md={12}>
            <Form className="filter-form">
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search user roles..."
                      />
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Button 
                    className='d-flex align-items-center gap-1 btn btn-primary'
                    onClick={handleAddRole}
                  >
                    <FaUserPlus /> Add Role
                  </Button>
                </Col>

              </Row>
            </Form>
          </Col>
        </Row>
        
        <div className="roles-container mt-3">
          {roles.map((role) => {
            // Group role's permissions by module
            const grouped = {};
            role.permissions.forEach((p) => {
              const parts = p.name.split(" ");
              const module = parts[parts.length - 1]; // e.g. 'inquiry'
              const action = parts.slice(0, parts.length - 1).join(" "); // e.g. 'view'

              if (!grouped[module]) grouped[module] = [];
              grouped[module].push(action);
            });

            return (
              <div key={role.id} className="role-card">
                <div className="role-header">
                  <FaUserShield className="role-icon" />
                  <h4 className="role-name">{formatUpperCase(role.name)}</h4>
                </div>

                <div className="permissions-list">
                  {Object.keys(grouped).map((module) => (
                    <div key={module} className="permission-group mb-3">
                      <h6 className="text-warning text-capitalize border-bottom pb-1">
                        {module}
                      </h6>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {grouped[module].map((action, index) => (
                          <span key={index} className="permission-badge active">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <ModalRoles
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitRole}
        role={editingRole}
        allPermissions={permissions}
      />

    </div>
  )
}

export default Roles
