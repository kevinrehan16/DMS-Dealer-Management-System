import React, { useState, useEffect } from 'react'
import "../../assets/css/Cashier.css"

import { Row, Col, Form, InputGroup, Button, Table, Badge, Dropdown } from 'react-bootstrap';
import { FaSearch, FaWarehouse, FaCalendarAlt, FaFileExport,FaPlus, FaEllipsisV, FaMotorcycle, FaEye,
          FaEdit, FaTrash, FaFileInvoiceDollar } from 'react-icons/fa';

import { useInventory } from '../../hooks/HooksInventory/useInventory';

import { formatAmount } from '../../utils/formatters' 

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

function Inventory() {
  const { data: inventories, isLoading, isError } = useInventory();

  const [actionInventoryId, setActionInventoryId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  
  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaWarehouse size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">INVENTORY</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Manage and monitor unit stock availability</small>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
            <div className="d-flex gap-2 align-items-center">
              <Button size="md"  variant="outline-secondary" className="border-0 fw-bold d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button size="md"  variant="primary" className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
                <FaPlus /> NEW UNIT
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
                  <th width='25%' className="ps-3 py-3">Motorcycle Unit</th>
                  <th width='17%' className="ps-3 py-3">UNIT Identifier</th>
                  <th width='15%' className="text-end ps-3 py-3">Cost & SRP Value</th>
                  <th width='15%' className="text-end ps-3 py-3">Unit Prices</th>
                  <th width='8%' className="text-center ps-2 py-3">Interest</th>
                  <th width='12%' className='text-center ps-2 py-3'>Status</th>
                  <th width='8%' className='text-center ps-2 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => <SkeletonRowLoading key={i} columns={8} />)
                ) : isError ? (
                  <tr>
                    <td colSpan="10" className="text-center text-danger py-4">
                      Error loading inventory data.
                    </td>
                  </tr>
                ) : inventories.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      No inventory data available.
                    </td>
                  </tr>
                ) : (
                  inventories?.map((inventory) => (
                    <tr key={inventory.id}>
                      <td className="ps-3 py-2">
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border ${inventory.unit_type === 'Brand_New' ? 'border-success-subtle bg-success-subtle text-success' : 'border-danger-subtle bg-danger-subtle text-danger'}`}>
                            <FaMotorcycle size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{inventory.motorcycle.brand} {inventory.motorcycle.model_name}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{inventory.motorcycle.color}</div>
                          </div>
                        </div>
                      </td>
                      <td className="ps-3 py-2">
                        {/* Main Identifier */}
                        <div className="fw-medium text-dark" style={{ fontSize: '14px' }}>
                          {inventory.series_number}
                        </div>
                        {/* Sub-details na maliit at gray */}
                        <div className="d-flex flex-column gap-0" style={{ fontSize: '11px', color: '#6c757d' }}>
                          <span className="text-uppercase">Chassis: {inventory.chassis_number}</span>
                          <span className="text-uppercase">Engine: {inventory.engine_number}</span>
                        </div>
                      </td>
                      {/* COST VS SRP COLUMN */}
                      <td className="ps-2 py-2" style={{ backgroundColor: 'rgba(25, 25, 217, 0.05)' }}>
                        <div className="d-flex flex-column gap-1" style={{ fontSize: '13px' }}>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="text-muted" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Cost:</span>
                            <span className="fw-bold font-monospace text-dark">₱{formatAmount(inventory.motorcycle.unit_cost || 0)}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="text-muted" style={{ fontSize: '10px', textTransform: 'uppercase' }}>SRP Value:</span>
                            <span className="fw-bold font-monospace text-primary">₱{formatAmount(inventory.motorcycle.srp_value || 0)}</span>
                          </div>
                        </div>
                      </td>

                      {/* CASH VS INSTALLMENT COLUMN */}
                      <td className="ps-2 py-2" style={{ backgroundColor: 'rgba(88, 254, 121, 0.05)' }}>
                        <div className="d-flex flex-column gap-1" style={{ fontSize: '13px' }}>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="text-muted" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Cash:</span>
                            <span className="fw-bold font-monospace text-success">₱{formatAmount(inventory.motorcycle.cash_price || 0)}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="text-muted" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Installment:</span>
                            <span className="fw-bold font-monospace text-warning">₱{formatAmount(inventory.motorcycle.installment_price || 0)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center ps-2 py-2">
                        {inventory.motorcycle?.interest ? (
                          <div className="d-flex align-items-center justify-content-center px-2 py-1 rounded-pill bg-light border border-secondary-subtle">
                            <span className="fw-bold font-monospace text-dark" style={{ fontSize: '12px' }}>
                              {parseFloat(inventory.motorcycle.interest)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted" style={{ fontSize: '12px' }}>N/A</span>
                        )}
                      </td>
                      <td className="text-center ps-2 py-2">
                        {inventory.status ? (
                          <Badge 
                            bg={
                              inventory.status === 'Available' ? 'success' : 
                              inventory.status === 'Reserved' ? 'warning' :
                              inventory.status === 'Sold' ? 'secondary' :
                              inventory.status === 'Maintenance' ? 'danger' :
                              inventory.status === 'Loaned' ? 'primary' : 'dark'
                            }
                            className="rounded-pill px-3 py-1 shadow-sm width-100"
                            style={{ 
                              fontSize: '10px', 
                              letterSpacing: '0.5px',
                              width: '100%',
                            }}
                          >
                            {inventory.status.toUpperCase()}
                          </Badge>
                        ) : (
                          <span className="text-muted" style={{ fontSize: '11px' }}>N/A</span>
                        )}
                      </td>
                      <td className="text-center ps-3 py-2">
                        <Dropdown 
                          drop="start" 
                          onToggle={(isOpen) => {
                            if (isOpen) {
                              setActionInventoryId(inventory.id);
                            } else {
                              setActionInventoryId(prev => (prev === inventory.id ? null : prev));
                            }
                          }}
                        >
                          <Dropdown.Toggle variant="link" className="p-1 hide-caret shadow-none"
                            onMouseEnter={() => setHoverId(inventory.id)} onMouseLeave={() => setHoverId(null)}
                            style={{ color: (actionInventoryId === inventory.id || hoverId === inventory.id) ? '#ffc107' : '#adb5bd' }}>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3">
                            {/* View Unit Details - Dito makikita history at full specs */}
                            <Dropdown.Item className="small py-2 px-3">
                              <FaEye className="me-2 mb-1 text-info"/> View Unit Details
                            </Dropdown.Item>

                            {/* Edit/Update - Para sa pag-correct ng chassis/engine # o status */}
                            <Dropdown.Item className="small py-2 px-3">
                              <FaEdit className="me-2 mb-1 text-primary"/> Edit Unit Info
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            {/* Inventory Specific Actions */}
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

    </div>
  )
}

export default Inventory;
