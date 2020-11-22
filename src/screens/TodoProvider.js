import React, { useEffect, useState } from 'react';
import shortid from 'shortid';

import TodoContext from '../context/TodoContext';
import {
  getTasks,
  createTask,
  updateTask,
  removeTask,
  removeMutilTask,
  searchTask,
} from '../utils/localStorage';

const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [todosSearch, setTodosSearch] = useState([]);
  const {
    children
  } = props;

  const sortTodoList = (todoList) => {
    let newArray = todoList.sort((a, b) => a.dueDate - b.dueDate)
    setTodos([...newArray]);
  }

  const doAddNewTask = (newTask) => {
    const newArray = createTask({
      id: shortid.generate(),
      dueDate: new Date(newTask.dueDate).getTime(),
      isSelected: false,
      isShow: false,
      ...newTask,
    })
    sortTodoList(newArray);
  }

  const doUpdateTask = (taskUpdate) => {
    let newArray = updateTask(taskUpdate);
    sortTodoList(newArray);
  }

  const doShowDetailTask = (id) => {
    let newArray = todos.map((element) => {
      if (element.id === id) {
        return { ...element, isShow: !element.isShow }
      }
      return { ...element };
    })
    sortTodoList(newArray);
  }

  const onSelectionTask = ({ id, status }) => {
    let newArray = todos.map((element) => {
      if (element.id === id) {
        return { ...element, isSelected: status }
      }
      return { ...element };
    })
    sortTodoList(newArray);
  }

  const doRemoveTask = (id) => {
    let newArray = removeTask(id);
    sortTodoList(newArray);
  }

  const doRemoveMutilTask = () => {
    let arrayID = todos
      .filter((element) => element.isSelected === true)
      .map((element => element.id));
    let newArray = removeMutilTask(arrayID)
    sortTodoList(newArray);
  }

  const doSearchTask = (text) => {
    let todoList = searchTask(text);
    let newArray = todoList.sort((a, b) => a.dueDate - b.dueDate)
    setTodosSearch([...newArray]);
  }

  useEffect(() => {
    sortTodoList(getTasks());
  }, [])

  return (
    <TodoContext.Provider
      value={{
        todos,
        todosSearch,
        doAddNewTask,
        doShowDetailTask,
        doRemoveTask,
        onSelectionTask,
        doRemoveMutilTask,
        doUpdateTask,
        doSearchTask
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;