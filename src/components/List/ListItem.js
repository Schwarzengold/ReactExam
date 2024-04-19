import React, { useState } from 'react';
import Checked from '../Icons/Checked';
import Unchecked from '../Icons/Unchecked';
import { format, parseISO } from 'date-fns'; 
import styles from './ListItem.module.css';

const ListItem = (props) => {
  const [changeActive, setChangeActive] = useState(false);
  const [newValue, setNewValue] = useState(props.item.value);
  const [selectedProject, setSelectedProject] = useState('');

  const valueChangeHandler = (event) => {
    setNewValue(event.target.value);
  };

  const todoChangeHandler = () => {
    setChangeActive(true);
  };

  const valueSubmitHandler = () => {
    if (!newValue) return;
    props.onChange(props.item.id, newValue);
    setChangeActive(false);
  };

  const assignToProject = () => {
    props.onAddTaskToProject(props.item, selectedProject);
  };

  const keyPressHandler = (event) => {
    if (event.code === "Enter") valueSubmitHandler();
  };

  const formattedDate = props.item.dueDate ? format(parseISO(props.item.dueDate), 'MMMM d, yyyy') : 'No due date';

  const priorityStyle = props.item.priority === "High" ? styles.highPriority : styles.lowPriority;

  const toRender = changeActive ? (
    <React.Fragment>
      <input
        className={`form-control col-md-8 ${styles.input} `}
        autoFocus
        value={newValue}
        onChange={valueChangeHandler}
        onKeyDown={keyPressHandler}
      />
      <div className={styles.options}>
        <img
          className={styles.img}
          onClick={valueSubmitHandler}
          src={"save.jpg"}
          alt={"Save"}
        />
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <span className={styles.options}>{props.item.value}</span>
       
       
      <div className={styles.options}>
        
      <div className={` d-flex align-items-center ${styles.customdiv}`}>
      <select 
            className={` form-control ${styles.input1}`}
            onChange={e => setSelectedProject(e.target.value)}
            value={selectedProject}
          >
          <option  value="" >Project...</option>
          {props.projects.map(project => (
            <option key={project.name} value={project.name}>{project.name}</option>
          ))}
      </select>

        <button className={`btn btn-primary ${styles.button1}`} onClick={assignToProject}>
          Assign
        </button>

      </div>
      <span className={priorityStyle}>{props.item.priority}</span> 

        <span className={styles.date}>{formattedDate}</span> 

        {props.item.done ? (
          <Checked
            className={styles.img}
            onClick={() => props.onSetDone(props.item.id)}
          />
        ) : (
          <Unchecked
            className={styles.img}
            onClick={() => props.onSetDone(props.item.id)}
          />
        )}

        <img
          className={styles.img}
          onClick={todoChangeHandler}
          src={"change.jpg"}
          alt={"Edit"}
        />
        <img
          className={styles.img}
          onClick={() => props.onRemove(props.item.id)}
          src={"remove.jpg"}
          alt={"Remove"}
        />
      </div>
    </React.Fragment>
  );

  return (
    <li className={`card card-body my-3 ${styles.li} ${props.item.done && styles["li-done"]}`}>
      {toRender}
    </li>
  );
};

export default ListItem;
