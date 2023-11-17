// ASSETS

// STYLES
import "./ConfirmationModal.scss";

// LIBRARIES

// MISC

// COMPONENTS
import CustomButton from "../../../../../atoms/CustomButton/CustomButton";

// CONFIGURATION
const ConfirmationModal = (props) => {
  // PROPERTIES
  const { inputValues, handleConfirmationModal, handleDeleteConfirm } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="project-modal-background">
      <div className="project-modal-container confirmation">
        <span>
          Are you sure do you want to delete <span className="modal-project-title">{inputValues.title}</span> project?
        </span>

        <CustomButton type="button" name="Yes" className="red" onClick={handleDeleteConfirm} />

        <CustomButton type="button" name="No" onClick={handleConfirmationModal} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
