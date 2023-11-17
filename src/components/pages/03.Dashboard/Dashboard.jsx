// ASSETS
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// STYLES
import "./Dashboard.scss";

// LIBRARIES

// MISC

// COMPONENTS
import DashboardStatusCard from "./components/DashboardHeaderCard";
import { Fragment } from "react";
import DashboardBodyCard from "./components/DashboardBodyCard";

// CONFIGURATION
const Dashboard = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const projects = JSON.parse(localStorage.getItem("projects"));
  const persons = JSON.parse(localStorage.getItem("persons"));

  const projectProgressStatus = projects.filter((project) => project.status === "progress");
  const projectPendingStatus = projects.filter((project) => project.status === "pending");
  const projectDoneStatus = projects.filter((project) => project.status === "done");
  const personAvailableStatus = persons.filter((person) => person.status === "available");

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="grid-1">
          <DashboardStatusCard number={projectProgressStatus.length} name="projects in progress" color="red">
            <AccountTreeIcon />
          </DashboardStatusCard>
        </div>

        <div className="grid-2">
          <DashboardStatusCard number={projectPendingStatus.length} name="pending projects" color="yellow">
            <AccountTreeIcon />
          </DashboardStatusCard>
        </div>

        <div className="grid-3">
          <DashboardStatusCard number={projectDoneStatus.length} name="projects done" color="green">
            <AccountTreeIcon />
          </DashboardStatusCard>
        </div>

        <div className="grid-4">
          <DashboardStatusCard number={personAvailableStatus.length} name="available persons" color="orange">
            <GroupIcon />
          </DashboardStatusCard>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-body-item">
          <h3>Deadline</h3>

          {projectProgressStatus.length === 0 && <h2 className="dashboard-body-title">No Projects available</h2>}

          {projectProgressStatus.map((project, index) => (
            <Fragment key={`${index}--${project?.id}`}>
              <DashboardBodyCard title={project.title} description={project.description} footer={project.end}>
                <AssignmentIcon />
              </DashboardBodyCard>
            </Fragment>
          ))}
        </div>

        <div className="dashboard-body-item">
          <h3>Project Start</h3>

          {projectPendingStatus.length === 0 && <h2 className="dashboard-body-title">No Projects available</h2>}

          {projectPendingStatus.map((project, index) => (
            <Fragment key={`${index}--${project?.id}`}>
              <DashboardBodyCard title={project.title} description={project.description} footer={project.start}>
                <AssignmentIcon />
              </DashboardBodyCard>
            </Fragment>
          ))}
        </div>

        <div className="dashboard-body-item person">
          <h3>Available persons</h3>

          {persons.length === 0 && <h2 className="dashboard-body-title">No persons available</h2>}

          {personAvailableStatus.map((person, index) => (
            <Fragment key={`${index}--${person?.id}`}>
              <DashboardBodyCard title={person.firstName} description={person.lastName} footer={person.position}>
                <AccountCircleIcon />
              </DashboardBodyCard>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
