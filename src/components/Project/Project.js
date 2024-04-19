import React from 'react';
import styles from './Porject.module.css';

const Project = ({ project, onRemoveProject }) => {
  return (
    
    <div className={`card card-body my-3 ${styles.bg}`}>
      <div className={` ${styles.projectheader}`}>
      <h4 className={`text-capitalize text-center ${styles.gradienttext}`}>Project: {project.name} </h4>
      <button className={`btn btn-danger ${styles.button1}`} onClick={() => onRemoveProject(project.name)}>Delete Project</button>
      </div>
      <ul>
        {project.tasks.map(task => (
          <li className={`card card-body my-3 ${styles.li}`} key={task.id}>{task.value}</li>
        ))}
      </ul>

    </div>
  );
};

export default Project;