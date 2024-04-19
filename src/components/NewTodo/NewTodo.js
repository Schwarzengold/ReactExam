import React, { useState } from 'react';
import styles from './NewTodo.module.css';

const NewItem = (props) => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low"); 
  const [projectName, setProjectName] = useState("");

  const buttonClickHandler = () => {
    if (todo) {
      props.onNewTodo({
        id: Math.random().toString(16),
        value: todo,
        done: false,
        dueDate: dueDate ? new Date(dueDate).toISOString() : "",
        priority  
      });
    }
    setTodo("");
    setDueDate("");
    setPriority("Low"); 
  };

  const createProjectHandler = () => {
    if (projectName) {
      props.onNewProject(projectName);
      setProjectName("");
    }
  };

  return (
    <div className={`card card-body my-3 ${styles.shadow} ${styles.bg}`}>
      <h3 className={`text-capitalize text-center ${styles.gradienttext}`}>
        My To-Do List
      </h3>
      <div className="container">
        <div className="mb-3 d-flex align-items-center">
          <input
            className={`form-control ${styles.input} me-2`}
            onChange={(event) => setTodo(event.target.value)}
            placeholder="New Todo"
            value={todo}
          />
          <input
            type="date"
            className={`form-control ${styles.input} me-2`}
            onChange={(event) => setDueDate(event.target.value)}
            value={dueDate}
          />
          <div className={`${styles.prioritySelector} ${styles.input}`}>
            <input
              type="radio"
              id="priorityLow"
              name="priority"
              value="Low"
              checked={priority === "Low"}
              onChange={() => setPriority("Low")}
            />
            <label htmlFor="priorityLow" className="me-2">Low</label>
            <input
              type="radio"
              id="priorityHigh"
              name="priority"
              value="High"
              checked={priority === "High"}
              onChange={() => setPriority("High")}
            />
            <label htmlFor="priorityHigh">High</label>
          </div>
        </div>
        <div className={`mb-3 ${styles.center}`}>
          <button
            className={`btn btn-primary ${styles.button1}`}
            onClick={buttonClickHandler}
          >
            Add new task
          </button>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <input
            className={`form-control ${styles.input} me-2`}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="New Project Name"
            value={projectName}
          />
          <button className={`btn btn-primary ${styles.button1}`} onClick={createProjectHandler}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
