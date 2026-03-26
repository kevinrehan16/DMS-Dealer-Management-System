import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { formatAmount, formatMobile, dateFormat } from '../../../../utils/formatters';

import { useCreditApplication } from '../../../../hooks/HooksCreditApp/useCreditApplication';
import SkeletonFormLoading from '../../Loading/SkeletonFormLoading';

// Reusable structural component for the "Label + Value" look
const DataBlock = ({ label, value }) => ( // Add 'value' here
  <div className="mb-3">
    <label className="text-muted small fw-bold mb-1 d-block text-uppercase">
      {label}
    </label>
    <div 
      className="p-2 border-bottom bg-light rounded-1" 
      style={{ minHeight: '35px', fontSize: '0.9rem' }}
    >
      {value || '---'} {/* Add this to display the value */}
    </div>
  </div>
);

const DataHeader = ({ title }) => (
  <h5 className="text-primary border-bottom pb-2 mb-3 fs-6 fw-bold uppercase_text">
    {title || '---'} {/* Add this to display the value */}
  </h5>
);

const CreditApplication = ({ applicationId }) => {

  const { data: appData, isLoading: loadingCreditApp, error: errorCreditApp } = useCreditApplication(applicationId);

  if (loadingCreditApp) return <SkeletonFormLoading fields={8} labelWidth="25%" inputWidth="70%" gap="16px" />;

  return (
    <>
      <h4 className="text-muted text-center pb-2 mb-4 fw-bold uppercase_text">
        CREDIT APPLICATION
      </h4>

      <DataHeader title="Customer Information"></DataHeader>
      <Row className="g-2">
        <Col md={4}><DataBlock label="Last Name" value={appData?.lastName} /></Col>
        <Col md={4}><DataBlock label="First Name" value={appData?.firstName} /></Col>
        <Col md={4}><DataBlock label="Middle Name" value={appData?.middleName} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={4}><DataBlock label="Birthday" value={appData?.birthdate} /></Col>
        <Col md={4}><DataBlock label="Age" value={appData?.age} /></Col>
        <Col md={4}><DataBlock label="Gender" value={appData?.gender} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={4}><DataBlock label="Civil Status" value={appData?.civilStatus} /></Col>
        <Col md={4}><DataBlock label="Education" value={appData?.education} /></Col>
        <Col md={4}><DataBlock label="Mobile #" value={appData?.mobile} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={4}><DataBlock label="Spouse Name" value={appData?.spouseName} /></Col>
        <Col md={4}><DataBlock label="Birthday" value={appData?.spouseBirthDate} /></Col>
        <Col md={4}><DataBlock label="Age" value={appData?.spouseAge} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={4}><DataBlock label="No. of Children" value={appData?.numChildren} /></Col>
        <Col md={4}><DataBlock label="No. of Studying" value={appData?.numStudying} /></Col>
        <Col md={4}><DataBlock label="No. of Dependent" value={appData?.otherDependetn} /></Col>
      </Row>

      <DataBlock label="Full Address" value={appData?.presentAddress} />

      <hr className='dotted' />

      <DataHeader title="Income Information"></DataHeader>
      <h6 className="mt-1 text-muted small fw-medium">Other Sources Of Income</h6>
      <Row>
        <Col md={8}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="40%">Nature</th>
                <th width="60%">Address</th>
              </tr>
            </thead>
            <tbody>
              {appData?.other_source_incomes.map((row, index) => (
                <tr key={index}>
                  <td>{row.incNature}</td>
                  <td>{row.incAddress}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <hr className='dotted' />

      <DataHeader title="References Information"></DataHeader>
      <h6 className="mt-1 text-muted small fw-medium">Credit References</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="24">Full Name</th>
                <th width="38">Address</th>
                <th width="20">Contact #</th>
                <th width="18">Relationship</th>
              </tr>
            </thead>
            <tbody>
              {appData?.credit_references.map((row, index) => (
                <tr key={index}>
                  <td>{row.refFullName}</td>
                  <td>{row.refAddress}</td>
                  <td>{formatMobile(row.refContact)}</td>
                  <td>{row.refRelation}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr className='dotted'/>
      <h6 className="mt-1 text-muted small fw-medium">Personal References</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="18%">Creditor</th>
                <th width="28%">Address</th>
                <th width="15%">Date Granted</th>
                <th width="12%">Original Balance</th>
                <th width="12%">Present Balance</th>
                <th width="15%">Monthly Installment</th>
              </tr>
            </thead>
            <tbody>
              {appData?.personal_references.map((row, index) => (
                <tr key={index}>
                  <td>{row.prefCreditor}</td>
                  <td>{row.prefAddress}</td>
                  <td>{dateFormat(row.prefDateGranted)}</td>
                  <td className='text-end'>{formatAmount(row.prefOrigBal)}</td>
                  <td className='text-end'>{formatAmount(row.prefPresBal)}</td>
                  <td className='text-end'>{formatAmount(row.prefMonInstallment)}</td>
                </tr>
              ))}
            </tbody>
            
          </Table>
        </Col>
      </Row>

      <hr className='dotted' />

      <DataHeader title="Other Information"></DataHeader>
      <h6 className="mt-1 text-muted small fw-medium">Real and/or Personal Properties Owned</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="24">Kind</th>
                <th width="40">Location</th>
                <th width="18">Value</th>
                <th width="18">Imbursement</th>
              </tr>
            </thead>
            <tbody>
              {appData?.personal_properties_owned?.length > 0 ? (
                appData.personal_properties_owned.map((row, index) => (
                  <tr key={index}>
                    <td>{row.propsKind}</td>
                    <td>{row.propsLocation}</td>
                    <td className='text-end'>{formatAmount(row.propsValue)}</td>
                    <td className='text-end'>{formatAmount(row.propsImbursement)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No record found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <hr className='dotted' />

      <DataHeader title="Attachment Information"></DataHeader>
      <h6 className="mt-1 text-muted small fw-medium">Documents</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th>File name</th>
              </tr>
            </thead>
            <tbody>
              {appData?.attachment_information?.length > 0 ? (
                appData.attachment_information.map((row, index) => (
                  <tr key={index}>
                    <td>{row.attReq}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center">
                    No record found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default CreditApplication
