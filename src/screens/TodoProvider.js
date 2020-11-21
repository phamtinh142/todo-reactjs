import React, { useEffect, useState } from 'react';
import shortid from 'shortid';

import TodoContext from '../context/TodoContext';
import {
  getTasks,
  createTask,
  updateTask,
  removeValue,
  removeMutilValue,
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

  const addNewTask = (newTask) => {
    const newTasks = createTask({
      id: shortid.generate(),
      dueDate: new Date(newTask.dueDate).getTime(),
      isSelected: false,
      isShow: false,
      ...newTask,
    })
    sortTodoList(newTasks);
  }

  const doUpdateTask = (taskUpdate) => {
    let newArray = updateTask(taskUpdate);
    sortTodoList(newArray);
  }

  const showDetailTask = (id) => {
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

  const removeTask = (id) => {
    let newArray = removeValue(id);
    sortTodoList(newArray);
  }

  const removeMutilTask = () => {
    let arrayID = todos
      .filter((element) => element.isSelected === true)
      .map((element => element.id));
    let newArray = removeMutilValue(arrayID)
    sortTodoList(newArray);
  }

  const doSearchTask = (text) => {
    searchTask(text);
    
  }

  useEffect(() => {
    sortTodoList(getTasks());
  }, [])

  return (
    <TodoContext.Provider
      value={{
        todos,
        todosSearch,
        addNewTask,
        showDetailTask,
        removeTask,
        onSelectionTask,
        removeMutilTask,
        doUpdateTask,
        doSearchTask
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider;