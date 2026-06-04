import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table, Badge } from 'react-bootstrap'
import { FaSearch, FaUserTie, FaBalanceScale, FaUserTimes, FaUserCheck, FaUserSlash, FaMotorcycle, FaUserSecret, 
FaUserAltSlash, FaRegCalendarCheck, FaCalendarAlt } from 'react-icons/fa'
import { CircularProgress } from '@mui/material'
import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

import { useInquiry, useUpdateBulkStatus } from '../../hooks/HooksInquiry/useInquiry'

import ModalCompare from '../../components/common/EvaluationModals/ModalCompare'

import { dateFormat, timeFormat } from '../../utils/formatters'

function AdminEvaluation() {
  const [stats, setStats] = useState('APPROVED');
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

  const handleShowModalCompare = (appID, invID, inqID) => {
    setApplicationId(appID);
    setInvestigationId(invID);
    setShowModalCompare(true);

    setSelectedItems((prev) => {
    // RULE 1: Kung may isang ID na at same ID ang pinindot, hayaan lang (stay as is)
    if (prev.length === 1 && prev[0] === inqID) {
      return prev; 
    }

    // RULE 2 & 3: 
    // - Kung may isang ID pero different (Replace)
    // - Kung more than 1 ang laman (Clear all then Add new)
    // Sa parehong senaryo, ang kailangan lang ay gawing [inqID] ang array.
    return [inqID];
  });
  }

  const handleCloseModalCompare = () => {
    setSelectedItems([]);
    setShowModalCompare(false);
  }

  const { mutate: updateBulkStatus, isPending: isUpdating } = useUpdateBulkStatus();
  const handleBulkUpdateStatus = async (newStatus) => {
    if (selectedItems.length === 0) return;

    const confirmAction = window.confirm(`Update status to ${newStatus}?`);
    if (!confirmAction) return;

    // Dito natin ipapasa ang payload
    setStats(newStatus);
    const payload = {
      ids: selectedItems,
      status: newStatus
    };
    // TAWAGIN ANG MUTATE
    updateBulkStatus(payload, {
      onSuccess: () => {
        handleCloseModalCompare();
        setSelectedItems([]);
        setStats("APPROVED");
      },
      onError: (error) => {
        // Dito papasok kapag nag-fail ang request
        console.log("Error updating status:", error);
        setStats("APPROVED");
      }
    });
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaUserTie size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">ADMIN EVALUATION</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Manager's Approval Management</small>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
            <span className="small fw-medium text-muted me-2">{selectedItems.length} selected</span>
            
            <Button 
              size="md" 
              variant="success" 
              disabled={selectedItems.length === 0 || isUpdating}
              className="rounded px-4 fw-medium shadow-sm d-flex align-items-center gap-2 border-0 text-white"
              onClick={() => handleBulkUpdateStatus('APPROVED')}
            >
              {isUpdating && stats === 'APPROVED' ? 
                (<><CircularProgress size={10} color="inherit" /> Applying...</>)
                :
                (<><FaUserCheck /> Approve</>)
              }
            </Button>
            
            <Button
              size="md"
              variant="danger"
              disabled={selectedItems.length === 0 || isUpdating}
              className="rounded px-4 fw-medium shadow-sm d-flex align-items-center gap-2 border-0 text-white"
              onClick={() => handleBulkUpdateStatus('DISAPPROVED')}
            >
              {isUpdating && stats === 'DISAPPROVED' ? 
                (<><CircularProgress size={10} color="inherit" /> Applying...</>)
                :
                (<><FaUserSlash /> Disapprove</>)
              }
            </Button>
            
            <Button
              size="md"
              variant="warning"
              disabled={selectedItems.length === 0 || isUpdating}
              className="rounded px-4 fw-medium shadow-sm d-flex align-items-center gap-2 border-0 text-white"
              onClick={() => handleBulkUpdateStatus('REASSESS')}
            >
              {isUpdating && stats === 'REASSESS' ? 
                (<><CircularProgress size={10} color="inherit" /> Applying...</>)
                :
                (<><FaUserTimes /> Reassess</>)
              }
            </Button>
          </div>
          
        </div>
      </div>

      {/* FILTER & TABLE AREA */}
      <div className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
        <div className="bg-white rounded-3 shadow-sm border d-flex flex-column h-100 overflow-hidden">
          <div className="px-2 py-2 bg-light border-bottom">
            <Row className="g-2 align-items-center">
              {/* SEARCH INPUT */}
              <Col md={4} className="d-flex">
                <InputGroup className="bg-white rounded border shadow-none" style={{ height: '38px' }}>
                  <InputGroup.Text className="bg-transparent border-0 pe-1">
                    <FaSearch className="text-primary" size={14} />
                  </InputGroup.Text>
                  <Form.Control 
                    className="border-0 shadow-none small" 
                    placeholder="Search..." 
                    style={{ fontSize: '14px' }}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                <Form.Select 
                  size="md" 
                  value={filters.status || ''} 
                  style={{ fontSize: '14px', height: '38px' }}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="">--Filter by Status--</option>
                  <option value="FOR_APPROVAL">For Approval</option>
                  <option value="APPROVED">Approved</option>
                  <option value="DISAPPROVED">Disapproved</option>
                  <option value="REASSESS">Reassess</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                </Col>
                <Col md={4}>
                  <div 
                    className="d-flex align-items-center bg-white rounded px-3 border border-secondary-subtle w-100" 
                    style={{ height: '38px' }}
                  >
                    <FaCalendarAlt className="text-primary me-2" size={30}/>
                    <Form.Control 
                      type="date" 
                      className="bg-transparent border-0 shadow-none p-0 small" 
                      style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                      // value={filters.from_date} 
                      // onChange={(e) => setFilters({...filters, from_date: e.target.value})}
                    />
                    <span className="text-muted mx-2">|</span>
                    <Form.Control 
                      type="date" 
                      className="bg-transparent border-0 shadow-none p-0 small" 
                      style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                      // value={filters.to_date} 
                      // onChange={(e) => setFilters({...filters, to_date: e.target.value})}
                    />
                  </div>
                </Col>
            </Row>
          </div>
          <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}>
            <Table hover className="align-middle mb-0" style={{ minWidth: '1100px' }}>
              <thead className="bg-dark text-white sticky-top" style={{ zIndex: 10 }}>
                <tr className="small text-uppercase fw-bold" style={{ fontSize: '12px' }}>
                  <th width='3%' className='text-center ps-2 py-3'>
                    <div className="checkbox-design-wrapper p-0">
                      <Form>
                        <Form.Check
                          type="checkbox"
                          className="custom-check-shadow"
                          onChange={handleSelectAll}
                          checked={inquiries.length > 0 && selectedItems.length === inquiries.length}
                        />
                      </Form>
                    </div>
                  </th>
                  <th width='20%' className="ps-2 py-3">Customer Information</th>
                  <th width='25%' className="ps-2 py-3">Motorcycle Unit</th>
                  <th width='20%' className="ps-2 py-3">Investigator</th>
                  <th width='13%' className="ps-2 py-3">C.I Date</th>
                  <th width='12%' className='text-center ps-2 py-3'>Status</th>
                  <th width='10%' className='text-center ps-2 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, index) => (
                    <SkeletonRowLoading key={index} columns={7} />
                  ))
                ) : (
                  inquiries?.map((row, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <div className="checkbox-design-wrapper">
                          <Form.Check 
                            type="checkbox" 
                            className="custom-check-shadow"
                            checked={selectedItems.includes(row.id)}
                            onChange={() => handleSelectItem(row.id)}
                          />
                        </div>
                      </td>
                      <td className="ps-2 py-2">
                        <div className="fw-bold text-primary mb-0" style={{ fontSize: '14px' }}>{row.customer.firstName} {row.customer.lastName}</div>
                        <div className="text-secondary fw-medium" style={{ fontSize: '11px' }}>ID-{row.inquiry_id}</div>
                      </td>
                      <td className="text-dark small" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border ${row.unit_type === 'Brand_New' ? 'border-success-subtle bg-success-subtle text-success' : 'border-danger-subtle bg-danger-subtle text-danger'}`}>
                            <FaMotorcycle size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{row.motorBrand} {row.motorModel}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{row.motorColor}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {row?.investigator?.firstName ? (
                          <>
                          <div className="d-flex align-items-center gap-1 fw-normal mb-0" style={{ fontSize: '14px' }}>
                            <FaUserSecret size={12} className='text-dark' />  {row?.investigator?.firstName} {row?.investigator?.lastName}
                          </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex align-items-center text-secondary gap-1 mb-0" style={{ fontSize: '14px' }}>
                            <FaUserAltSlash size={14} className='text-secondary' />  Unassigned
                          </div>
                          </>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border 'border-secondary-subtle bg-secondary-subtle text-secondary`}>
                              <FaRegCalendarCheck size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{dateFormat(row.date_creditinvestigation)}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{timeFormat(row.time_creditinvestigation)}</div>
                          </div>
                        </div>  
                      </td>
                      <td>
                        {/* Status Badge na may mas malinis na style */}
                        <div className="d-flex flex-column align-items-center">
                          <Badge 
                              bg={row.inquiry_status === 'APPROVED' ? 'success' : row.inquiry_status === 'DISAPPROVED' ? 'danger' : row.inquiry_status === 'REASSESS' ? 'warning' : 'info'} 
                              className="rounded-pill px-3 py-1 shadow-sm"
                              style={{ fontSize: '10px', letterSpacing: '0.5px', width: '100%', textAlign: 'center' }}
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
                          onClick={()=>handleShowModalCompare(row.customer.credit_application.id, row.credit_investigation.id, row.id)}
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
              <div 
                className="w-100 d-flex flex-column justify-content-center align-items-center" 
                style={{ minHeight: '400px' }} // Gawin mong mas malaki ang value para mas bumaba sa gitna
              >
                <div className="text-center text-muted">
                  <FaSearch size={80} className="mb-3 opacity-25" />
                  <h5>No Results Found</h5>
                  <p className="mb-0">No transactions found matching your filters.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalCompare 
        show={showModalCompare}
        handleClose={handleCloseModalCompare}
        applicationId={applicationId}
        investigationId={investigationId}
        onUpdateStatus={handleBulkUpdateStatus}
        isUpdating={isUpdating}
        stats={stats}
      />

    </div>
  )
}

export default AdminEvaluation
