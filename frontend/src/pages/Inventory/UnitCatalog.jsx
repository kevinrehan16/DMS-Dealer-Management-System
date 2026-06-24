import React, { useState, useEffect } from 'react'
import "../../assets/css/Cashier.css"

import { Row, Col, Form, InputGroup, Button, Table, Badge, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBookOpen, FaCalendarAlt, FaFileExport,FaPlus, FaEllipsisV, FaMotorcycle, FaEye,
          FaEdit, FaTrash, FaFileInvoiceDollar } from 'react-icons/fa';

import { useUnitCatalog } from '../../hooks/HooksInventory/useInventory';

import { formatAmount } from '../../utils/formatters' 

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

import ModalUnitCatalog from '../../components/common/InventoryModals/ModalUnitCatalog';

function UnitCatalog() {
  const { data: unit_catalog, isLoading, isError } = useUnitCatalog();

  const [actionMotorcycleId, setActionMotorcycleId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const [showModalCatalog, setShowModalCatalog] = useState(false);
  const [motorcycleId, setMotorcycleId] = useState(null);

  const handleModalCatalog = (motorcycleId) => {
    setShowModalCatalog(true);
    setMotorcycleId(motorcycleId);
  }

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaBookOpen size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">UNIT CATALOG</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Manage unit catalog and specifications</small>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
            <div className="d-flex gap-2 align-items-center">
              <Button size="md"  variant="outline-secondary" className="border-0 fw-bold d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button 
                onClick={()=> handleModalCatalog(null)}
                size="md" 
                variant="primary" 
                className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
                <FaPlus /> NEW CATALOG
              </Button>
            </div>
            
          </div>
          
        </div>
      </div>

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
                  style={{ fontSize: '14px', height: '38px' }}
                >
                  <option value="">--Filter by Status--</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Loaned">Loaned</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Maintenance">Maintenance</option>
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
                  <th width='29%' className="ps-3 py-3">Motorcycle Unit</th>
                  <th width='11%' className="text-end ps-3 py-3">Cash Price</th>
                  <th width='11%' className="text-end ps-3 py-3">Original Price</th>
                  <th width='11%' className="text-end ps-3 py-3">Unit Cost</th>
                  <th width='11%' className="text-end ps-2 py-3">SRP Value</th>
                  <th width='12%' className="text-end ps-2 py-3">Installment Price</th>
                  <th width='8%' className="text-center ps-2 py-3">Interest</th>
                  <th width='8%' className='text-center ps-2 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => <SkeletonRowLoading key={i} columns={8} />)
                ) : isError ? (
                  <tr>
                    <td colSpan="10" className="text-center text-danger py-4">
                      Error loading Unit Catalog data.
                    </td>
                  </tr>
                ) : unit_catalog.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      No Unit Catalog data available.
                    </td>
                  </tr>
                ) : (
                  unit_catalog?.map((uc) => (
                    <tr key={uc.id}>
                      <td className="ps-3 py-2">
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border 'border-success-subtle bg-success-subtle text-success'`}>
                            <FaMotorcycle size={16} className='text-success' />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{uc.brand}</div>
                            <div className="fw-medium text-dark mb-0" style={{ fontSize: '11px' }}>{uc.model_name}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{uc.color}</div>
                          </div>
                        </div>
                      </td>

                      {/* CASH PRICE COLUMN */}
                      <td className="ps-2 py-2 text-end">
                          <span className="fw-medium font-monospace" style={{ fontSize: "15px" }}>₱{formatAmount(uc.cash_price || 0)}</span>
                      </td>

                      {/* ORIGINAL PRICE COLUMN */}
                      <td className="ps-2 py-2 text-end">
                          <span className="fw-medium font-monospace" style={{ fontSize: "15px" }}>₱{formatAmount(uc.original_price || 0)}</span>
                      </td>

                      {/* UNIT COST COLUMN */}
                      <td className="ps-2 py-2 text-end">
                          <span className="fw-medium font-monospace" style={{ fontSize: "15px" }}>₱{formatAmount(uc.unit_cost || 0)}</span>
                      </td>

                      {/* SRP VALUE COLUMN */}
                      <td className="ps-2 py-2 text-end">
                          <span className="fw-medium font-monospace" style={{ fontSize: "15px" }}>₱{formatAmount(uc.srp_value || 0)}</span>
                      </td>

                      {/* INSTALLMENT PRICE COLUMN */}
                      <td className="ps-2 py-2 text-end">
                          <span className="fw-medium font-monospace" style={{ fontSize: "15px" }}>₱{formatAmount(uc.installment_price || 0)}</span>
                      </td>

                      {/* INTEREST COLUMN */}
                      <td className="ps-2 py-2 text-center">
                        {uc.interest ? (
                          <div className="d-flex align-items-center justify-content-center px-2 py-1 rounded-pill bg-light border border-secondary-subtle">
                            <span className="fw-bold font-monospace text-dark" style={{ fontSize: '12px' }}>
                              {parseFloat(uc.interest)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted" style={{ fontSize: '12px' }}>N/A</span>
                        )}
                      </td>
                      
                      <td className="text-center ps-3 py-2">
                        <Dropdown 
                          drop="start" 
                          onToggle={(isOpen) => {
                            if (isOpen) {
                              setActionMotorcycleId(uc.id);
                            } else {
                              setActionMotorcycleId(prev => (prev === uc.id ? null : prev));
                            }
                          }}
                        >
                          <Dropdown.Toggle variant="link" className="p-1 hide-caret shadow-none"
                            onMouseEnter={() => setHoverId(uc.id)} onMouseLeave={() => setHoverId(null)}
                            style={{ color: (actionMotorcycleId === uc.id || hoverId === uc.id) ? '#ffc107' : '#adb5bd' }}>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3">
                            {/* View Unit Details - Dito makikita history at full specs */}
                            {/* <Dropdown.Item className="small py-2 px-3">
                              <FaEye className="me-2 mb-1 text-info"/> View Unit Details
                            </Dropdown.Item> */}

                            {/* Edit/Update - Para sa pag-correct ng chassis/engine # o status */}
                            <Dropdown.Item 
                              className="small py-2 px-3"
                              onClick={()=> handleModalCatalog(uc.id)}
                            >
                              <FaEdit className="me-2 mb-1 text-info"/> Edit Unit Info
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            {/* Unit Catalog Specific Actions */}
                            <Dropdown.Item className="small py-2 px-3 text-warning">
                              <FaMotorcycle className="me-2 mb-1"/> Mark for Maintenance
                            </Dropdown.Item>

                            {/* Sale Initiation */}
                            <Dropdown.Item className="small py-2 px-3 text-success">
                              <FaFileInvoiceDollar className="me-2 mb-1"/> Create Sale / Release
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            {/* Delete/Archive */}
                            <Dropdown.Item className="small py-2 px-3 text-danger">
                              <FaTrash className="me-2 mb-1"/> Remove from Stock
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <ModalUnitCatalog 
        show={showModalCatalog}
        handleClose={()=> setShowModalCatalog(false)}
        motorcycleId={motorcycleId}
      />

    </div>
  )
}

export default UnitCatalog;
