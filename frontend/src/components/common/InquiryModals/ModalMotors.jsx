import React, { use, useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from 'axios';

const ModalMotors = ({ show, handleClose, onSelect }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/motors/motorbrands`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      setBrands(response.data.brandMotor);
      // console.log('Fetched brands:', response.data.listItemMotors);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  }

  const fetchModelsByBrand = async (brand) => {
    try {
      handleItemClick("brands", brand);
      const response = await axios.get(`${API_URL}/motors/motormodels/${brand}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      setModels(response.data.models);
      // console.log('Fetched models:', response.data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchColorsByModel = async (model) => {
    try {
      handleItemClick("models", model);
      const response = await axios.get(`${API_URL}/motors/motorcolors/${model}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setColors(response.data.colors);

    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  }

  const [selectedItems, setSelectedItems] = useState({
    models: null,
    colors: null,
    chassis: null,
  });

  const listItemMotors = {
    chassis: ["65456", "65457", "65458"],
  };

  const handleItemClick = (groupKey, index) => {
    setSelectedItems((prev) => {
      switch (groupKey) {
        case "brands":
          return {
            brands: index,
            models: null,
            colors: null,
            chassis: null,
          };
        case "models":
          return {
            ...prev,
            models: index,
            colors: null,
            chassis: null,
          };
        case "colors":
          return {
            ...prev,
            colors: index,
            chassis: null,
          };
        case "chassis":
          return {
            ...prev,
            chassis: index,
          };
        default:
          return prev;
      }
    });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='xl' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select Motorcycle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Brands</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {brands.map((brand, index) => (
                    <ListGroup.Item key={index} active={selectedItems.brands === brand} onClick={() => { fetchModelsByBrand(brand); }}>{brand}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Models</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {
                    models.map((model, index) => (
                      <ListGroup.Item key={index} active={selectedItems.models === model} onClick={() => fetchColorsByModel(model)}>{model}</ListGroup.Item>
                    ))
                  }
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Colors</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {colors.map((color, index) => (
                    <ListGroup.Item key={index} active={selectedItems.colors === color} onClick={() => handleItemClick("colors", color)}>{color}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Chassis</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {listItemMotors.chassis.map((chassis, index) => (
                    <ListGroup.Item key={index} active={selectedItems.chassis === chassis} onClick={() => handleItemClick("chassis", chassis)}>{chassis}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => onSelect(selectedItems)}><FaCheck />  Done</Button>
          <Button variant="danger" onClick={handleClose}><FaTimes /> Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalMotors
