import { todoApp } from ".";

const todos = document.querySelector(".todos");
const projects = document.querySelector(".projectlist");

export const createHtmlElement = (type, htmlClass, textContent) => {
  const htmlElement = document.createElement(type);
  if (htmlClass) {
    htmlElement.classList.add(htmlClass);
  }
  if (textContent) {
    htmlElement.textContent = textContent;
  }
  return htmlElement;
};

const renderTodos = (item, index) => {
  const itemLine = createHtmlElement("li", null, null);

  const check = createHtmlElement("input", null, null);
  check.setAttribute("type", "checkbox");
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
    "delete"
  );
  deleteBtn.dataset.index = index;
  //connect with project!
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("todes");
    const toDelete = e.target.dataset.index;
    todoApp.removeProject(toDelete);
  });
  itemLine.appendChild(check);
  itemLine.appendChild(descP);
  itemLine.appendChild(dateP);
  itemLine.appendChild(editBtn);
  itemLine.appendChild(deleteBtn);
  todos.appendChild(itemLine);
  console.log("hello");
};

const clearTodos = () => {
  todos.innerHTML = "";
};

const removeTodo = (e) => {
  let toremove = e.target.dataset.index;
};

export const renderProjects = () => {
  todoApp.projects.forEach((project, index) => {
    const projectLine = createHtmlElement("li", null, null);
    const icon = createHtmlElement("span", "material-symbols-outlined", "list");
    const projectName = createHtmlElement("p", null, `${project.description}`);
    const deleteBtn = createHtmlElement(
      "button",
      "material-symbols-outlined",
      "delete"
    );
    deleteBtn.dataset.index = index;
    projectLine.appendChild(icon);
    projectLine.appendChild(projectName);
    projectLine.appendChild(deleteBtn);
    projectLine.addEventListener("click", () => {
      clearTodos();
      project.todoList.forEach((item, index) => {
        renderTodos(item, index);
      });
    });
    deleteBtn.addEventListener("click", (e) => {
      removeProject(e);
      clearTodos();
      renderInbox();
    });

    projects.appendChild(projectLine);
  });
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
      renderTodos(item, index);
    });
  });
};

const inboxBtn = document.querySelector("#inbox");
inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});
