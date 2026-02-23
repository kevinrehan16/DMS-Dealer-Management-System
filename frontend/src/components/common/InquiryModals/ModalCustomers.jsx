import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Table, Form, InputGroup } from 'react-bootstrap'
import { FaTimes, FaSearch, FaUserPlus, FaUserCheck, FaIdCard, FaEdit } from "react-icons/fa";

import { useInquiry } from '../../../context/InquiryContext/InquiryContext.js';
// debounce ginagamit to para idelay ang pag send ng API para hindi sunod-sunod and reques na nagkocause ng ERROR CODE 429
import debounce from 'lodash.debounce'; 
import { fetchWithRetry } from '../../../utils/network.js';
import ModalCustomerForm from './ModalCustomerForm.jsx';

const ModalCustomers = ({show, handleClose}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  
  const { handleCustomerSelect } = useInquiry();
  const [customers, setCustomers] = useState([]);
  
  const [showModalNewCustomer, setShowModalNewCustomer] = useState(false);
  const handleShowNewCustomer = () => setShowModalNewCustomer(true);
  const handleCloseNewCustomer = () => {
    // clearFormCustomerData();
    setShowModalNewCustomer(false);
  }

  const fetchCustomers = async () => {
    try {
      const response = await fetchWithRetry(`${API_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }, 3, 1000, 'Customers');
      setCustomers(response.data.customers);

      // console.log("Fetched inquiries:", response.data.inquiries);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='md' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8} sm={8}>
              <Form>
                <Form.Group className="mb-3 position-relative">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search information..."
                    />
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
            <Col md={4} sm={4}>
              <Button variant="success" className="d-flex align-items-center justify-content-center gap-1 w-100" onClick={handleShowNewCustomer}>
                <FaUserPlus /> Customer
              </Button>
            </Col>
          </Row>
          <div className="table-section">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th width="30%">Customer ID</th>
                  <th width="35%">Customer Name</th>
                  <th width="25%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers && customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td className="d-flex gap-2">
                      <Button variant="success" size="sm" className="align-items-center justify-content-center" 
                      onClick={() => { handleCustomerSelect(customer); handleClose(); }}
                      title="Select this customer">
                        <FaUserCheck />
                      </Button>
                      <Button variant="info" size="sm" className="align-items-center justify-content-center" title="View this customer">
                        <FaIdCard className="text-white" />
                      </Button>
                      <Button variant="primary" size="sm" className="align-items-center justify-content-center" title="Edit this customer">
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} className="d-flex align-items-center justify-content-evenly">
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalCustomerForm
        show={showModalNewCustomer}
        handleClose={handleCloseNewCustomer}
        fetchCustomers={fetchCustomers}
      />
    </div>
  )
}

export default React.memo(ModalCustomers);