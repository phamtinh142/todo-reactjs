import React from 'react'
import Proptypes from 'prop-types';

import './style.css'

const withInput = ({ component: Component }) => {
  const _WithInput = (props) => {
    const {
      label,
      error,
    } = props;

    return (
      <div className="input-wrapper">
        {
          label && (
            <span className="input--label">
              {label}
            </span>
          )
        }
        <div className="input-group">
          <Component {...props} />
          {
            error && (
              <p className="input--error">
                {error}
              </p>
            )
          }
        </div>
      </div>
    )
  }

  _WithInput.propTypes = {
    label: Proptypes.string,
    error: Proptypes.string,
  }

  _WithInput.defaultProps = {
    label: null,
    error: null,
  }

  return _WithInput;
}

export default withInput;