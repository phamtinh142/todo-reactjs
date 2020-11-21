import React from 'react';

import { withInput } from '../../../hocs';
import './style.css';

const TextInput = (props) => {
  return (
    <input className="input-text" {...props} />
  )
}

export default withInput({ component: TextInput });