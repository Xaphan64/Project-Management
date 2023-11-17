// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const CustomButton = (props) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <button type={props.type} name={props.name} onClick={props.onClick} className={props.className}>
      {props.name} {props.children}
    </button>
  );
};

export default CustomButton;
