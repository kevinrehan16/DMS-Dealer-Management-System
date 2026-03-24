import React, { useState, useMemo, useCallback } from 'react'

import PageHeader from '../../components/common/PageHeader'
import { FaUsers, FaUserEdit, FaSearch, FaUserPlus } from 'react-icons/fa'
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { CircularProgress } from '@mui/material'

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'
import ModalUsers from '../../components/common/UserModals/ModalUser'

import { useUsers } from '../../hooks/HooksUser/useUsers'
import { formatUpperCase, formatCapitalize } from '../../utils/formatters'
import debounce from 'lodash.debounce'; 

function Users() {
  const [userId, setUserId] = useState(null);
  const [showModalUser, setShowModalUser] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const [filters, setFilters] = useState({ search: '', userType: '' });

  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update agad ang textbox para hindi "laggy"
    debouncedSearch(value); // Tawagin ang debounced function
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setUserTypeFilter(value);
    setFilters(prev => ({ ...prev, userType: value }));
  };

  const handleShowModalUser = (userId) => {
    setUserId(userId);
    setShowModalUser(true);
  }

  const handleCloseModalUser = () => {
    setShowModalUser(false);
  }

  const { data: users = [], isLoading, isError, error, refetch, isFetching } = useUsers(filters);

  return (
    <div>
      <PageHeader title="Users" Icon={FaUsers} />

      <div className="content-page">
        <Row>
          <Col md={11}>
            <Form className="filter-form" onSubmit={(e) => e.preventDefault()}>
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search information here..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <InputGroup.Text>
                        {/* Spinner icon kung nag-fe-fetch pa sa background */}
                        {isFetching ? <CircularProgress size={16} /> : <FaSearch />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={2}>
                   <Form.Select 
                        as='select' 
                        value={userTypeFilter} 
                        onChange={handleTypeChange}
                      >
                        <option value=''>--Filter by--</option>
                        <option value='administrator'>Administrator</option>
                        <option value='staff'>Staff</option>
                    </Form.Select>
                </Col>

              </Row>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-end">
            <Button type="button" 
              variant="primary" 
              className="mt-auto d-flex align-items-center gap-1"
              onClick={()=>handleShowModalUser(null)}
            >
              <FaUserPlus /> User
            </Button>
          </Col>
        </Row>
        <div className="table-section mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th width='3%' className='text-center'>
                  <Form>
                    <Form.Check
                      type="checkbox"
                    />
                  </Form>
                </th>
                <th width='10%'>User ID</th>
                <th width='25%'>Full Name</th>
                <th width='25%'>Email Address</th>
                <th width='15%'>Username</th>
                <th width='12%'>Type</th>
                <th width='10%'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                    <SkeletonRowLoading key={index} columns={7} />
                  ))
                ) : (
                  users.map((row, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{row.userid}</td>
                      <td>{row.firstName} {row.lastName}</td>
                      <td>{formatCapitalize(row.email)}</td>
                      <td>{formatCapitalize(row.userName)}</td>
                      <td>{formatUpperCase(row.userType)}</td>
                      <td>
                        <Button 
                          variant="info" 
                          size="sm" 
                          className="text-white"
                          onClick={()=>handleShowModalUser(row.id)}
                        >
                          <FaUserEdit />
                        </Button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </Table>
        </div>
      </div>

      <ModalUsers 
        show={showModalUser}
        handleClose={handleCloseModalUser}
        userId={userId}
      />

    </div>
  )
}

export default Users
