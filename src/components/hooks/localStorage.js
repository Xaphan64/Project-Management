export const getListOfProjects = () => {
  //if there are no "projects" in localStorage, create an empty array []
  if (!localStorage["projects"]) {
    localStorage["projects"] = JSON.stringify([]);
  }

  // convert "projects" back to js
  let projects = JSON.parse(localStorage["projects"]);
  return projects;
};

export const getProjectById = (id) => {
  const projects = getListOfProjects();

  // look in projects and find the project by id
  const project = projects.find((project) => project.id === id);
  return project;
};

export const getListOfPersons = () => {
  //if there are no "persons" in localStorage, create an empty array []
  if (!localStorage["persons"]) {
    localStorage["persons"] = JSON.stringify([]);
  }

  // convert "persons" back to js
  let projects = JSON.parse(localStorage["persons"]);
  return projects;
};

export const getPersonById = (id) => {
  const persons = getListOfPersons();

  // look in persons and find the project by id
  const person = persons.find((person) => person.id === id);
  return person;
};
