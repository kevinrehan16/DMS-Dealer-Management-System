import React from 'react';

// Mapapansin mo na naka-uppercase ang "Icon" prop 
// para ma-render natin ito bilang JSX element.
const PageHeader = ({ title, Icon }) => {
  return (
    <div className="page-header">
      <h4 className='text-uppercase'>
        {Icon && <Icon className="me-2 fs-4" />} 
        {title}
      </h4>
    </div>
  );
};

export default PageHeader;