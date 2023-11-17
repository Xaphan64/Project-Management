// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
const DashboardBodyCard = (props) => {
  // PROPERTIES
  const { title, description, footer, children } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="dashboard-body-card-container">
      <div>{children}</div>

      <div className="dashboard-body-card-body">
        <div className="dashboard-body-card-text">
          <span className="dashboard-card-title">{title}</span>
          <span className="dashboard-card-description">{description}</span>
        </div>

        <span className="dashboard-body-card-footer">{footer}</span>
      </div>
    </div>
  );
};

export default DashboardBodyCard;
