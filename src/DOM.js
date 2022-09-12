import { demoProject } from "./index.js";

const createHtmlElement = (type, htmlClass, textContent) => {
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
console.log(todos);

export const renderTodos = () => {
  demoProject.todoList.forEach((item) => {
    const itemLine = createHtmlElement("p", null, `${item.description}`);
    todos.appendChild(itemLine);
    console.log(itemLine);
  });
};
