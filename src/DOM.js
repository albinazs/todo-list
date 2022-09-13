import { demoProject, todoApp } from ".";

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




