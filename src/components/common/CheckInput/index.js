import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CheckInput = (props) => {
  const {
    label,
  } = props;
  return (
    <div>
      <input
        className="check-input"
        type="checkbox"
        {...props}
      />
      <label className="check-input--label">
        {label}
      </label>
    </div>
  )
}

CheckInput.propTypes = {
  label: PropTypes.string
}

CheckInput.defaultProps = {
  label: '',
}

export default CheckInput;