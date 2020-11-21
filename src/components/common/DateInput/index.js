import React from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import { withInput } from '../../../hocs';

const DateInput = (props) => {
  return (
    <DatePicker className="date-input" {...props} />
  )
}

export default withInput({ component: DateInput });