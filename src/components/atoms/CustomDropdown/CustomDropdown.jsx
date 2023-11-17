// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION

const CustomDropdown = (props) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  return (
    <select name={props.name} value={props.value} onChange={props.onChange} required>
      {props.options.map((item, index) => {
        return (
          <option key={index} value={item.key} defaultValue={item.defaultValue} disabled={item.disabled}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};

export default CustomDropdown;
