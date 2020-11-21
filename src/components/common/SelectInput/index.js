import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { withInput } from '../../../hocs';

const SelectInput = (props) => {
  const {
    children,
  } = props;
  return (
    <select
      className="select-input"
      {...props}
    >
      {children}
    </select>
  )
}

SelectInput.propTypes = {
  children: PropTypes.node.isRequired,
}

SelectInput.defaultProps = {
  children: null
}

export default withInput({ component: SelectInput });