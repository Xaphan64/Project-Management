// ASSETS

// STYLES
import "./ProjectModal.scss";

// LIBRARIES
import { useEffect, useRef } from "react";

// MISC

// COMPONENTS
import CustomInput from "../../../../atoms/CustomInput/CustomInput";
import CustomTextArea from "../../../../atoms/CustomTextArea/CustomTextArea";
import CustomButton from "../../../../atoms/CustomButton/CustomButton";
import { getProjectById } from "../../../../hooks/localStorage";
import CustomDropdown from "../../../../atoms/CustomDropdown/CustomDropdown";

// CONFIGURATION
const ProjectModal = (props) => {
  // PROPERTIES
  const { editMode, toggleAddProjectModal, setProjectModal, setForm } = props;
  const { handleSubmit, handleInputChange, inputValues, projectId } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  let menuRef = useRef();

  const optionsProject = [
    {
      key: "progress",
      value: "In Progress",
    },
    {
      key: "pending",
      value: "Pending",
    },
    {
      key: "done",
      value: "Done",
    },
  ];

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setProjectModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (editMode) {
      if (projectId) {
        const project = getProjectById(projectId);
        setForm(project);
      }
    } else {
      setForm({
        title: "",
        description: "",
        status: "",
        start: "",
        end: "",
      });
    }
    // eslint-disable-next-line
  }, [editMode]);
  // EVENT HANDLERS

  return (
    <div className="project-modal-background">
      <div className="project-modal-container" ref={menuRef}>
        <div className="project-modal-header">
          <h3>{editMode ? "Edit" : "Create"} project</h3>
          <button onClick={toggleAddProjectModal}>X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            value={inputValues.title}
            onChange={handleInputChange}
            maxLength={18}
            placeholder="Project name"
          />

          <CustomTextArea
            type="text"
            name="description"
            value={inputValues.description}
            onChange={handleInputChange}
            placeholder="Project description"
          />

          <div className="date-input">
            <span>Start Date:</span>
            <CustomInput type="date" name="start" value={inputValues.start} onChange={handleInputChange} />
          </div>

          <div className="date-input">
            <span>Deadline:</span>
            <CustomInput type="date" name="end" value={inputValues.end} onChange={handleInputChange} />
          </div>

          {editMode && (
            <div className="project-modal-dropdown">
              <span>Status:</span>
              <CustomDropdown
                name="status"
                value={inputValues.status}
                onChange={handleInputChange}
                options={optionsProject}
              />
            </div>
          )}

          <CustomButton type="submit">{editMode ? "Update" : "Create"}</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
