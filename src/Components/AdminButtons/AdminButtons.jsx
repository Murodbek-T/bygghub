import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import closeIcon from "../../assets/x.svg";
import LocationIcon from "../../assets/Location.svg";
import WorkersIcon from "../../assets/Workers.svg";
import TieIcon from "../../assets/Tie.svg";
import ClipIcon from "../../assets/Paperclip.svg";
import TaskIcon from "../../assets/Task.svg";
import Chevron from "../../assets/content.svg";
import Location from "../LocationSearch/Location";

import "./AdminButton.css";

// Framer motion
import { motion, AnimatePresence } from "framer-motion";
import Team from "../Team/Team";
import CanvasAdmin from "../CanvasAdmin/CanvasAdmin";
import Documents from "../Documents/Documents";
import Tasks from "../Tasks/Tasks";
import Status from "../Status/Status";

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
];

const AdminButtons = () => {
  const [canvasShow, setCanvasShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activePanel, setActivePanel] = useState("main");

  const handleClose = () => setCanvasShow(false);
  const handleShow = () => setCanvasShow(true);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
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

  return (
    <div>
      <div className="admin-buttons">
        <Button className="admin-btn-secondary" onClick={handleModalShow}>
          Add in bulk
        </Button>
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          backdrop="static"
          className="modal"
          keyboard={false}
          dialogClassName="modal-fullscreen" // Add this line
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              <h1 className="modal-text">Bulk import projects</h1>
              <Button className="admin-btn-primary">Submit</Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="table-container">
              <table className="projects-table">
                <thead>
                  <tr>
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
                  {projectsData.map((project) => (
                    <tr key={project.id}>
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
          </Modal.Body>
        </Modal>

        {/* Canvas */}
        <Button className="admin-btn-primary" onClick={handleShow}>
          Add project
        </Button>
        <Offcanvas show={canvasShow} onHide={handleClose} placement="end">
          <Offcanvas.Header>
            <Offcanvas.Title className="canvas-title-wrapper">
              <div className="canvas-close-button" onClick={handleClose}>
                <img src={closeIcon} alt="close" width={20} />
              </div>
              <h1 className="canvas-title">Create Project</h1>
              <Button className="admin-btn-primary">Save</Button>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="canvas-body">
            {/* Framer motion - for animations inside the canvas */}
            <AnimatePresence mode="wait">
              {activePanel === "main" && (
                <motion.div
                  key="main"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Project name"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <div className="form-check canvas-input">
                        <h6 className="check-title">Use location as name</h6>
                        <Form.Check
                          type="checkbox"
                          id="custom-switch"
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                          className="custom-switch"
                        />
                      </div>
                    </Form.Group>
                    {/* Example navigation options */}
                    <div className="option-list">
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("location")}
                      >
                        <span className="icon-tab">
                          <img src={LocationIcon} alt="location" />
                          Location
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("workers")}
                      >
                        <span className="icon-tab">
                          <img src={WorkersIcon} alt="workers" />
                          Project Team
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("admin")}
                      >
                        <span className="icon-tab">
                          <img src={TieIcon} alt="tie" />
                          Admin
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("documents")}
                      >
                        <span className="icon-tab">
                          <img src={ClipIcon} alt="clip" />
                          Add documents
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("tasks")}
                      >
                        <span className="icon-tab">
                          <img src={TaskIcon} alt="task" />
                          Add tasks
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                    </div>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Description"
                      />
                    </Form.Group>
                    <button
                      type="button"
                      className="option-item"
                      onClick={() => setActivePanel("status")}
                    >
                      <span className="icon-tab">Project Status</span>
                      <span className="chevron">
                        <img src={Chevron} alt="chevron" />
                      </span>
                    </button>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Company name"
                      />
                    </Form.Group>{" "}
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Reg. No"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Client representative"
                      />
                    </Form.Group>
                  </Form>
                </motion.div>
              )}

              {activePanel === "location" && (
                <motion.div
                  key="location"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                    <h5 className="subpanel-title">Project address</h5>
                  </div>

                  {/* put your location choosing UI here */}
                  <Location />
                </motion.div>
              )}

              {activePanel === "status" && (
                <motion.div
                  key="status"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel status"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                    <h5 className="subpanel-title">Project Status</h5>
                  </div>
                  <Status />
                  {/* put your location choosing UI here */}
                </motion.div>
              )}

              {activePanel === "tasks" && (
                <motion.div
                  key="tasks"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                  </div>

                  {/* put your add tasks UI here */}
                  <Tasks />
                </motion.div>
              )}
              {activePanel === "workers" && (
                <motion.div
                  key="workers"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                    <h5 className="subpanel-title">Select your workers</h5>
                  </div>

                  {/* put your add tasks UI here */}
                  <Team />
                </motion.div>
              )}
              {activePanel === "admin" && (
                <motion.div
                  key="admin"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                    <h5 className="subpanel-title">Admins</h5>
                  </div>

                  {/* put your add tasks UI here */}
                  <CanvasAdmin />
                </motion.div>
              )}
              {activePanel === "documents" && (
                <motion.div
                  key="documents"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="subpanel"
                >
                  <div className="subpanel-header">
                    <button
                      className="back-btn"
                      onClick={() => setActivePanel("main")}
                    >
                      ‹ Back
                    </button>
                    <h5 className="subpanel-title">Add documents</h5>
                  </div>

                  {/* put your add tasks UI here */}
                  <Documents />
                </motion.div>
              )}
            </AnimatePresence>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default AdminButtons;
