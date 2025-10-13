import React, { useState } from "react";
import "./AdminTabs.css";
import { Tabs, Tab, Container, Button, Modal } from "react-bootstrap";
import AdminButtons from "../AdminButtons/AdminButtons";

const AdminTabs = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [showActionModal, setShowActionModal] = useState(false);
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

  // Filter projects based on selected radio and search term
  const filteredProjects = projectsData.filter((project) => {
    const matchesStatus =
      selectedFilter === "all" ||
      project.status.toLowerCase() === selectedFilter.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientCompany.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

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
      setSelectedRows(filteredProjects.map((project) => project.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected =
    filteredProjects.length > 0 &&
    selectedRows.length === filteredProjects.length;

  // Modal handlers
  const handleOpenActionModal = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one project");
      return;
    }
    setShowActionModal(true);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false);
  };

  const handleConfirmAction = () => {
    console.log("Selected projects:", selectedRows);
    alert(`Action performed on ${selectedRows.length} selected projects`);
    setShowActionModal(false);
  };

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <div className="tab-content-wrapper">
            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-row">
                <div className="radio-filter-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="projectFilter"
                      value="all"
                      checked={selectedFilter === "all"}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    />
                    All projects
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="projectFilter"
                      value="in progress"
                      checked={selectedFilter === "in progress"}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    />
                    In progress
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="projectFilter"
                      value="done"
                      checked={selectedFilter === "done"}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    />
                    Done
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="projectFilter"
                      value="quotation"
                      checked={selectedFilter === "quotation"}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    />
                    Quotation
                  </label>
                </div>

                <div className="search-filter">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="search-button"
                    onClick={() => setSearchTerm("")}
                  >
                    {searchTerm ? "Clear" : "Search"}
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Table */}
            <div className="table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th className="col-select">
                      <input
                        type="checkbox"
                        className="row-select"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="col-name">Name</th>
                    <th className="col-status">Status</th>
                    <th className="col-location">Location</th>
                    <th className="col-contract">Contract №</th>
                    <th className="col-date">Beginning</th>
                    <th className="col-date">End</th>
                    <th className="col-manager">Project manager</th>
                    <th className="col-company">Client company</th>
                    <th className="col-represent">Client represent</th>
                    <th className="col-phone">Phone</th>
                    <th className="col-email">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className={
                        selectedRows.includes(project.id) ? "selected" : ""
                      }
                    >
                      <td className="col-select">
                        <input
                          type="checkbox"
                          className="row-select"
                          checked={selectedRows.includes(project.id)}
                          onChange={() => handleRowSelect(project.id)}
                        />
                      </td>
                      <td
                        className="col-name truncate"
                        data-fulltext={project.name}
                      >
                        {project.name}
                      </td>
                      <td className="col-status">
                        <span
                          className={`status-badge ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td
                        className="col-location truncate"
                        data-fulltext={project.location}
                      >
                        {project.location}
                      </td>
                      <td className="col-contract truncate">
                        {project.contractNo}
                      </td>
                      <td className="col-date">{project.beginning}</td>
                      <td className="col-date">{project.end}</td>
                      <td
                        className="col-manager truncate"
                        data-fulltext={project.projectManager}
                      >
                        {project.projectManager}
                      </td>
                      <td
                        className="col-company truncate"
                        data-fulltext={project.clientCompany}
                      >
                        {project.clientCompany}
                      </td>
                      <td
                        className="col-represent truncate"
                        data-fulltext={project.clientRepresent}
                      >
                        {project.clientRepresent}
                      </td>
                      <td className="col-phone truncate">{project.phone}</td>
                      <td
                        className="col-email truncate"
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
            <div className="action-buttons">
              <button
                className="action-btn primary"
                onClick={handleOpenActionModal}
                disabled={selectedRows.length === 0}
              >
                Action on Selected ({selectedRows.length})
              </button>
            </div>

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

      {/* Action Modal */}
      {showActionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Action</h3>
              <button className="close-btn" onClick={handleCloseActionModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                You are about to perform an action on {selectedRows.length}{" "}
                selected project(s).
              </p>
              <p>
                This action cannot be undone. Are you sure you want to proceed?
              </p>
            </div>
            <div className="modal-footer">
              <button className="action-btn" onClick={handleCloseActionModal}>
                Cancel
              </button>
              <button
                className="action-btn primary"
                onClick={handleConfirmAction}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTabs;
