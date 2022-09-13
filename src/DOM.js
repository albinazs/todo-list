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
      console.log(todoApp);
    });
  });
};

