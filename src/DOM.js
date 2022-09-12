import { demoProject } from "./index.js";

const createHtmlElement = (type, htmlClass, textContent) => {
  const htmlElement = document.createElement(type);
  if (htmlClass) {
    htmlElement.classList.add(htmlClass);
  }
  if (textContent) {
    document.textContent = textContent;
  }
  return htmlElement;
};

const todos = document.querySelector(".todos");
console.log(todos);

const div = document.querySelector("div");
console.log(div);

export const renderTodos = () => {
  demoProject.todoList.forEach((item) => {
    const itemLine = createHtmlElement("p", null, `${item.description}`);
    console.log(itemLine);
    todos.appendChild(itemLine);
  });
};
