import React from 'react'

const FormTitle = ({ title, subTitle }) => {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center">
        {/* Title Section */}
        <h5 className="text-secondary fw-bold text-uppercase mb-0 me-3" style={{ whiteSpace: 'nowrap' }}>
          {title}
        </h5>
        
        {/* The Line - Mag-eexpand hanggang dulo */}
        <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#dee2e6' }}></div>
      </div>
      
      {/* Subtitle sa ilalim */}
      {subTitle && (
        <p className="text-muted small mb-0 mt-1" style={{ maxWidth: '80%' }}>
          {subTitle}
        </p>
      )}
    </div>
  )
}

export default FormTitle
