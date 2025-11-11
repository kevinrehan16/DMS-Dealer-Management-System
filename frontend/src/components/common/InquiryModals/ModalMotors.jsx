import React, { useState } from 'react'
import { Modal, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { FaSave, FaTimes, FaSearch } from "react-icons/fa";

const ModalMotors = ({ show, handleClose }) => {
  const [selectedItems, setSelectedItems] = useState({
    brands: null,
    models: null,
    colors: null,
    chassis: null,
  });

  const listItemMotors = {
    brands: ["Kawasaki", "Yamaha", "Honda"],
    models: ["Kawasaki Ninja", "Yamaha R1", "Honda CBR"],
    colors: ["Red", "Green", "Blue"],
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
                  {listItemMotors.brands.map((brand, index) => (
                    <ListGroup.Item key={index} active={selectedItems.brands === brand} onClick={() => handleItemClick("brands", brand)}>{brand}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Models</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {
                    listItemMotors.models.map((model, index) => (
                      <ListGroup.Item key={index} active={selectedItems.models === model} onClick={() => handleItemClick("models", model)}>{model}</ListGroup.Item>
                    ))
                  }
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Colors</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {listItemMotors.colors.map((color, index) => (
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
          <Button variant="danger" onClick={handleClose}><FaTimes /> Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalMotors
