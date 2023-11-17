// ASSETS

// STYLES
import "./PersonCard.scss";
// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const PersonCard = (props) => {
  // PROPERTIES
  const { inputValues, handleEditPress } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  return (
    <div className="person-card-container" onClick={() => handleEditPress(inputValues)}>
      <div className="person-card-name">
        <span className="person-card-first">{inputValues.firstName}</span>

        <span className="person-card-last">{inputValues.lastName}</span>
      </div>
      <span className="person-card-position">{inputValues.position}</span>
    </div>
  );
};

export default PersonCard;
