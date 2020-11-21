import React from 'react';

import './style.css';
import { withInput } from '../../../hocs';

const TextArea = (props) => {
  return (
    <textarea className="text-area" {...props} />
  )
}

export default withInput({ component: TextArea });