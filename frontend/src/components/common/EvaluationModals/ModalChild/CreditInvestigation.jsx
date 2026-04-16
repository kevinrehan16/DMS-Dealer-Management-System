import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { formatAmount, formatMobile, dateFormat } from '../../../../utils/formatters';

import { useCreditInvestigation } from '../../../../hooks/HooksCreditInv/useCreditInvestigation';
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

const CreditInvestigation = ({ investigationId }) => {

  const { data: invData, isLoading: loadingCreditInv, error: errorCreditInv } = useCreditInvestigation(investigationId);

  if (loadingCreditInv) return <SkeletonFormLoading fields={8} labelWidth="25%" inputWidth="70%" gap="16px" />;

  return (
    <>
      <h4 className="text-muted text-center pb-2 mb-4 fw-bold uppercase_text">
        CREDIT INVESTIGATION
      </h4>

      <DataHeader title="Customer Information"></DataHeader>
      <Row className="g-2">
        <Col md={6}><DataBlock label="Contact Person" value={invData.cicontactPerson} /></Col>
        <Col md={6}><DataBlock label="Spouse Name" value={invData.cispouseName} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={6}><DataBlock label="Gender" value={invData.cigender} /></Col>
        <Col md={6}><DataBlock label="Gender" value={invData.cigender} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={4}><DataBlock label="Birthday" value={invData.cibirthday} /></Col>
        <Col md={2}><DataBlock label="Age" value={invData.cicpage} /></Col>
        <Col md={4}><DataBlock label="Birthday" value={invData.cispouseBirthday} /></Col>
        <Col md={2}><DataBlock label="Age" value={invData.cisage} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={3}><DataBlock label="Civit Status" value={invData.cicivilStatus} /></Col>
        <Col md={3}><DataBlock label="Education" value={invData.cieducation} /></Col>
        <Col md={3}><DataBlock label="TIN #" value={invData.citinNumber} /></Col>
        <Col md={3}><DataBlock label="Mobile #" value={invData.cimobile} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={4}><DataBlock label="No. of Children" value={invData.cidependentChildren} /></Col>
        <Col md={4}><DataBlock label="No. of Studying" value={invData.cistudyingChildren} /></Col>
        <Col md={4}><DataBlock label="No. of Dependent" value={invData.ciotherDependents} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={7}><DataBlock label="Present Address" value={invData.ciPresAddress} /></Col>
        <Col md={5}><DataBlock label="Length of Stay" value={invData.ciPresAddrLenStay + " years and " + invData.ciPresAddrMonStay} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={7}><DataBlock label="Type" value={invData.ciPresAddrType} /></Col>
        <Col md={5}><DataBlock label="Monthly Rental Fee" value={invData.ciPresAddrRentFee} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={7}><DataBlock label="Previous Address" value={invData.ciPrevAddress} /></Col>
        <Col md={5}><DataBlock label="Length of Stay" value={invData.ciPrevAddrLenStay + " years and " + invData.ciPrevAddrMonStay} /></Col>
      </Row>

      <Row className="g-2">
        <Col md={12}><DataBlock label="Provincial Address" value={invData.ciProvAddress} /></Col>
      </Row>

      <hr className='dotted' />
      
      <DataHeader title="Employment Information"></DataHeader>

      <Row className="g-2">
        <Col md={6}><DataBlock label="Employed By" value={invData.ciEmployedBy} /></Col>
        <Col md={6}><DataBlock label="Employment Status" value={invData.ciEmpStatus} /></Col>
      </Row>
      <Row className="g-2">
        <Col md={6}><DataBlock label="Telephone #" value={invData.ciEmpTelNo} /></Col>
        <Col md={6}><DataBlock label="Designation" value={invData.ciEmpDesignation} /></Col>
      </Row>
      <Row className="g-2">
        <Col md={8}><DataBlock label="Address of Employer" value={invData.ciEmpAddrEmp} /></Col>
        <Col md={4}><DataBlock label="Length of Service" value={invData.ciEmpAddrLenStay + " years and " + invData.ciEmpAddrMonStay} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={4}><DataBlock label="Prev. Employment" value={invData.ciEmpPrevEmp} /></Col>
        <Col md={8}><DataBlock label="Address " value={invData.ciEmpPrevAddrEmp} /></Col>
      </Row>
      <Row className="g-2">
        <Col md={4}><DataBlock label="Spouse's Employment" value={invData.ciEmpSpouseEmp} /></Col>
        <Col md={8}><DataBlock label="Address " value={invData.ciEmpSpouseEmpAddr} /></Col>
      </Row>
      <Row className="g-2">
        <Col md={6}><DataBlock label="Position" value={invData.ciEmpSpousePosition} /></Col>
        <Col md={6}><DataBlock label="Telephone # " value={invData.ciEmpPrevTelNo} /></Col>
      </Row>

      <hr className='dotted' />

      <Row className="g-2">
        <Col md={6}>
          <DataHeader title="Income Information"></DataHeader>
          <Row>
            <Col md={12}><DataBlock label="Income Salary (NET)" value={invData.ciIncomeSalaryNet} /></Col>
            <Col md={12}><DataBlock label="Spouse Income" value={invData.ciSpouseIncome} /></Col>
            <Col md={12}><DataBlock label="Rental Income" value={invData.ciRentalIncome} /></Col>
            <Col md={12}><DataBlock label="Business Net" value={invData.ciBusinessNet} /></Col>
            <Col md={12}><DataBlock label="Others" value={invData.ciOthers} /></Col>
            <Col md={12}><DataBlock label="Total Income" value={invData.ciTotalIncome} /></Col>
          </Row>
        </Col>
        <Col md={6}>
          <DataHeader title="Expenses Information"></DataHeader>
          <Row>
            <Col md={12}><DataBlock label="Expenses Living" value={invData.ciExpenseLiving} /></Col>
            <Col md={12}><DataBlock label="Rent" value={invData.ciExpenseRent} /></Col>
            <Col md={12}><DataBlock label="Schooling" value={invData.ciExpenseSchooling} /></Col>
            <Col md={12}><DataBlock label="Insurance" value={invData.ciExpenseInsurance} /></Col>
            <Col md={12}><DataBlock label="Elect. & Water" value={invData.ciExpenseElectWat} /></Col>
            <Col md={12}><DataBlock label="Inst. Obligation" value={invData.ciExpenseObligation} /></Col>
            <Col md={12}><DataBlock label="Loan Repay" value={invData.ciExpenseLoan} /></Col>
            <Col md={12}><DataBlock label="Total Expenses" value={invData.ciExpenseTotal} /></Col>
          </Row>
        </Col>
      </Row>

      <hr className='dotted' />
      
      <DataHeader title="Income Information"></DataHeader>
      <h6 className="mt-1 text-muted small fw-medium">Other Sources Of Income</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="40%">Nature</th>
                <th width="60%">Address</th>
              </tr>
            </thead>
            <tbody>
              {invData?.other_source_incomes.map((row, index) => (
                <tr key={index}>
                  <td>{row.osiamount}</td>
                  <td>{row.osisource}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md={5}><DataBlock label="Checking Account" value={invData.ciCheckingAccount} /></Col>
        <Col md={7}><DataBlock label="Address" value={invData.ciCAAddrr} /></Col>
      </Row>
      <Row className="g-2">
        <Col md={5}><DataBlock label="Savings Account" value={invData.ciSavingsAccount} /></Col>
        <Col md={7}><DataBlock label="Address" value={invData.ciSAAddrr} /></Col>
      </Row>

      <hr className='dotted'/>
      <h6 className="mt-1 text-muted small fw-medium">Personal References</h6>
      <Row>
        <Col md={12}>
          <Table bordered hover size="sm" className="small shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th width="24">Name</th>
                <th width="36">Address</th>
                <th width="22">Contact</th>
                <th width="18">Relationship</th>
              </tr>
            </thead>
            <tbody>
              {invData?.personal_references.map((row, index) => (
                <tr key={index}>
                  <td>{row.prname}</td>
                  <td>{row.praddress}</td>
                  <td>{row.prcontact}</td>
                  <td>{row.prrelation}</td>
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
                <th width="18%">Creditor</th>
                <th width="27%">Address</th>
                <th width="15%">Date Granted</th>
                <th width="12%">Original Balance</th>
                <th width="12%">Present Balance</th>
                <th width="16%">Monthly Installment</th>
              </tr>
            </thead>
            <tbody>
              {invData?.credit_references.map((row, index) => (
                <tr key={index}>
                  <td>{row.crcreditor}</td>
                  <td>{row.craddress}</td>
                  <td>{row.crdategranted}</td>
                  <td className='text-end'>{formatAmount(row.crorigbalance)}</td>
                  <td className='text-end'>{formatAmount(row.crpresbalance)}</td>
                  <td className='text-end'>{formatAmount(row.crmoinstallment)}</td>
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
              {invData?.personal_properties_owned?.length > 0 ? (
                invData.personal_properties_owned.map((row, index) => (
                  <tr key={index}>
                    <td>{row.ppkind}</td>
                    <td>{row.pplocation}</td>
                    <td className='text-end'>{formatAmount(row.ppvalue)}</td>
                    <td className='text-end'>{formatAmount(row.ppimbursement)}</td>
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
    </>
  )
}

export default CreditInvestigation
