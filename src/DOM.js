import { todoApp, Project, TodoItem } from ".";

const todos = document.querySelector(".todos");
const projects = document.querySelector(".projectlist");
const inboxBtn = document.querySelector("#inbox");
const addProjectBtn = document.querySelector(".addproject");

export const createHtmlElement = (
  tag,
  htmlClass,
  textContent,
  type,
  projectIndex,
  todoIndex
) => {
  const htmlElement = document.createElement(tag);
  if (htmlClass) {
    htmlElement.classList.add(htmlClass);
  }
  if (textContent) {
    htmlElement.textContent = textContent;
  }
  if (type) {
    htmlElement.setAttribute("type", type);
  }
  if (projectIndex) {
    htmlElement.dataset.projectIndex = projectIndex;
  }
  if (todoIndex) {
    htmlElement.dataset.todoIndex = todoIndex;
  }
  return htmlElement;
};

const renderTodo = (item, todoIndex, projectIndex) => {
  const itemLine = createHtmlElement("li", null, null);
  const check = createHtmlElement("input", null, null, "checkbox");
  const descP = createHtmlElement("p", null, `${item.description}`);
  const dateP = createHtmlElement("p", null, `${item.dueDate}`);
  const editBtn = createHtmlElement(
    "button",
    "material-symbols-outlined",
    "edit",
    null,
    null,
    `${todoIndex}`
  );
  const deleteBtn = createHtmlElement(
    "button",
    "material-symbols-outlined",
    "delete",
    null,
    null,
    `${todoIndex}`
  );

  check.addEventListener("change", () => {
    if (check.checked) {
      descP.classList.add("check");
      dateP.classList.add("check");
      item.isComplete = true;
      console.log(item.isComplete);
    } else {
      descP.classList.remove("check");
      dateP.classList.remove("check");
      item.isComplete = false;
      console.log(item.isComplete);
    }
  });

  //DOESNT WORK!

  editBtn.dataset.projectIndex = projectIndex;
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("yap");
    inputTodo(e);
    clearTodos();
    //where are you on a page?
    renderInbox();
  });

  deleteBtn.dataset.projectIndex = projectIndex;
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    todoApp.projects[e.target.dataset.projectIndex].removeTodo(
      e.target.dataset.todoIndex
    );
    clearTodos();
    //where are you on a page?
    renderInbox();
  });

  itemLine.appendChild(check);
  itemLine.appendChild(descP);
  itemLine.appendChild(dateP);
  itemLine.appendChild(editBtn);
  itemLine.appendChild(deleteBtn);
  todos.appendChild(itemLine);
};

const renderAddTodoButton = (projectIndex) => {
  const addTodo = createHtmlElement(
    "button",
    null,
    "+Add task",
    null,
    //here null turned into a template string
    `${projectIndex}`
  );
  addTodo.addEventListener("click", (e) => inputTodo(e));
  todos.appendChild(addTodo);
};

const inputTodo = (e) => {
  console.log(todos.lastChild);
  todos.removeChild(todos.lastChild);
  const todoInputForm = createHtmlElement("form", null, null);
  const inputDescription = createHtmlElement("input", null, null, "text");
  const inputDuedate = createHtmlElement("input", null, null, "text");
  const select = createHtmlElement("select", null, null);
  const submitBtn = createHtmlElement("button", null, "Add", "submit");
  const cancelBtn = createHtmlElement("button", null, "Cancel", "reset");

  inputDescription.required = true;
  inputDescription.setAttribute("placeholder", "Task description");
  select.setAttribute("name", "projects");

  //how to optimize? extract and render all again?
  cancelBtn.addEventListener("click", () => {
    todos.removeChild(todos.lastChild);
    renderAddTodoButton(e.target.dataset.projectIndex);
  });

  //abstract away these functions
  if (e.target.dataset.projectIndex == "null") {
    todoApp.projects.forEach((project) => {
      const projectOption = createHtmlElement(
        "option",
        null,
        `${project.description}`
      );
      projectOption.setAttribute("value", `${project.description}`);
      select.appendChild(projectOption);
    });
    console.log("YYYEP");

    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(todoApp);
      const currentProjectIndex = todoApp.projects.findIndex(
        (project) => project.description === `${select.value}`
      );

      const todoItem = new TodoItem(inputDescription.value, inputDuedate.value);
      todoApp.projects[currentProjectIndex].addTodo(todoItem);
      console.log(todoApp);
      renderProjectTodos(currentProjectIndex);
    });

    todoInputForm.appendChild(inputDescription);
    todoInputForm.appendChild(inputDuedate);
    todoInputForm.appendChild(select);
    todoInputForm.appendChild(submitBtn);
    todoInputForm.appendChild(cancelBtn);
    todos.appendChild(todoInputForm);
  } else {
    const currentProjectIndex = e.target.dataset.projectIndex;

    console.log("test");
    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoItem = new TodoItem(inputDescription.value, inputDuedate.value);
      todoApp.projects[currentProjectIndex].addTodo(todoItem);
      console.log(todoApp);
      renderProjectTodos(currentProjectIndex);
    });

    todoInputForm.appendChild(inputDescription);
    todoInputForm.appendChild(inputDuedate);
    todoInputForm.appendChild(submitBtn);
    todoInputForm.appendChild(cancelBtn);
    todos.appendChild(todoInputForm);
  }
};

const clearTodos = () => {
  todos.innerHTML = "";
};

const addProject = () => {
  console.log("ok");
  const projectInputForm = createHtmlElement("form", null, null);
  const projectDescription = createHtmlElement("input", null, null, "text");
  const submitBtn = createHtmlElement("button", null, "Add", "submit");
  const cancelBtn = createHtmlElement("button", null, "Cancel", "reset");

  projectDescription.required = true;

  projectInputForm.appendChild(projectDescription);
  projectInputForm.appendChild(submitBtn);
  projectInputForm.appendChild(cancelBtn);
  projects.appendChild(projectInputForm);

  projectInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = new Project(projectDescription.value);
    todoApp.addProject(newProject);
    console.log(todoApp);
    clearProjects();
    renderProjects();
  });
};

export const renderProjects = () => {
  todoApp.projects.forEach((project, projectIndex) => {
    const projectLine = createHtmlElement("li", null, null);
    const icon = createHtmlElement("span", "material-symbols-outlined", "list");
    const projectName = createHtmlElement("p", null, `${project.description}`);
    const deleteBtn = createHtmlElement(
      "button",
      "material-symbols-outlined",
      "delete",
      null,
      `${projectIndex}`
    );
    projectLine.appendChild(icon);
    projectLine.appendChild(projectName);
    projectLine.appendChild(deleteBtn);
    projectLine.addEventListener("click", () => {
      renderProjectTodos(projectIndex);
    });
    deleteBtn.addEventListener("click", (e) => {
      removeProject(e);
      clearTodos();
      renderInbox();
    });

    projects.appendChild(projectLine);
  });
};

const renderProjectTodos = (projectIndex) => {
  clearTodos();
  todoApp.projects[projectIndex].todoList.forEach((item, index) => {
    renderTodo(item, index);
  });
  renderAddTodoButton(projectIndex);
};

const removeProject = (e) => {
  e.stopPropagation();
  console.log("yes");
  const toDelete = e.target.dataset.projectIndex;
  todoApp.removeProject(toDelete);
  clearProjects();
  renderProjects();
  console.log(todoApp);
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

inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});

addProjectBtn.addEventListener("click", () => addProject());
