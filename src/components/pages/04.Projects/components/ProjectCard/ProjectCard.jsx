// ASSETS
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// STYLES
import "./ProjectCard.scss";

// LIBRARIES
import { useState } from "react";

// MISC

// COMPONENTS
import CustomButton from "../../../../atoms/CustomButton/CustomButton";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import AssignModal from "../AssignModal/AssignModal";

// CONFIGURATION
const ProjectCard = (props) => {
  // PROPERTIES
  const { inputValues, handleDeleteProject, handleEditPress, persons, setForm, handleAssignPerson } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };

  const handleDeleteConfirm = () => {
    setConfirmationModal(false);
    handleDeleteProject(inputValues.id);
  };

  const toggleAssignModal = (inputValues) => {
    if (inputValues) {
      setForm(inputValues);
    }
    setAssignModal(!assignModal);
  };

  return (
    <div className="project-card-container">
      <div className="project-card-content">
        <div className="project-card-header">
          <span className="project-card-title">{inputValues.title}</span>

          <CustomButton type="button" onClick={toggleAssignModal}>
            <PersonAddIcon />
          </CustomButton>
        </div>
        <span className="project-card-description">{inputValues.description}</span>

        <span className="project-card-start">
          Assignee:{" "}
          {inputValues.assignedPerson
            ? inputValues.assignedPerson.firstName + " " + inputValues.assignedPerson.lastName
            : "Unassigned"}
        </span>

        <span className="project-card-start">Start: {inputValues.start}</span>
        <span className="project-card-deadline">Deadline: {inputValues.end}</span>
      </div>

      <div className="project-card-footer">
        <CustomButton type="button" onClick={() => handleEditPress(inputValues)}>
          <EditIcon />
          <span>Edit</span>
        </CustomButton>

        <CustomButton className="red" type="button" onClick={handleConfirmationModal}>
          <DeleteIcon />
          <span>Delete</span>
        </CustomButton>
      </div>

      {confirmationModal && (
        <ConfirmationModal
          handleDeleteProject={handleDeleteProject}
          inputValues={inputValues}
          handleConfirmationModal={handleConfirmationModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}

      {assignModal && (
        <AssignModal
          setAssignModal={setAssignModal}
          persons={persons}
          inputValues={inputValues}
          handleAssignPerson={handleAssignPerson}
        />
      )}
    </div>
  );
};

export default ProjectCard;
