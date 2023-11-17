// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const DashboardStatusCard = (props) => {
  // PROPERTIES
  const { children, number, name, color } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className={`dashboard-card-container ${color}`}>
      <div className={`dashboard-card-icon ${color}`}>{children}</div>

      <div className="dashboard-card-items">
        <span className="dashboard-card-number">{number}</span>
        <span className="dashboard-card-text">{name}</span>
      </div>
    </div>
  );
};

export default DashboardStatusCard;
