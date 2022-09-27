import { todoApp, Project, TodoItem } from "./todoApp";

export class Storage {
  static saveTodoApp() {
    localStorage.setItem("todoApp", JSON.stringify(todoApp));
  }

  static getTodoApp() {
    const TodoApp = Object.assign(
      Object.create(todoApp),
      JSON.parse(localStorage.getItem("todoApp"))
    );

    TodoApp.setProjects(
      TodoApp.getProjects().map((project) =>
        Object.assign(new Project(), project)
      )
    );

    TodoApp
      .getProjects()
      .forEach((project) =>
        project.setTodos(
          project.getTodos().map((todo) => Object.assign(new TodoItem(), todo))
        )
      );

    return TodoApp;
  }

  static addProject(project) {
    todoApp.addProject(project);
    Storage.saveTodoApp();
  }

  static removeProject(projectIndex) {
    todoApp.removeProject(projectIndex);
    Storage.saveTodoApp();
  }

  static addTodo(projectIndex, todoItem) {
    todoApp.projects[projectIndex].addTodo(todoItem);
    Storage.saveTodoApp();
  }

  static removeTodo(projectIndex, todoIndex) {
    todoApp.projects[projectIndex].removeTodo(todoIndex);
    Storage.saveTodoApp();
  }

  static editTodo(projectIndex, todoIndex, newDescription, newDueDate) {
    todoApp.projects[projectIndex].todoList[todoIndex].editTodo(newDescription, newDueDate)
    Storage.saveTodoApp();
  }

}
