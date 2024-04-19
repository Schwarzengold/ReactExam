import React, { useState } from "react";
import List from "./components/List/List";
import NewTodo from "./components/NewTodo/NewTodo";
import Actions from "./components/Actions/Actions";
import ProjectList from './components/Project/ProjectList'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const filteredTodos = (() => {

    switch (filter) {
      case "All":
        return todos;
      case "Done":
        return todos.filter(todo => todo.done);
      case "Todo":
        return todos.filter(todo => !todo.done);
      case "HighPriority":
        return todos.filter(todo => todo.priority === "High");
      case "LowPriority":
        return todos.filter(todo => todo.priority === "Low");
        case "ByDate":
        return todos.filter(todo => todo.dueDate && new Date(todo.dueDate).toDateString() === new Date(filterDate).toDateString());
      default:
        return todos;
    }
  })();
  
  const removeProjectHandler = (projectName) => {
    setProjects(prevState => prevState.filter(project => project.name !== projectName));
  };

  const newTodoHandler = (todo) => {
    setTodos(prevState => [...prevState, todo]);
  };

  const newProjectHandler = (projectName) => {
    setProjects(prevState => [...prevState, { name: projectName, tasks: [] }]);
  };

  const addTaskToProject = (task, projectName) => {
    setProjects(prevState => prevState.map(p => {
      if (p.name === projectName) {
        return { ...p, tasks: [...p.tasks, task] };
      }
      return p;
    }));
  };

  const setDoneHandler = (id) => {
    setTodos(prevState => prevState.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const removeTodoHandler = (id) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
  };

  const todoChangeHandler = (id, value) => {
    setTodos(prevState => prevState.map(todo => todo.id === id ? { ...todo, value } : todo));
  };

  const filterHandler = (type) => () => {
    setFilter(type);
  };

  const showByDate = (date) => {
    setFilterDate(date);
    setFilter("ByDate");
  };

  return (
    <div className="container">
      <div className="row justify-content-center"> 
        <div className="col-lg-10 col-md-10 col-sm-12"> 
      <NewTodo onNewTodo={newTodoHandler} onNewProject={newProjectHandler}/>
      <List
        showDone={filterHandler("Done")}
        showAll={filterHandler("All")}
        showTodo={filterHandler("Todo")}
        showHighPriority={filterHandler("HighPriority")}
        showLowPriority={filterHandler("LowPriority")}
        showByDate={showByDate}
        onSetDone={setDoneHandler}
        onRemove={removeTodoHandler}
        onChange={todoChangeHandler}
        items={filteredTodos}
        filter={filter}
        projects={projects}
        onAddTaskToProject={addTaskToProject}

      />
      <Actions
        onRemoveAll={() => setTodos([])} 
        onRemoveDone={() => setTodos(todos.filter(todo => !todo.done))} 
      />
      <ProjectList projects={projects} onRemoveProject={removeProjectHandler} />
      </div>
      </div>
    </div>
  );
}

export default App;
