// ASSETS

// STYLES
import "./PersonModal.scss";

// LIBRARIES
import { useEffect, useRef, useState } from "react";

// MISC

// COMPONENTS
import CustomInput from "../../../../atoms/CustomInput/CustomInput";
import CustomButton from "../../../../atoms/CustomButton/CustomButton";
import CustomDropdown from "../../../../atoms/CustomDropdown/CustomDropdown";
import { getPersonById } from "../../../../hooks/localStorage";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

// CONFIGURATION
const PersonModal = (props) => {
  // PROPERTIES
  const { editMode, toggleAddPersonModal, setPersonModal, setForm } = props;
  const { handleSubmit, handleInputChange, inputValues, personId, handleDeletePerson } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  let menuRef = useRef();
  const personStatus = [
    {
      key: "available",
      value: "Available",
    },
    {
      key: "assigned",
      value: "Assigned",
    },
  ];
  const personPosition = [
    {
      key: "",
      value: "Select a position",
      disabled: true,
      defaultValue: true,
    },
    {
      key: "Fullstack",
      value: "Full Stack",
      disabled: false,
      defaultValue: false,
    },
    {
      key: "Frontend",
      value: "Front End",
      disabled: false,
      defaultValue: false,
    },
    {
      key: "Backend",
      value: "Back End",
      disabled: false,
      defaultValue: false,
    },
  ];
  // STATE CONSTANTS
  const [confirmationModal, setConfirmationModal] = useState(false);

  // LIFE CYCLE
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setPersonModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (editMode) {
      if (personId) {
        const person = getPersonById(personId);
        setForm(person);
      }
    } else {
      setForm({
        firstName: "",
        lastName: "",
        position: "",
        status: "",
      });
    }
    // eslint-disable-next-line
  }, [editMode]);

  // EVENT HANDLERS
  const handleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };

  const handleDeleteConfirm = () => {
    handleDeletePerson(inputValues.id);
    setConfirmationModal(false);
    setPersonModal(false);
  };

  return (
    <div className="person-modal-background">
      <div className="person-modal-container" ref={menuRef}>
        <div className="person-modal-header">
          <h3>{editMode ? "Edit" : "Create"} person</h3>
          <button onClick={toggleAddPersonModal}>X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            name="firstName"
            value={inputValues.firstName}
            onChange={handleInputChange}
            maxLength={26}
            placeholder="Person first name"
          />

          <CustomInput
            type="text"
            name="lastName"
            value={inputValues.lastName}
            onChange={handleInputChange}
            maxLength={26}
            placeholder="Person last name"
          />

          <div className="person-modal-dropdown">
            <span>Position:</span>
            <CustomDropdown
              name="position"
              value={inputValues.position}
              onChange={handleInputChange}
              options={personPosition}
            />
          </div>

          {editMode && (
            <div className="person-modal-dropdown">
              <span>Status:</span>
              <CustomDropdown
                name="status"
                value={inputValues.status}
                onChange={handleInputChange}
                options={personStatus}
              />
            </div>
          )}

          <CustomButton type="submit">{editMode ? "Update" : "Create"}</CustomButton>

          {editMode && <CustomButton className="red" type="button" name="Delete" onClick={handleConfirmationModal} />}

          {confirmationModal && (
            <ConfirmationModal
              handleDeletePerson={handleDeletePerson}
              inputValues={inputValues}
              handleConfirmationModal={handleConfirmationModal}
              handleDeleteConfirm={handleDeleteConfirm}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonModal;
