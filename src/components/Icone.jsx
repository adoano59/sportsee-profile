
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/banner.css"

const IconMenu = ({ icon }) => {
  return (
    <div>
      <FontAwesomeIcon className='icones' icon={icon} size="2x" />
    </div>
  );
};

export default IconMenu;