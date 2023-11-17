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
    <div className="person-modal-background">
      <div className="person-modal-container confirmation">
        <span>
          Are you sure do you want to remove{" "}
          <span className="modal-person-name">{inputValues.firstName + " " + inputValues.lastName} </span>
          person?
        </span>

        <CustomButton type="button" name="Yes" className="red" onClick={handleDeleteConfirm} />

        <CustomButton type="button" name="No" onClick={handleConfirmationModal} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
