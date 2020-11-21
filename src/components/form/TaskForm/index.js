import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import {
  Button,
  TextInput,
  TextArea,
  SelectInput,
  DateInput,
} from '../../common';
import useInput from '../../../hooks/useInput';

const TaskForm = (props) => {
  const {
    type,
    onChangeValue,
    defaultTaskName,
    defaultDescription,
    defaultPiority,
    defaultDueDate,
  } = props;

  const [taskNameError, setTaskNameError] = useState('');
  const [dueDateError, setDueDateError] = useState('');

  const [dueDate, setDueDate] = useState(defaultDueDate);
  const taskName = useInput(defaultTaskName);
  const description = useInput(defaultDescription);
  const piority = useInput(defaultPiority);

  const doSubmitForm = async () => {
    // if (taskName.value === '') {
    //   await setTaskNameError('Not Empty')
    // }
    // if (dueDate < new Date()) {
    //   await setDueDateError('due date error')
    // }
    // console.log(`------- test ------- `);
    // console.log('taskNameError: ', taskNameError);
    // console.log('dueDateError: ', dueDateError);
    // console.log(`------- test ------- `);
    if (taskNameError === '' || dueDateError === '') {
      const value = {
        taskName: taskName.value,
        description: description.value,
        piority: piority.value,
        dueDate,
      }
      onChangeValue(value);
    }
  }

  return (
    <form>
      <TextInput
        placeholder="Add new task..."
        error={taskNameError}
        {...taskName}
      />
      <TextArea
        label="Description"
        rows={5}
        {...description}
      />
      <div className="group-input">
        <SelectInput
          label="Piority"
          {...piority}
        >
          <option value="0">Low</option>
          <option defaultValue value="1">Default</option>
          <option value="2">High</option>
        </SelectInput>
        <DateInput
          label="Due Date"
          error={dueDateError}
          selected={new Date(dueDate)}
          onChange={(date) => setDueDate(new Date(date).getTime())}
        />
      </div>
      <Button
        color="green"
        size="small"
        block
        onClick={() => doSubmitForm()}
      >
        {type}
      </Button>
    </form>
  )
}

TaskForm.propTypes = {
  type: PropTypes.string,
  onChangeValue: PropTypes.func,
  defaultTaskName: PropTypes.string,
  defaultDescription: PropTypes.string,
  defaultPiority: PropTypes.string,
  defaultDueDate: PropTypes.number,
}

TaskForm.defaultProps = {
  type: 'Add',
  onChangeValue: null,
  defaultTaskName: '',
  defaultDescription: '',
  defaultPiority: '1',
  defaultDueDate: new Date().getTime(),
}

export default TaskForm;