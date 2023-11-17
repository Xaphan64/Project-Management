// ASSETS

// STYLES
import "./Projects.scss";

// LIBRARIES
import { Fragment, useEffect, useState } from "react";
import { nanoid } from "nanoid";

// MISC

// COMPONENTS
import CustomButton from "../../atoms/CustomButton/CustomButton";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import { useForm } from "../../hooks/useForm";
import ProjectCard from "./components/ProjectCard/ProjectCard";

// CONFIGURATION
const Projects = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const savedProjects = localStorage.getItem("projects");
  const persons = JSON.parse(localStorage.getItem("persons"));

  // STATE CONSTANTS
  const [projects, setProjects] = useState(savedProjects ? JSON.parse(savedProjects) : []);
  const [toggleTab, setToggleTab] = useState(1);
  const [projectModal, setProjectModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projectId, setProjectId] = useState("");
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    title: "",
    description: "",
    status: "",
    start: "",
    end: "",
    assignedPerson: "",
  });

  const projectProgressStatus = projects.filter((project) => project.status === "progress");
  const projectPendingStatus = projects.filter((project) => project.status === "pending");
  const projectDoneStatus = projects.filter((project) => project.status === "done");

  // LIFE CYCLE
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // EVENT HANDLERS
  const handleSwitchTab = (index) => {
    setToggleTab(index);
    console.log("changed to", index, "tab");
  };

  const toggleAddProjectModal = () => {
    setProjectModal(!projectModal);
    setEditMode(false);
    console.log("modal clicked");
  };

  const addProject = (project) => {
    //create a new project with the following key: values
    const newProject = {
      id: nanoid(),
      title: project.title,
      description: project.description,
      status: toggleTab === 1 ? "progress" : toggleTab === 2 ? "pending" : toggleTab === 3 ? "done" : "",
      start: project.start,
      end: project.end,
      assignedPerson: null,
    };

    //on the older projects add the newProject
    const newProjectList = [...projects, newProject];

    //update the state with the newly created project
    setProjects(newProjectList);
  };

  const editProject = (id, updatedProject) => {
    //map through projects and create a new editedProject array
    const editedProject = projects.map((project) => {
      //if the id of the current project matches the id that was clicked replace the current project with updatedProject
      return project.id === id ? updatedProject : project;
    });

    //update the state with editedProject
    setProjects(editedProject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //if the edit mode is true, edit the project otherwise add the project
    editMode ? editProject(projectId, inputValues) : addProject(inputValues);

    setProjectModal(false);

    //reset the inputValues after submiting the form
    resetForm();
  };

  const handleDeleteProject = (id) => {
    //create a copy of persons
    let localPersons = [...persons];

    //find the project id that was clicked
    const getPersonToUnassign = projects.find((project) => {
      return project.id === id;
    });

    //change the status of the person to available (unassign the person before the project will be deleted)
    localPersons = localPersons.map((personFromList) => {
      if (personFromList?.id === getPersonToUnassign?.assignedPerson?.id)
        return {
          ...personFromList,
          status: "available",
        };
      else return personFromList;
    });

    //update the status in local storage
    localStorage.setItem("persons", JSON.stringify(localPersons));

    //remove the project from the array
    const removeProject = projects.filter((project) => {
      return project.id !== id;
    });

    //update projects without the deleted project
    setProjects(removeProject);
  };

  const handleEditPress = (project) => {
    setProjectId(project.id);
    setEditMode(true);
    setProjectModal(true);
  };

  const handleAssignPerson = (projectThatWasClicked, personThatWasAdded, dynamicStatus) => {
    // create a copy of projects
    let localProjects = [...projects];

    // get the project data that was clicked on and store them in localCurrentProject
    let localCurrentProject = localProjects.find((projectFromList) => projectFromList.id === projectThatWasClicked.id);

    //replace the current person on project if there is one
    let previousModifiedPerson = {};

    //check if the project has an assigned person
    if (localCurrentProject.assignedPerson) {
      previousModifiedPerson = {
        ...localCurrentProject.assignedPerson,
        status: "available",
      };
    }

    // create a new object and modify status of the old object (person)
    const modifiedPerson = {
      ...personThatWasAdded,
      status: dynamicStatus, //key:value
    };

    // create a new project object and assign a person
    const modifiedProject = {
      ...localCurrentProject,
      assignedPerson: dynamicStatus === "assigned" ? modifiedPerson : null,
    };

    // replace the old project with the new project that has a person else return the other projects
    localProjects = localProjects.map((projectFromList) => {
      if (projectFromList.id === projectThatWasClicked.id) return modifiedProject;
      else return projectFromList;
    });

    //update the project with the person assigned
    setProjects(localProjects);

    //replace the old person status with the new status (assigned or available)
    const localPersons = persons.map((personFromList) => {
      if (personFromList.id === personThatWasAdded.id) return modifiedPerson;
      else if (personFromList?.id === previousModifiedPerson?.id) return previousModifiedPerson;
      else return personFromList;
    });

    //replace with the new list of persons in local storage
    localStorage.setItem("persons", JSON.stringify(localPersons));
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="projects-tabs">
          <CustomButton
            name="In Progress"
            onClick={() => handleSwitchTab(1)}
            className={toggleTab === 1 ? "active-tab" : "inactive"}
          />

          <CustomButton
            name="Pending"
            onClick={() => handleSwitchTab(2)}
            className={toggleTab === 2 ? "active-tab" : "inactive"}
          />

          <CustomButton
            name="Done"
            onClick={() => handleSwitchTab(3)}
            className={toggleTab === 3 ? "active-tab" : "inactive"}
          />
        </div>

        <div className="projects-add-modal">
          <CustomButton name="Add Project" onClick={toggleAddProjectModal} />
        </div>
      </div>

      {projectModal && (
        <ProjectModal
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toggleAddProjectModal={toggleAddProjectModal}
          setProjectModal={setProjectModal}
          editMode={editMode}
          projectId={projectId}
          setForm={setForm}
        />
      )}

      {/* IN PROGRESS TAB */}
      {toggleTab === 1 && (
        <Fragment>
          {projectProgressStatus.length === 0 && <h1>There are no projects in progress. You can create a project.</h1>}

          <div className="project-body">
            {projects?.map((inputValues, index) => (
              <Fragment key={`progress-tab--${index}--${inputValues?.id}`}>
                {inputValues.status === "progress" && (
                  <ProjectCard
                    projects={projects}
                    inputValues={inputValues}
                    handleDeleteProject={handleDeleteProject}
                    handleEditPress={handleEditPress}
                    persons={persons}
                    handleAssignPerson={handleAssignPerson}
                    setForm={setForm}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}

      {/* PENDING TAB */}
      {toggleTab === 2 && (
        <Fragment>
          {projectPendingStatus.length === 0 && <h1>There are no pending projects. You can create a project.</h1>}

          <div className="project-body">
            {projects?.map((inputValues, index) => (
              <Fragment key={`pending-tab--${index}--${inputValues?.id}`}>
                {inputValues.status === "pending" && (
                  <ProjectCard
                    inputValues={inputValues}
                    handleDeleteProject={handleDeleteProject}
                    handleEditPress={handleEditPress}
                    persons={persons}
                    handleAssignPerson={handleAssignPerson}
                    setForm={setForm}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}

      {/* DONE TAB */}
      {toggleTab === 3 && (
        <Fragment>
          {projectDoneStatus.length === 0 && <h1>There are no projects done. You can create a project.</h1>}

          <div className="project-body">
            {projects?.map((inputValues, index) => (
              <Fragment key={`done-tab--${index}--${inputValues?.id}`}>
                {inputValues.status === "done" && (
                  <ProjectCard
                    inputValues={inputValues}
                    handleDeleteProject={handleDeleteProject}
                    handleEditPress={handleEditPress}
                    persons={persons}
                    handleAssignPerson={handleAssignPerson}
                    setForm={setForm}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Projects;
