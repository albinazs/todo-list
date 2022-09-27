import "./style.css";
import { toDate, isToday, isThisWeek } from "date-fns";
import { renderInbox, renderProjects } from "./DOM";
import { Storage } from "./storage";

export class TodoItem {
  constructor(description, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = false;
  }

  editTodo(newDescription, newDueDate) {
    this.description = newDescription;
    this.dueDate = newDueDate;
  }

  completeTodo() {
    this.isComplete = false;
  }

  getDateFormatted() {
    const day = this.dueDate.split("/")[0];
    const month = this.dueDate.split("/")[1];
    const year = this.dueDate.split("/")[2];
    return `${month}/${day}/${year}`;
  }
}

export class Project {
  constructor(description) {
    this.description = description;
    this.todoList = [];
  }

  getDescription() {
    return this.description;
  }

  editProject(newDescription) {
    this.description = newDescription;
  }

  setTodos(todos) {
    this.todoList = todos;
  }

  getTodos() {
    return this.todoList;
  }

  addTodo(todoItem) {
    this.todoList.push(todoItem);
  }

  removeTodo(index) {
    this.todoList.splice(index, 1);
  }

  getTodayTodos() {
    return this.todoList.filter((todo) =>
      isToday(toDate(new Date(todo.getDateFormatted())))
    );
  }

  getThisWeekTodos() {
    return this.todoList.filter((todo) =>
      isThisWeek(toDate(new Date(todo.getDateFormatted())))
    );
  }
}

export let todoApp = {
  projects: [],

  setProjects(projects) {
    this.projects = projects;
  },

  getProjects() {
    return this.projects;
  },

  contains(projectName) {
    return this.projects.some(
      (project) => project.getDescription() === projectName
    );
  },

  getIndex(projectName) {
    return this.projects.findIndex(
      (project) => project.getDescription() === projectName
    );
  },

  addProject(project) {
    this.projects.push(project);
  },

  removeProject(index) {
    this.projects.splice(index, 1);
  },
};

//function loadHomePage

/* 
const demoProject = new Project("Demo project");
const demoProject2 = new Project("Demo project2");

const toClean = new TodoItem("to clean bath", "5pm");
const toRun = new TodoItem("to run", "5.09");
const toClean2 = new TodoItem("to clean room", "2pm");

demoProject.addTodo(toClean);
demoProject2.addTodo(toClean2);
demoProject2.addTodo(toRun);

Storage.addProject(demoProject);
Storage.addProject(demoProject2); */

todoApp = Storage.getTodoApp() || Object.create(todoApp);

renderInbox();
renderProjects();

/* 
TODO

-- to add ascending sort for week
-- to finalise complete todos logics
-- to stay where we are after editing/deleting todos

-- if im inbox - highloght it. if i remove from inbox - stay there
-- reorganise code in logical order (DOM) + 
maybe leave index for init, 
and store data structures in separate file
-- readme file
https://github.com/khunhour/todo_list/tree/main/dist

 */
