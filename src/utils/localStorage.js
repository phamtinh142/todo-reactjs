function getTasks() {
  if (typeof Storage !== 'undefined') {
    const todoList = localStorage.getItem('todos');
    if (todoList !== 'undefined' && todoList !== null) {
      return JSON.parse(todoList);
    }
    return [];
  }
}

function saveTasks(value) {
  localStorage.setItem('todos', JSON.stringify(value));
}

function createTask(value) {
  let todoList = getTasks();
  todoList.push(value);
  saveTasks(todoList);
  return todoList;
}

function updateTask(task) {
  let todoList = getTasks();
  let newArray = todoList.map((element) => {
    if (element.id === task.id) {
      return { ...task };
    }
    return { ...element };
  })
  saveTasks(newArray);
  return newArray;
}

function removeTask(id) {
  let todoList = getTasks();
  let newArray = todoList.filter((element) => id !== element.id);
  saveTasks(newArray)
  return newArray;
}

function removeMutilTask(arrayID) {
  let taskList = getTasks();
  let newArray = taskList.filter((element) => !arrayID.includes(element.id));
  saveTasks(newArray);
  return newArray;
}

function searchTask(str) {
  let taskList = getTasks();
  let newArray = taskList.filter((element) => element.taskName.toLowerCase().match(str.toLowerCase()))
  return newArray;
}

export {
  getTasks,
  createTask,
  removeTask,
  removeMutilTask,
  updateTask,
  searchTask,
};