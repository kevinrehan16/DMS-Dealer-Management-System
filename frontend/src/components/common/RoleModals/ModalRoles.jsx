import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function ModalRoles({ show, onClose, onSubmit, role, allPermissions }) {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name || "");
      setSelectedPermissions(role.permissions?.map(p => p.id) || []);
    } else {
      setRoleName("");
      setSelectedPermissions([]);
    }
  }, [role]);

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: role?.id,
      name: roleName,
      permissions: selectedPermissions,
    });
  };

  // 🔥 Group permissions by module (last word)
  const groupedPermissions = useMemo(() => {
    const groups = {};

    allPermissions.forEach((perm) => {
      const parts = perm.name.split(" ");
      const module = parts[parts.length - 1]; // inquiry
      const action = parts.slice(0, parts.length - 1).join(" "); // view/create/etc

      if (!groups[module]) {
        groups[module] = [];
      }

      groups[module].push({
        id: perm.id,
        action,
      });
    });

    return groups;
  }, [allPermissions]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{role ? "Update Role" : "Add Role"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              required
            />
          </Form.Group>

          <Form.Label className="fw-bold mb-3">Permissions</Form.Label>

          {Object.keys(groupedPermissions).map((module) => (
            <div key={module} className="permission-group mb-4">
              <h6 className="text-warning text-capitalize border-bottom pb-2">
                {module}
              </h6>

              <Row>
                {groupedPermissions[module].map((perm) => (
                  <Col md={3} key={perm.id}>
                    <Form.Check
                      type="checkbox"
                      label={perm.action}
                      checked={selectedPermissions.includes(perm.id)}
                      onChange={() => handlePermissionChange(perm.id)}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ))}

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="warning">
              {role ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}