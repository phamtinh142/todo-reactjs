import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Button = (props) => {
  const {
    children,
    color,
    block,
    size,
    className,
    onClick,
  } = props;

  return (
    <button
      type="button"
      className={`btn btn--${color} ${block && 'btn__block'} btn--${size} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  color: 'blue',
  block: false,
  size: 'default',
  className: '',
  onClick: null,
};

export default Button;