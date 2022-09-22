import { todoApp, Project, TodoItem } from ".";

const todos = document.querySelector(".todos");
const projects = document.querySelector(".projectlist");
const inboxBtn = document.querySelector("#inbox");
const completeBtn = document.querySelector("#complete");
const addButtonTemplateHTML = document.querySelector("#add-button-template");
const projectTemplateHTML = document.querySelector("#project-template");
const todoTemplateHTML = document.querySelector("#todo-template");
const addProjectTemplateHTML = document.querySelector("#add-project-template");
const addTodoTemplateHTML = document.querySelector("#add-todo-template");

const LOCAL_STORAGE_PROJECTS_KEY = "todoApp.projects";

let savedTodoApp = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [];

const save = () =>
  localStorage.setItem(
    LOCAL_STORAGE_PROJECTS_KEY,
    JSON.stringify(todoApp.projects)
  );

const renderTodo = (item, todoIndex, projectIndex) => {
  const todoTemplate = document.importNode(todoTemplateHTML.content, true);
  const itemLine = todoTemplate.querySelector("li");
  const check = todoTemplate.querySelector("input");
  const descP = todoTemplate.querySelector("p:first-of-type");
  const dateP = todoTemplate.querySelector("p:last-of-type");
  const editBtn = todoTemplate.querySelector("button:first-of-type");
  const deleteBtn = todoTemplate.querySelector("button:last-of-type");
  descP.textContent = `${item.description}`;
  dateP.textContent = `${item.dueDate}`;
  editBtn.dataset.todoIndex = `${todoIndex}`;
  deleteBtn.dataset.todoIndex = `${todoIndex}`;

  if (item.isComplete === true) {
    check.checked = true;
    descP.classList.add("check");
    dateP.classList.add("check");
  }
  check.addEventListener("change", () => {
    if (check.checked) {
      descP.classList.add("check");
      dateP.classList.add("check");
      item.isComplete = true;
    } else {
      descP.classList.remove("check");
      dateP.classList.remove("check");
      item.isComplete = false;
    }
  });

  editBtn.dataset.projectIndex = projectIndex;
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    inputTodo(projectIndex, todoIndex);
  });

  deleteBtn.dataset.projectIndex = projectIndex;
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeTodo(projectIndex, todoIndex);
  });

  todos.appendChild(itemLine);
};

const removeTodo = (projectIndex, todoIndex) => {
  todoApp.projects[projectIndex].removeTodo(todoIndex);
  clearTodos();
  renderInbox();
};

//RENDER AND SAVE FUNCTION that takes argument where it is now and saves to local storage
const renderAddTodoButton = (projectIndex) => {
  const addButtonTemplate = document.importNode(
    addButtonTemplateHTML.content,
    true
  );
  const addButton = addButtonTemplate.querySelector("li");
  const buttonName = addButtonTemplate.querySelector("p");
  buttonName.textContent = "Add task";
  addButton.addEventListener("click", () => inputTodo(projectIndex));
  todos.appendChild(addButton);
};

// Make global values and create 3 separate functions
const inputTodo = (projectIndex, todoIndex) => {
  todos.removeChild(todos.lastChild);
  const addTodoTemplate = document.importNode(
    addTodoTemplateHTML.content,
    true
  );
  const todoInputForm = addTodoTemplate.querySelector("form");
  const inputDescription = addTodoTemplate.querySelector("input[type=text]");
  const inputDuedate = addTodoTemplate.querySelector("input[type=date]");
  const select = addTodoTemplate.querySelector("select");
  const submitBtn = addTodoTemplate.querySelector("button[type=submit]");
  const cancelBtn = addTodoTemplate.querySelector("button[type=reset]");

  cancelBtn.addEventListener("click", () => {
    todos.removeChild(todos.lastChild);
    renderAddTodoButton(projectIndex);
  });
  // EDIT TODO
  if (todoIndex || todoIndex === 0) {
    const currentTodo = todoApp.projects[projectIndex].todoList[todoIndex];
    inputDescription.value = currentTodo.description;
    inputDuedate.value = currentTodo.dueDate;
    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      currentTodo.editTodo(inputDescription.value, inputDuedate.value);
      renderProjectTodos(projectIndex);
    });
    select.style.display = "none";
    submitBtn.textContent = "Edit";
    todos.appendChild(todoInputForm);
    return;
  }
  // ADD TODO OUTSIDE ANY PROJECT
  if (projectIndex === null) {
    todoApp.projects.forEach((project) => {
      const projectOption = document.createElement("option");
      projectOption.textContent = `${project.description}`;
      projectOption.value = `${project.description}`;
      select.appendChild(projectOption);
    });

    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      projectIndex = todoApp.projects.findIndex(
        (project) => project.description === `${select.value}`
      );
      const todoItem = new TodoItem(inputDescription.value, inputDuedate.value);
      todoApp.projects[projectIndex].addTodo(todoItem);
      renderProjectTodos(projectIndex);
    });
    todos.appendChild(todoInputForm);
  }
  // ADD TODO WITHIN SPECIFIC PROJECT
  else {
    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoItem = new TodoItem(inputDescription.value, inputDuedate.value);
      todoApp.projects[projectIndex].addTodo(todoItem);
      renderProjectTodos(projectIndex);
    });
    select.style.display = "none";
    todos.appendChild(todoInputForm);
  }
};

const clearTodos = () => {
  todos.innerHTML = "";
};

const addProject = () => {
  projects.removeChild(projects.lastChild);
  const addProjectTemplate = document.importNode(
    addProjectTemplateHTML.content,
    true
  );
  const addProjectForm = addProjectTemplate.querySelector("form");
  const projectDescription = addProjectTemplate.querySelector("input");
  const cancelBtn = addProjectTemplate.querySelector('button[type="reset"]');
  projects.appendChild(addProjectForm);

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = new Project(projectDescription.value);
    todoApp.addProject(newProject);
    save();
    console.log(savedTodoApp);
    clearProjects();
    renderProjects();
  });

  cancelBtn.addEventListener("click", () => {
    projects.removeChild(projects.lastChild);
    renderAddProjectButton();
  });
};

export const renderProjects = () => {
  todoApp.projects.forEach((project, projectIndex) => {
    const projectTemplate = document.importNode(
      projectTemplateHTML.content,
      true
    );
    const projectLine = projectTemplate.querySelector("li");
    const projectName = projectTemplate.querySelector("p");
    const deleteBtn = projectTemplate.querySelector("button");
    projectName.textContent = `${project.description}`;

    projectLine.addEventListener("click", () => {
      renderProjectTodos(projectIndex);
    });

    deleteBtn.addEventListener("click", (e) => {
      removeProject(e);
    });
    projects.appendChild(projectLine);
  });
  renderAddProjectButton();
};

const renderAddProjectButton = () => {
  const addButtonTemplate = document.importNode(
    addButtonTemplateHTML.content,
    true
  );
  const addButton = addButtonTemplate.querySelector("li");
  const buttonName = addButtonTemplate.querySelector("p");
  buttonName.textContent = "Add project";
  addButton.addEventListener("click", () => addProject());
  projects.appendChild(addButton);
};

const renderProjectTodos = (projectIndex) => {
  clearTodos();
  todoApp.projects[projectIndex].todoList.forEach((item, todoIndex) => {
    renderTodo(item, todoIndex, projectIndex);
  });
  renderAddTodoButton(projectIndex);
};

const removeProject = (e) => {
  e.stopPropagation();
  const toDelete = e.target.dataset.projectIndex;
  todoApp.removeProject(toDelete);
  clearProjects();
  renderProjects();
  clearTodos();
  renderInbox();
};

const clearProjects = () => {
  projects.innerHTML = "";
};

export const renderInbox = () => {
  todoApp.projects.forEach((project, projectIndex) => {
    project.todoList.forEach((item, todoindex) => {
      renderTodo(item, todoindex, projectIndex);
    });
  });
  renderAddTodoButton(null);
};

const renderCompleted = () => {
  todoApp.projects.forEach((project, projectIndex) => {
    const completedTodos = project.todoList.filter(
      (todo) => todo.isComplete === true
    );
    completedTodos.forEach((item, todoindex) => {
      renderTodo(item, todoindex, projectIndex);
      const check = todos.querySelectorAll("input[type=checkbox]");
      const edit = todos.querySelectorAll("button:first-of-type");
      check.forEach((item) => (item.style.display = "none"));
      edit.forEach((item) => (item.style.display = "none"));
    });
  });
  if (todos.firstChild) {
    const deleteAll = document.createElement("button");
    deleteAll.textContent = "Delete all";
    deleteAll.addEventListener("click", () => deleteCompleted());
    todos.appendChild(deleteAll);
  }
};

const deleteCompleted = () => {
  //TODO
};

/* const removeTodo = (projectIndex, todoIndex) => {
  todoApp.projects[projectIndex].removeTodo(todoIndex);
  clearTodos();
  renderInbox();
}; */

inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});

completeBtn.addEventListener("click", () => {
  clearTodos();
  renderCompleted();
});
