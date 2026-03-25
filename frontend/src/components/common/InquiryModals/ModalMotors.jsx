import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { FaCheck, FaTimes } from "react-icons/fa";
import SkeletonListLoading from '../Loading/SkeletonListLoading.jsx';
import { useMotorBrands, useMotorModels, useMotorColors, useMotorChassis } from '../../../hooks/HooksMotor/useMotor.js';

const ModalMotors = ({ show, handleClose, onSelectMotor }) => {
  const [selectedItems, setSelectedItems] = useState({
    brands: '',
    models: '',
    colors: '',
    chassis: '',
  });

  // 1. Fetch Brands (Auto load pag open ng modal)
  const { data: brands = [], isLoading: loadingBrands } = useMotorBrands({
    enabled: show
  });

  // 2. Fetch Models (Depende sa napiling brand)
  const { data: models = [], isFetching: loadingModels } = useMotorModels(selectedItems.brands);

  // 3. Fetch Colors (Depende sa napiling model)
  const { data: colors = [], isFetching: loadingColors } = useMotorColors(selectedItems.models);

  // 4. Fetch Chassis (Depende sa napiling color)
  const { data: chassis = [], isFetching: loadingChassis } = useMotorChassis(selectedItems.colors);
  
  // Simpleng Click Handler
  const handleBrandClick = (brand) => {
    setSelectedItems({ brands: brand, models: '', colors: '', chassis: '' });
  };

  const handleModelClick = (model) => {
    setSelectedItems(prev => ({ ...prev, models: model, colors: '', chassis: '' }));
  };

  const handleColorClick = (color) => {
    setSelectedItems(prev => ({ ...prev, colors: color, chassis: '' }));
  };

  const handleChassisClick = (item) => {
    setSelectedItems(prev => ({ ...prev, chassis: item }));
  };

  const handleSelectMotor = (selectedItems) => {
    // 1. Validation: Siguraduhin na may laman lahat
    if (!selectedItems.brands || 
        !selectedItems.models || 
        !selectedItems.colors || 
        !selectedItems.chassis
      ) {
        alert("Please select Brand, Model, Color, and Chassis before proceeding.");
        return;
    }

    const finalData = {
      motorBrand: selectedItems.brands,
      motorModel: selectedItems.models,
      motorColor: selectedItems.colors,
      motorChassis: selectedItems.chassis.chassis,
      motorSeries: selectedItems.chassis.series,
      motorLcp: selectedItems.chassis.interest, 
      motorCashprice: selectedItems.chassis.cashPrice,
      motorSrpValue: selectedItems.chassis.srpValue,
    };
    // console.log(selectedItems);

    onSelectMotor(finalData);
    handleClose();
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
                  {loadingBrands ? (
                    <SkeletonListLoading count={3} />
                  ) : (
                    brands?.map((brand, index) => (
                      <ListGroup.Item
                        key={index}
                        active={selectedItems.brands === brand}
                        onClick={() => handleBrandClick(brand)}
                      >
                        {brand}
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Models</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {loadingModels ? (
                    <SkeletonListLoading count={3} />
                  ) : (
                    models?.map((model, index) => (
                      <ListGroup.Item
                        key={index}
                        active={selectedItems.models === model}
                        onClick={() => handleModelClick(model)}
                      >
                        {model}
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Colors</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {loadingColors ? (
                    <SkeletonListLoading count={3} />
                  ) : (
                    colors?.map((color, index) => (
                      <ListGroup.Item
                        key={index}
                        active={selectedItems.colors === color}
                        onClick={() => handleColorClick(color)}
                      >
                        {color}
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className='cardHeader'>Chassis</Card.Header>
                <ListGroup variant="flush" className='cardList'>
                  {loadingChassis ? (
                    <SkeletonListLoading count={3} />
                  ) : (
                    Array.isArray(chassis) && chassis.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        active={selectedItems.chassis && selectedItems.chassis.chassis === item.chassis}
                        onClick={() => handleChassisClick(item)}
                      >
                        {item.chassis}
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant='success' 
            onClick={() => handleSelectMotor(selectedItems)}
          >
            <FaCheck /> Done</Button>
          <Button variant="danger" onClick={handleClose}><FaTimes /> Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default React.memo(ModalMotors);