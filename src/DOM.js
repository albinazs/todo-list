import { toDate, compareAsc, format } from "date-fns";
import { todoApp, Project, TodoItem } from ".";
import { Storage } from "./storage";

const todos = document.querySelector(".todos");
const projects = document.querySelector(".projectlist");
const aside = document.querySelector("aside");
const toggleSidebar = document.querySelector(".toggle-sidebar");
const nav = document.querySelector(".nav");
const navLine = nav.querySelectorAll("button");
const inboxBtn = document.querySelector("[data-index='inbox']");
const todayBtn = document.querySelector("[data-index='today']");
const weekBtn = document.querySelector("[data-index='week']");
//const completeBtn = document.querySelector("#complete");
const addButtonTemplateHTML = document.querySelector("#add-button-template");
const projectTemplateHTML = document.querySelector("#project-template");
const todoTemplateHTML = document.querySelector("#todo-template");
const addProjectTemplateHTML = document.querySelector("#add-project-template");
const addTodoTemplateHTML = document.querySelector("#add-todo-template");
let selectedIndex;

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
  Storage.removeTodo(projectIndex, todoIndex);
  clearTodos();
  renderProjectTodos(projectIndex);
};

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
      const dueDate = format(new Date(inputDuedate.value), "dd/MM/yyyy");
      Storage.editTodo(
        projectIndex,
        todoIndex,
        inputDescription.value,
        dueDate
      );
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
      const dueDate = format(new Date(inputDuedate.value), "dd/MM/yyyy");
      const todoItem = new TodoItem(inputDescription.value, dueDate);
      Storage.addTodo(projectIndex, todoItem);
      renderProjectTodos(projectIndex);
    });
    todos.appendChild(todoInputForm);
  }
  // ADD TODO WITHIN SPECIFIC PROJECT
  else {
    todoInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dueDate = format(new Date(inputDuedate.value), "dd/MM/yyyy");
      const todoItem = new TodoItem(inputDescription.value, dueDate);
      Storage.addTodo(projectIndex, todoItem);
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
    if (Storage.getTodoApp().contains(projectDescription.value)) {
      projectDescription.value = "";
      alert("Project names must be different");
      return;
    }
    const newProject = new Project(projectDescription.value);
    Storage.addProject(newProject);
    const projectIndex = Storage.getTodoApp().getIndex(
      projectDescription.value
    );
    clearProjects();
    renderProjects();
    renderProjectTodos(projectIndex);
  });

  cancelBtn.addEventListener("click", () => {
    projects.removeChild(projects.lastChild);
    renderAddProjectButton();
  });
};

nav.addEventListener("click", (e) => {
  navLine.forEach((line) => line.classList.remove("active"));
  if (e.target.dataset.index === "inbox") {
    document.querySelector("#inbox").classList.add("active");
  } else if (e.target.dataset.index === "today") {
    document.querySelector("#today").classList.add("active");
  } else if (e.target.dataset.index === "week") {
    document.querySelector("#week").classList.add("active");
  } else if (e.target.dataset.index === "complete") {
    document.querySelector("#complete").classList.add("active");
  }
  selectedIndex = null;
  clearProjects();
  renderProjects();
});

projects.addEventListener("click", (e) => {
  navLine.forEach((line) => line.classList.remove("active"));
  if (e.target.dataset.index) {
    selectedIndex = e.target.dataset.index;
    clearProjects();
    renderProjects();
  } else if (e.target.closest("[data-index]")) {
    selectedIndex = e.target.parentElement.getAttribute("data-index");
    clearProjects();
    renderProjects();
  }
});

export const renderProjects = () => {
  Storage.getTodoApp()
    .getProjects()
    .forEach((project, projectIndex) => {
      const projectTemplate = document.importNode(
        projectTemplateHTML.content,
        true
      );
      const projectLine = projectTemplate.querySelector("li");
      const projectName = projectTemplate.querySelector("p");
      const deleteBtn = projectTemplate.querySelector("button");
      projectLine.dataset.index = projectIndex;

      deleteBtn.dataset.projectIndex = projectIndex;
      projectName.textContent = `${project.description}`;

      if (projectIndex == selectedIndex) {
        projectLine.classList.add("active");
      }

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
  const projectName = Storage.getTodoApp()
    .getProjects()
    [projectIndex].getDescription();
  renderHeader(projectName);
  Storage.getTodoApp()
    .getProjects()
    [projectIndex].getTodos()
    .forEach((item, todoIndex) => {
      renderTodo(item, todoIndex, projectIndex);
    });
  renderAddTodoButton(projectIndex);
};

const removeProject = (e) => {
  e.stopPropagation();
  const toDelete = e.target.dataset.projectIndex;
  Storage.removeProject(toDelete);
  clearProjects();
  renderProjects();
  clearTodos();
  renderInbox();
};

const clearProjects = () => {
  projects.innerHTML = "";
};

const renderHeader = (header) => {
  const headerName = document.createElement("h4");
  headerName.textContent = header;
  todos.appendChild(headerName);
};

const renderWelcome = () => {
  const headerName = document.createElement("p");
  headerName.textContent = "Please create your first project";
  todos.appendChild(headerName);
};

export const renderInbox = () => {
  renderHeader("Inbox");
  Storage.getTodoApp()
    .getProjects()
    .forEach((project, projectIndex) => {
      project.todoList.forEach((item, todoindex) => {
        renderTodo(item, todoindex, projectIndex);
      });
    });
  if (Storage.getTodoApp().getProjects().length != 0) {
    renderAddTodoButton(null);
  } else {
    renderWelcome();
  }
};

inboxBtn.addEventListener("click", () => {
  clearTodos();
  renderInbox();
});

toggleSidebar.addEventListener("click", () => {
  aside.classList.toggle("aside-hide");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 960) {
    aside.classList.remove("aside-hide");
  }
});

todayBtn.addEventListener("click", () => {
  renderToday();
});

const renderToday = () => {
  clearTodos();
  renderHeader("Today");
  Storage.getTodoApp()
    .getProjects()
    .forEach((project, projectIndex) => {
      project.getTodayTodos().forEach((item, todoindex) => {
        renderTodo(item, todoindex, projectIndex);
      });
    });
};

weekBtn.addEventListener("click", () => {
  renderThisWeek();
});

const renderThisWeek = () => {
  clearTodos();
  renderHeader("Next 7 days");
  Storage.getTodoApp()
    .getProjects()
    .forEach((project, projectIndex) => {
      project.getThisWeekTodos().forEach((item, todoindex) => {
        renderTodo(item, todoindex, projectIndex);
      });
    });

  /* const sorted = weekTodos.sort((todo1, todo2) =>
    compareAsc(
      toDate(new Date(todo1.getDateFormatted())),
      toDate(new Date(todo2.getDateFormatted()))
    )
  );
  console.log(sorted) */
};

/* 

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

completeBtn.addEventListener("click", () => {
  clearTodos();
  renderCompleted();
}); 

*/
