// ASSETS

// STYLES
import "./Persons.scss";

// LIBRARIES
import { Fragment, useEffect, useState } from "react";
import { nanoid } from "nanoid";

// MISC

// COMPONENTS
import { useForm } from "../../hooks/useForm";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import PersonModal from "./components/PersonModal/PersonModal";
import PersonCard from "./components/PersonCard/PersonCard";

// CONFIGURATION
const Persons = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const savedPersons = localStorage.getItem("persons");
  const projects = JSON.parse(localStorage.getItem("projects"));

  // STATE CONSTANTS
  const [toggleTab, setToggleTab] = useState(1);
  const [personModal, setPersonModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [personId, setPersonId] = useState("");
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    firstName: "",
    lastName: "",
    position: "",
    status: "",
  });
  const [persons, setPersons] = useState(savedPersons ? JSON.parse(savedPersons) : []);

  const personAvailableStatus = persons.filter((person) => person.status === "available");
  const personAssignedStatus = persons.filter((person) => person.status === "assigned");

  // LIFE CYCLE
  useEffect(() => {
    localStorage.setItem("persons", JSON.stringify(persons));
  }, [persons]);

  // EVENT HANDLERS
  const handleSwitchTab = (index) => {
    setToggleTab(index);
  };

  const toggleAddPersonModal = () => {
    setPersonModal(!personModal);
    setEditMode(false);
  };

  const addPerson = (person) => {
    //create a new person with the following key: values
    const newPerson = {
      id: nanoid(),
      firstName: person.firstName,
      lastName: person.lastName,
      position: person.position,
      status: "available",
    };

    //on the old persons array, add a newPerson
    const newPersonsList = [...persons, newPerson];

    //update the state with the newly created person
    setPersons(newPersonsList);
  };

  const editPerson = (id, updatedPerson) => {
    const editedPerson = persons.map((person) => {
      return person.id === id ? updatedPerson : person;
    });

    setPersons(editedPerson);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //if the edit mode is true, edit the persons if not add a new person
    editMode ? editPerson(personId, inputValues) : addPerson(inputValues);

    setPersonModal(false);

    //reset inputValues after submit
    resetForm();
  };

  const handleDeletePerson = (id) => {
    //filter through persons and return the person.id that does not match the specified id (remove person)
    const removePerson = persons.filter((person) => {
      return person.id !== id;
    });

    //update the persons without the deleted person
    setPersons(removePerson);

    // create a copy of projects
    let localProjects = [...projects];

    //update the project to unassigned if the person is deleted
    localProjects = localProjects.map((projectFromList) => {
      if (projectFromList?.assignedPerson?.id === id)
        return {
          ...projectFromList,
          assignedPerson: null,
        };
      else return projectFromList;
    });

    //save the unassigned project to local storage
    localStorage.setItem("projects", JSON.stringify(localProjects));
  };

  const handleEditPress = (person) => {
    setPersonId(person.id);
    setEditMode(true);
    setPersonModal(true);
  };

  return (
    <div className="persons-container">
      <div className="persons-header">
        <div className="persons-tabs">
          <CustomButton
            name="Available"
            onClick={() => handleSwitchTab(1)}
            className={toggleTab === 1 ? "active-tab" : "inactive"}
          />

          <CustomButton
            name="Assigned"
            onClick={() => handleSwitchTab(2)}
            className={toggleTab === 2 ? "active-tab" : "inactive"}
          />
        </div>

        <div className="persons-add-modal">
          <CustomButton name="Add Person" onClick={toggleAddPersonModal} />
        </div>
      </div>

      {personModal && (
        <PersonModal
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toggleAddPersonModal={toggleAddPersonModal}
          setPersonModal={setPersonModal}
          editMode={editMode}
          personId={personId}
          setForm={setForm}
          handleDeletePerson={handleDeletePerson}
        />
      )}

      {/* AVAILABLE TAB */}
      {toggleTab === 1 && (
        <Fragment>
          {personAvailableStatus.length === 0 && <h1>There are no available persons. You can add a person.</h1>}

          <div className="person-body">
            {persons?.map((inputValues, index) => (
              <Fragment key={`available-tab--${index}--${inputValues?.id}`}>
                {inputValues.status === "available" && (
                  <PersonCard
                    inputValues={inputValues}
                    handleEditPress={handleEditPress}
                    handleDeletePerson={handleDeletePerson}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}

      {/* ASSIGNED TAB */}
      {toggleTab === 2 && (
        <Fragment>
          {personAssignedStatus.length === 0 && <h1>There are no assigned persons to any project.</h1>}

          <div className="person-body">
            {persons?.map((inputValues, index) => (
              <Fragment key={`available-tab--${index}--${inputValues?.id}`}>
                {inputValues.status === "assigned" && (
                  <PersonCard
                    inputValues={inputValues}
                    handleEditPress={handleEditPress}
                    handleDeletePerson={handleDeletePerson}
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

export default Persons;
