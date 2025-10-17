import React, { useState } from "react";
import "./AdminTabs.css";
import { Tabs, Tab, Container, Button, Modal } from "react-bootstrap";
import AdminButtons from "../AdminButtons/AdminButtons";
import MagnifierIcon from "../../assets/magnifier.svg";
import FilterIcon from "../../assets/sliders.svg";

const AdminTabs = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const [activeTab, setActiveTab] = useState("projects");

  //! Custom data. Later change to API content
  const projectsData = [
    {
      id: 1,
      name: "Ludvika Residential Complex Development Project",
      status: "in progress",
      location: "Södermalmsvägen 12...",
      contractNo: "CN-2025-001",
      beginning: "2025-02-15",
      end: "2025-12-01",
      projectManager: "Erik Svensson",
      clientCompany: "NordicBuild AB",
      clientRepresent: "Emma Bergström",
      phone: "+46 8 555 21 300",
      email: "emma.bergstrom@nordicbuild",
    },
    {
      id: 2,
      name: "Residential Complex Norrmalm Luxury Apartments",
      status: "Done",
      location: "Norrmalmstorg 4, No...",
      contractNo: "CN-2025-002",
      beginning: "2025-03-10",
      end: "2026-01-30",
      projectManager: "Lars Holm",
      clientCompany: "NordicBuild AB",
      clientRepresent: "Emma Bergström",
      phone: "+46 8 555 21 300",
      email: "emma.bergstrom@nordicbuild",
    },
    {
      id: 3,
      name: "Shopping Center Svea Comprehensive Retail Complex",
      status: "Quotation",
      location: "Kungsholmsgatan 27...",
      contractNo: "CN-2025-003",
      beginning: "2025-04-05",
      end: "2026-02-28",
      projectManager: "Maria Jansson",
      clientCompany: "NordicBuild AB",
      clientRepresent: "Emma Bergström",
      phone: "+46 8 555 21 300",
      email: "emma.bergstrom@nordicbuild",
    },
    {
      id: 4,
      name: "Hospital Wing Karolinska Medical Research Facility",
      status: "in progress",
      location: "Solnavägen 1, Solna, L.",
      contractNo: "CN-2024-018",
      beginning: "2024-05-05",
      end: "2025-04-10",
      projectManager: "Oskar Berg",
      clientCompany: "NordicBuild AB",
      clientRepresent: "Emma Bergström",
      phone: "+46 8 555 21 300",
      email: "emma.bergstrom@nordicbuild",
    },
    {
      id: 5,
      name: "Götabridge Renovation Structural Reinforcement",
      status: "Handed over",
      location: "Söderortsleden 45, S...",
      contractNo: "CN-2024-021",
      beginning: "2024-03-12",
      end: "2024-12-20",
      projectManager: "Sofia Karlsson",
      clientCompany: "NordicBuild AB",
      clientRepresent: "Emma Bergström",
      phone: "+46 8 555 21 300",
      email: "emma.bergstrom@nordicbuild",
    },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "status-in-progress";
      case "done":
        return "status-done";
      case "quotation":
        return "status-quotation";
      case "handed over":
        return "status-handed-over";
      default:
        return "";
    }
  };

  // Row selection handlers
  const handleRowSelect = (projectId) => {
    setSelectedRows((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(projectsData.map((project) => project.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected =
    projectsData.length > 0 && selectedRows.length === projectsData.length;

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <div className="tab-content-wrapper">
            {/* Projects Table */}
            <div className="table-container-main">
              <table className="projects-table-main">
                <thead>
                  <tr>
                    <th className="col-select-main">
                      <input
                        type="checkbox"
                        className="row-select-main"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="col-name-main">
                      Name
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-status-main">
                      Status{" "}
                      <span className="filter-btn">
                        <img src={FilterIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-location-main">
                      Location{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-contract-main">
                      Contract №{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-date-main">
                      Beginning{" "}
                      <span className="filter-btn">
                        <img src={FilterIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-date-main">
                      End{" "}
                      <span className="filter-btn">
                        <img src={FilterIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-manager-main">
                      Project manager{" "}
                      <span className="filter-btn">
                        <img src={FilterIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-company-main">
                      Client company{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-represent-main">
                      Client represent{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-phone-main">
                      Phone{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                    <th className="col-email-main">
                      Email{" "}
                      <span className="filter-btn">
                        <img src={MagnifierIcon} alt="magni" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project) => (
                    <tr
                      key={project.id}
                      className={
                        selectedRows.includes(project.id) ? "selected" : ""
                      }
                    >
                      <td className="col-select-main">
                        <input
                          type="checkbox"
                          className="row-select-main"
                          checked={selectedRows.includes(project.id)}
                          onChange={() => handleRowSelect(project.id)}
                        />
                      </td>
                      <td
                        className="col-name-main truncate"
                        data-fulltext={project.name}
                      >
                        {project.name}
                      </td>
                      <td className="col-status-main">
                        <span
                          className={`status-badge ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td
                        className="col-location-main truncate"
                        data-fulltext={project.location}
                      >
                        {project.location}
                      </td>
                      <td className="col-contract-main truncate">
                        {project.contractNo}
                      </td>
                      <td className="col-date-main">{project.beginning}</td>
                      <td className="col-date-main">{project.end}</td>
                      <td
                        className="col-manager-main truncate"
                        data-fulltext={project.projectManager}
                      >
                        {project.projectManager}
                      </td>
                      <td
                        className="col-company-main truncate"
                        data-fulltext={project.clientCompany}
                      >
                        {project.clientCompany}
                      </td>
                      <td
                        className="col-represent-main truncate"
                        data-fulltext={project.clientRepresent}
                      >
                        {project.clientRepresent}
                      </td>
                      <td className="col-phone-main truncate">
                        {project.phone}
                      </td>
                      <td
                        className="col-email-main truncate"
                        data-fulltext={project.email}
                      >
                        {project.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "chat":
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">Chat Content</h3>
            <p className="tab-description">This is the Chat tab content.</p>
            <div className="chat-interface">
              <p>
                Chat messages, conversations, and chat functionality will appear
                here.
              </p>
            </div>
          </div>
        );

      case "shifts":
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">Shifts Content</h3>
            <p className="tab-description">This is the Shifts tab content.</p>
            <div className="shifts-interface">
              <p>
                Shift scheduling, management, and employee schedules will appear
                here.
              </p>
            </div>
          </div>
        );

      case "people":
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">People Content</h3>
            <p className="tab-description">This is the People tab content.</p>
            <div className="people-interface">
              <p>
                Employee management, team organization, and people directory
                will appear here.
              </p>
            </div>
          </div>
        );

      case "registration":
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">Registration Content</h3>
            <p className="tab-description">
              This is the Registration tab content.
            </p>
            <div className="registration-interface">
              <p>
                User registration, onboarding, and account management will
                appear here.
              </p>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">Support Content</h3>
            <p className="tab-description">This is the Support tab content.</p>
            <div className="support-interface">
              <p>
                Support tickets, help desk, and customer service will appear
                here.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="tab-content-wrapper">
            <h3 className="tab-title">Select a Tab</h3>
            <p className="tab-description">
              Please select a tab to view its content.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="admin-tabs">
      <Container fluid className="tabs-container">
        <div className="tabs-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
            }}
          >
            <Tabs
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
              className="custom-tabs"
            >
              <Tab eventKey="projects" title="Projects" />
              <Tab eventKey="chat" title="Chat" />
              <Tab eventKey="shifts" title="Shifts" />
              <Tab eventKey="people" title="People" />
              <Tab eventKey="registration" title="Registration" />
              <Tab eventKey="support" title="Support" />
            </Tabs>
          </div>

          <AdminButtons />
        </div>

        {/* Render the appropriate tab content */}
        {renderTabContent()}
      </Container>
    </div>
  );
};

export default AdminTabs;
