import React, { useState } from 'react';
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';

import { useAddress } from '../../../../hooks/HooksAddress/useAddress';

const AddressForm = ({ setFormValue, register, errors }) => {
  // Custom styles para sa React Select para bumagay sa Bootstrap height at focus
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '38px', // Standard Bootstrap input height
      borderRadius: '6px',
      borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',
      boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
      '&:hover': {
        borderColor: '#dee2e6'
      }
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  const [codes, setCodes] = useState({
      regCode: null,
      provCode: null,
      citymunCode: null,
      brgyCode: null
  });
  const { data, loading } = useAddress(codes);

  return (
    <div className="mt-1">
      {/* INPUT ADDRESSES */}
      <Form.Group controlId="addressnum" className="mb-2">
        <Row>
          <Col xs={4} className="d-flex align-items-center">
            <Form.Label className="mb-0">House/Unit/Floor</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              className="capitalize_text"
              name="addressnum"
              {...register("addressnum")}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="addressbldg" className="mb-2">
        <Row>
          <Col xs={4} className="d-flex align-items-center">
            <Form.Label className="mb-0">Building</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              className="capitalize_text"
              name="addressbldg"
              {...register("addressbldg")}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="addressstreet" className="mb-2">
        <Row>
          <Col xs={4} className="d-flex align-items-center">
            <Form.Label className="mb-0">Street</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              className="capitalize_text"
              name="addressstreet"
              {...register("addressstreet")}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="addressssubd" className="mb-2">
        <Row>
          <Col xs={4} className="d-flex align-items-center">
            <Form.Label className="mb-0">Subdivision</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              className="capitalize_text"
              name="addressssubd"
              {...register("addressssubd")}
            />
          </Col>
        </Row>
      </Form.Group>

      {/* REGION */}
      <Form.Group as={Row} className="mb-2">
        <Form.Label column sm={4}>Region</Form.Label>
        <Col sm={8}>
          <Select 
            // Hanapin ang selected option based sa codes.regCode
            value={data.regions?.find(c => c.value === codes.regCode) || null}
            options={data.regions}
            onChange={(opt) => { 
                setCodes({ regCode: opt?.value, provCode: null, citymunCode: null, brgyCode: null });
                setFormValue("addresssregion", opt?.label || ""); 
                setFormValue("addresssprovince", "");
                setFormValue("addressscity", "");
                setFormValue("addresssbrgy", "");
            }}
            placeholder="Search region..."
            styles={customStyles}
            menuPortalTarget={document.body} 
            isLoading={loading.regions}
            isClearable
          />
        </Col>
      </Form.Group>

      {/* PROVINCE */}
      <Form.Group as={Row} className="mb-2">
        <Form.Label column sm={4}>Province</Form.Label>
        <Col sm={8}>
          <Select 
            value={data.provinces?.find(c => c.value === codes.provCode) || null}
            options={data.provinces}
            onChange={(opt) => { 
                setCodes({ ...codes, provCode: opt?.value, citymunCode: null, brgyCode: null });
                setFormValue("addresssprovince", opt?.label || "");
                setFormValue("addressscity", "");
                setFormValue("addresssbrgy", "");
            }}
            // ... (ibang props gaya ng styles, etc)
            isDisabled={!codes.regCode}
            isLoading={loading.provinces}
            isClearable
          />
        </Col>
      </Form.Group>

      {/* CITY */}
      <Form.Group as={Row} className="mb-2">
        <Form.Label column sm={4}>City</Form.Label>
        <Col sm={8}>
          <Select 
            value={data.cities?.find(c => c.value === codes.citymunCode) || null}
            options={data.cities}
            onChange={(opt) => { 
                setCodes({ ...codes, citymunCode: opt?.value, brgyCode: null });
                setFormValue("addressscity", opt?.label || "");
                setFormValue("addresssbrgy", "");
            }}
            // ... (ibang props)
            isDisabled={!codes.provCode}
            isLoading={loading.cities}
            isClearable
          />
        </Col>
      </Form.Group>

      {/* BARANGAY */}
      <Form.Group as={Row} className="mb-2">
        <Form.Label column sm={4}>Barangay</Form.Label>
        <Col sm={8}>
          <Select 
            value={data.barangays?.find(c => c.value === codes.brgyCode) || null}
            options={data.barangays}
            onChange={(opt) => { 
                setCodes({ ...codes, brgyCode: opt?.value });
                setFormValue("addresssbrgy", opt?.label || "");
            }}
            // ... (ibang props)
            isDisabled={!codes.citymunCode}
            isLoading={loading.barangays}
            isClearable
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default AddressForm;