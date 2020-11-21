import React, { useContext, useState } from 'react';

import './TodoPage.css';
import {
  Button,
  TextInput,
} from '../components/common';

import { TaskForm } from '../components/form';
import TodoItem from './TodoItemList';
import TodoContext from '../context/TodoContext';

const TodoPage = () => {
  const {
    todos,
    todosSearch,
    addNewTask,
    removeMutilTask,
    doSearchTask,
  } = useContext(TodoContext);
  const [searchText, setSearchText] = useState('');

  console.log(`------- todos ------- TodoPage`);
  console.log(todos);
  console.log(`------- todos ------- TodoPage`);

  const doCreateNewTask = (data) => {
    addNewTask(data);
  }

  const handleSearchInput = (event) => {
    setSearchText(event.target.value);
    doSearchTask(event.target.value);
  }

  return (
    <div className="container">
      <div className="main">
        <div className="new-task">
          <div className="header">
            <h3>New Task</h3>
          </div>
          <TaskForm
            onChangeValue={(value) => doCreateNewTask(value)}
          />
        </div>
        <div className="task-list">
          <div className="header">
            <h3>To Do List</h3>
          </div>
          <div className="content">
            <TextInput
              placeholder="Search..."
              value={searchText}
              onChange={(event) => handleSearchInput(event)}
            />
            <div className="todo-list">
              {
                searchText === '' && todos.map((item) => {
                  return (
                    <TodoItem key={item.id} data={item} />
                  )
                })
              }
              {
                searchText !== '' && todosSearch.map((item) => {
                  return (
                    <TodoItem key={item.id} data={item} />
                  )
                })
              }
            </div>
          </div>
          <div className="footer">
            <span>Bulk Action:</span>
            <div>
              <Button className="button-done">
                Done
              </Button>
              <Button
                color="red"
                onClick={() => removeMutilTask()}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
