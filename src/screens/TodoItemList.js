import React, { useContext } from 'react';

import './TodoItemList.css'
import {
  Button,
  CheckInput,
} from '../components/common';
import { TaskForm } from '../components/form';
import TodoContext from '../context/TodoContext';

const TodoItem = (props) => {
  const {
    data,
  } = props;

  const {
    doShowDetailTask,
    doRemoveTask,
    onSelectionTask,
    doUpdateTask,
  } = useContext(TodoContext);

  return (
    <div className="todo-item">
      <div className="item">
        <CheckInput
          label={data.taskName}
          onChange={(event) => onSelectionTask({
            id: data.id,
            status: event.target.checked
          })}
        />
        <div className="button-group">
          <Button
            color="aqua"
            size="small"
            className="button-detail"
            onClick={() => doShowDetailTask(data.id)}
          >
            Detail
          </Button>
          <Button
            color="red"
            size="small"
            onClick={() => doRemoveTask(data.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      {
        data.isShow && (
          <div className="detail">
            <TaskForm
              type="Update"
              onChangeValue={(value) => doUpdateTask({
                id: data.id,
                ...value
              })}
              defaultTaskName={data.taskName}
              defaultDescription={data.description}
              defaultPiority={data.piority}
              defaultDueDate={data.dueDate}
            />
          </div>
        )
      }
    </div>
  )
}

export default TodoItem;