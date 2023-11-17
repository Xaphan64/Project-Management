// ASSETS

// STYLES
import CustomButton from "../../../../atoms/CustomButton/CustomButton";
import "./AssignModal.scss";

// LIBRARIES
import { Fragment, useEffect, useRef } from "react";

// MISC

// COMPONENTS

// CONFIGURATION
const AssignModal = (props) => {
  // PROPERTIES
  const { setAssignModal, inputValues, persons, handleAssignPerson } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  let menuRef = useRef();
  const personsAvailable = persons.filter((person) => person.status === "available");

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setAssignModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // EVENT HANDLERS
  const handleClose = () => {
    setAssignModal(false);
  };

  return (
    <div className="project-modal-background">
      <div className="project-modal-container" ref={menuRef}>
        <div className="project-title">
          <h3 className="title">{inputValues.title}</h3>
          <span>project</span>
        </div>
        <div className="assign-modal-persons-list">
          <div className="assign-modal-persons">
            <h3>Available persons</h3>

            {personsAvailable.length === 0 && <span>No available persons</span>}

            <Fragment>
              {persons.map(
                (person, index) =>
                  person.status === "available" && (
                    <div className="assign-modal-list" key={`person-list--${index}`}>
                      <CustomButton name="+" onClick={() => handleAssignPerson(inputValues, person, "assigned")} />

                      {person.firstName + " " + person.lastName}
                    </div>
                  )
              )}
            </Fragment>
          </div>

          <div className="assign-modal-persons">
            <h3>Assigned person</h3>

            {persons.map((person, index) => {
              return (
                person?.id === inputValues?.assignedPerson?.id && (
                  <div className="assign-modal-list" key={`person-list--${index}`}>
                    <CustomButton name="-" onClick={() => handleAssignPerson(inputValues, person, "available")} />

                    {person.firstName + " " + person.lastName}
                  </div>
                )
              );
            })}

            {!inputValues?.assignedPerson?.id && <span>No persons assigned</span>}
          </div>
        </div>
        <CustomButton type="button" name="Close" onClick={handleClose} />
      </div>
    </div>
  );
};

export default AssignModal;
