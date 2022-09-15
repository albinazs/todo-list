import { todoApp, TodoItem } from ".";

const todos = document.querySelector(".todos");
const projects = document.querySelector(".projectlist");

export const createHtmlElement = (
  tag,
  htmlClass,
  textContent,
  type,
  dataIndex
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
  if (dataIndex) {
    htmlElement.dataset.index = dataIndex;
  }
  return htmlElement;
};

const renderTodo = (item, index) => {
  const itemLine = createHtmlElement("li", null, null);
  const check = createHtmlElement("input", null, null, "checkbox");
  const descP = createHtmlElement("p", null, `${item.description}`);
  const dateP = createHtmlElement("p", null, `${item.dueDate}`);
  const editBtn = createHtmlElement(
    "button",
    "material-symbols-outlined",
    "edit"
  );
  const deleteBtn = createHtmlElement(
    "button",
    "material-symbols-outlined",
    "delete",
    null,
    `${index}`
  );

  //connect with project!
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    //console.log("todes");
    //const toDelete = e.target.dataset.index;
    //todoApp.removeProject(toDelete);
  });
  itemLine.appendChild(check);
  itemLine.appendChild(descP);
  itemLine.appendChild(dateP);
  itemLine.appendChild(editBtn);
  itemLine.appendChild(deleteBtn);
  todos.appendChild(itemLine);
};

const renderAddTodoButton = (index) => {
  const addTodo = createHtmlElement(
    "button",
    "addtodo",
    "+Add task",
    null,
    //here null turned into a template string
    `${index}`
  );
  addTodo.addEventListener("click", (e) => inputTodo(e));
  todos.appendChild(addTodo);
};

const inputTodo = (e) => {
  todos.removeChild(todos.lastChild);
  const todoInputForm = createHtmlElement("form", null, null);
  const inputDescription = createHtmlElement("input", null, null, "text");
  const inputDuedate = createHtmlElement("input", null, null, "text");
  const select = createHtmlElement("select", null, null);
  const submitBtn = createHtmlElement("button", null, "Add", "submit");

  inputDescription.required = true;
  inputDescription.setAttribute("placeholder", "Task description");
  select.setAttribute("name", "projects");

  console.log(e.target.dataset.index);

  //abstract away these functions
  if (e.target.dataset.index == "null") {
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

    //abstract away
    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(todoApp);
      console.log(select.value);
      const currentProjectIndex = todoApp.projects.findIndex(
        (project) => project.description === `${select.value}`
      );

      console.log(currentProjectIndex);
      const todoItem = new TodoItem(inputDescription.value, inputDuedate.value);
      todoApp.projects[currentProjectIndex].addTodo(todoItem);
      console.log(todoApp);
      renderProjectTodos(currentProjectIndex);
    });

    todoInputForm.appendChild(inputDescription);
    todoInputForm.appendChild(inputDuedate);
    todoInputForm.appendChild(select);
    todoInputForm.appendChild(submitBtn);
    todos.appendChild(todoInputForm);
  } else {
    const currentProjectIndex = e.target.dataset.index;

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
    todos.appendChild(todoInputForm);
  }
};

const clearTodos = () => {
  todos.innerHTML = "";
};

export const renderProjects = () => {
  todoApp.projects.forEach((project, index) => {
    const projectLine = createHtmlElement("li", null, null);
    const icon = createHtmlElement("span", "material-symbols-outlined", "list");
    const projectName = createHtmlElement("p", null, `${project.description}`);
    const deleteBtn = createHtmlElement(
      "button",
      "material-symbols-outlined",
      "delete",
      null,
      `${index}`
    );
    projectLine.appendChild(icon);
    projectLine.appendChild(projectName);
    projectLine.appendChild(deleteBtn);
    projectLine.addEventListener("click", () => {
      renderProjectTodos(index);
    });
    deleteBtn.addEventListener("click", (e) => {
      removeProject(e);
      clearTodos();
      renderInbox();
    });

    projects.appendChild(projectLine);
  });
};

const renderProjectTodos = (index) => {
  clearTodos();
  todoApp.projects[index].todoList.forEach((item, index) => {
    renderTodo(item, index);
  });
  renderAddTodoButton(index);
};

const removeProject = (e) => {
  e.stopPropagation();
  console.log("yes");
  const toDelete = e.target.dataset.index;
  todoApp.removeProject(toDelete);
  clearProjects();
  renderProjects();
  console.log(todoApp);
  //do i need to remove todos separately?
};

const clearProjects = () => {
  projects.innerHTML = "";
};

export const renderInbox = () => {
  todoApp.projects.forEach((project) => {
    project.todoList.forEach((item, index) => {
      renderTodo(item, index);
    });
  });
  renderAddTodoButton(null);
};

const inboxBtn = document.querySelector("#inbox");
inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});
