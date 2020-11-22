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
  const [taskName, setTaskName] = useState(defaultTaskName);
  const [description, setDescription] = useState(defaultDescription);
  const [piority, setPiority] = useState(defaultPiority);

  const doSubmitForm = () => {
    let isError = false;

    if (taskName === '') {
      setTaskNameError('Task title​ is a required field!')
      isError = true;
    } else {
      setTaskNameError('');
    }

    if ((dueDate + 24 * 60 * 60 * 1000) < new Date().getTime()) {
      setDueDateError('Do not accept past days!')
      isError = true
    } else {
      setDueDateError('');
    }

    if (!isError) {
      const value = {
        taskName,
        description,
        piority,
        dueDate,
      }
      onChangeValue(value);
      if (type === 'Add') {
        setTaskName('');
        setDescription('');
        setPiority('1');
        setDueDate(new Date().getTime());
        setTaskNameError('');
        setDueDateError('');
      }
    }
  }

  return (
    <form>
      <TextInput
        placeholder="Add new task..."
        error={taskNameError}
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <TextArea
        label="Description"
        rows={5}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="group-input">
        <SelectInput
          label="Piority"
          value={piority}
          onChange={(event) => setPiority(event.target.value)}
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