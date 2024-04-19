
import React from 'react';
import Project from './Project';

const ProjectList = ({ projects, onRemoveProject }) => {
  return (
    <div>
      {projects.map(project => (
        <Project key={project.name} project={project} onRemoveProject={onRemoveProject} />
      ))}
    </div>
  );
};

export default ProjectList;
