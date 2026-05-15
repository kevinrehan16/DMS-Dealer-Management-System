import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table, Badge } from 'react-bootstrap'
import { FaSearch, FaUserTie, FaBalanceScale, FaUserTimes, FaUserCheck, FaUserSlash, FaMotorcycle } from 'react-icons/fa'
import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

import { useInquiry, useUpdateBulkStatus } from '../../hooks/HooksInquiry/useInquiry'

import ModalCompare from '../../components/common/EvaluationModals/ModalCompare'

import { dateFormat, timeFormat } from '../../utils/formatters'
import axios from 'axios'

function AdminEvaluation() {
  const [applicationId, setApplicationId] = useState(null);
  const [investigationId, setInvestigationId] = useState(null);
  const [showModalCompare, setShowModalCompare] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = inquiries.map(row => row.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };
  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const [filters, setFilters] = useState(
    { 
      search: '', 
      filterBy: '',
      status: ''
    }
  );
  const { data: inquiries = [], isLoading, isError, error, refetch, isFetching } = useInquiry({
    ...filters,
    status: filters.status === '' ? ['FOR_APPROVAL', 'APPROVED', 'DISAPPROVED', 'REASSESS'] : filters.status
  });

  const handleShowModalCompare = (appID, invID) => {
    setApplicationId(appID);
    setInvestigationId(invID);
    setShowModalCompare(true);
  }

  const handleCloseModalCompare = () => {
    setShowModalCompare(false);
  }

  const { mutate: updateBulkStatus, isLoading: isUpdating } = useUpdateBulkStatus();
  const handleBulkUpdateStatus = async (newStatus) => {
    if (selectedItems.length === 0) return;

    const confirmAction = window.confirm(`Update status to ${newStatus}?`);
    if (!confirmAction) return;

    try {
      // Dito natin ipapasa ang payload
      const payload = {
        ids: selectedItems,
        status: newStatus
      };
      // TAWAGIN ANG MUTATE
      updateBulkStatus(payload);
      
      setSelectedItems([]);
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      <div className="page-header d-flex align-items-center justify-content-between mb-3">
        <h4 className='m-0 d-flex align-items-center gap-2'>
          <FaUserTie className='fs-4'/> ADMIN EVALUATION
        </h4>

        {/* Right: Actions */}
        <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
          <span className="small fw-medium text-muted me-2">{selectedItems.length} selected</span>
          
          <Button 
            size="sm" 
            variant="success" 
            disabled={selectedItems.length === 0}
            className="d-flex align-items-center gap-1"
            onClick={() => handleBulkUpdateStatus('APPROVED')}
          >
            <FaUserCheck /> Approve
          </Button>
          
          <Button
            size="sm"
            variant="danger"
            disabled={selectedItems.length === 0}
            className="d-flex align-items-center gap-1"
            onClick={() => handleBulkUpdateStatus('DISAPPROVED')}
          >
            <FaUserSlash /> Disapprove
          </Button>
          
          <Button
            size="sm"
            variant="warning"
            disabled={selectedItems.length === 0}
            className="d-flex align-items-center gap-1 text-white"
            onClick={() => handleBulkUpdateStatus('REASSESS')}
          >
            <FaUserTimes /> Reassess
          </Button>
        </div>
      </div>

      <div className="content-page">
        <Row>
          <Col md={4}>
            <Form className="filter-form">
              <Form.Group controlId="search">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search customer..."
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col md={3}>
            <Form.Select 
              size="md" 
              value={filters.status || ''} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">--Filter by Status--</option>
              <option value="FOR_APPROVAL">Status: For Approval</option>
              <option value="APPROVED">Status: Approved</option>
              <option value="DISAPPROVED">Status: Disapproved</option>
              <option value="REASSESS">Status: Reassess</option>
            </Form.Select>
          </Col>
        </Row>
        <div className="table-section mt-3">
          <Table hover bordered className="align-middle mb-0" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th width='3%' className='text-center'>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={inquiries.length > 0 && selectedItems.length === inquiries.length}
                    />
                  </Form>
                </th>
                <th width='25%'>Customer Information</th>
                <th width='30%'>Brand/Model/Color</th>
                <th width='23%'>Investigator</th>
                <th width='12%' className='text-center'>Status</th>
                <th width='10%' className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <SkeletonRowLoading key={index} columns={8} />
                ))
              ) : (
                inquiries?.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-bottom ${selectedItems.includes(row.id) ? 'bg-light-blue' : ''}`}
                    style={{ transition: '0.3s' }}
                  >
                    <td className="text-center">
                      <Form.Check 
                        type="checkbox" 
                        checked={selectedItems.includes(row.id)}
                        onChange={() => handleSelectItem(row.id)}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{row.customer.firstName} {row.customer.lastName}</div>
                      <div className="text-muted extra-small" style={{ fontSize: '11px' }}><b>Inquiry ID</b>: {row.inquiry_id}</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaMotorcycle className="me-2 text-secondary" size={18} />
                        <div>
                          <div className="fw-medium">{row.motorBrand} {row.motorModel}</div>
                          <small className="text-muted"><b>Color</b>: {row.motorColor}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center text-muted">
                        <FaUserSlash className="me-2" />
                        <span>{row.investigator_name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td>
                      {/* Status Badge na may mas malinis na style */}
                      <div className="d-flex flex-column align-items-center">
                        <Badge 
                            bg={row.inquiry_status === 'APPROVED' ? 'success' : row.inquiry_status === 'DISAPPROVED' ? 'danger' : row.inquiry_status === 'REASSESS' ? 'warning' : 'info'} 
                            className="rounded-pill px-3 py-1"
                            style={{ fontSize: '10px', letterSpacing: '0.5px', width: '100px', textAlign: 'center' }}
                        >
                          {row.inquiry_status || 'FOR APPROVAL'}
                        </Badge>
                        <small className="text-muted mt-1" style={{ fontSize: '10px' }}>
                          Updated 2h ago
                        </small>
                      </div>
                    </td>
                    <td className="text-center">
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="text-primary border shadow-sm"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          borderRadius: '6px'
                        }}
                        title="Compare Informations"
                        onClick={()=>handleShowModalCompare(row.customer.credit_application.id, row.credit_investigation.id)}
                      >
                        <FaBalanceScale size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          
          {!isLoading && inquiries?.length === 0 && (
            <div className="text-center p-5 text-muted">
              <FaSearch size={40} className="mb-3 opacity-25" />
              <p>No transactions found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      <ModalCompare 
        show={showModalCompare}
        handleClose={handleCloseModalCompare}
        applicationId={applicationId}
        investigationId={investigationId}
      />

    </div>
  )
}

export default AdminEvaluation
