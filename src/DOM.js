import { todoApp } from ".";

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

const todos = document.querySelector(".todos");

export const renderInbox = () => {
  todoApp.projects.forEach((project) => {
    project.todoList.forEach((item) => {
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
      itemLine.appendChild(check);
      itemLine.appendChild(descP);
      itemLine.appendChild(dateP);
      itemLine.appendChild(editBtn);
      itemLine.appendChild(deleteBtn);
      todos.appendChild(itemLine);
      console.log("hello");
    });
  });
};

//Extract render todo to reuse
const renderTodos = () => {};

const clearTodos = () => {
  todos.innerHTML = "";
};

const projects = document.querySelector(".projectlist");

export const renderProjects = () => {
  todoApp.projects.forEach((project) => {
    const projectLine = createHtmlElement("li", null, null);
    const icon = createHtmlElement("span", "material-symbols-outlined", "list");
    const projectName = createHtmlElement("p", null, `${project.description}`);
    projectLine.appendChild(icon);
    projectLine.appendChild(projectName);
    projectLine.addEventListener("click", () => {
      clearTodos();
      //Ectract render todo function
      project.todoList.forEach((item) => {
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
        itemLine.appendChild(check);
        itemLine.appendChild(descP);
        itemLine.appendChild(dateP);
        itemLine.appendChild(editBtn);
        itemLine.appendChild(deleteBtn);
        todos.appendChild(itemLine);
        console.log("hello");
      });
    });
    projects.appendChild(projectLine);
  });
};

const inboxBtn = document.querySelector("#inbox");
inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});

//const renderProjectTodos = (project) => {
//project.
//}
