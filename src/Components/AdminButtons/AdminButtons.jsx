import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, FormLabel } from "react-bootstrap";
import closeIcon from "../../assets/x.svg";
import LocationIcon from "../../assets/Location.svg";
import WorkersIcon from "../../assets/Workers.svg";
import TieIcon from "../../assets/Tie.svg";
import ClipIcon from "../../assets/Paperclip.svg";
import TaskIcon from "../../assets/Task.svg";
import Chevron from "../../assets/content.svg";
import Location from "../LocationSearch/Location";
import ChevronLeft from "../../assets/chevron.svg";

import "./AdminButton.css";

// Framer motion
import { motion, AnimatePresence } from "framer-motion";
import Team from "../Team/Team";
import CanvasAdmin from "../CanvasAdmin/CanvasAdmin";
import Documents from "../Documents/Documents";
import Tasks from "../Tasks/Tasks";
import Status from "../Status/Status";
import { SaveButton } from "../Tasks/Tasks";

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
  const [selectedRows, setSelectedRows] = useState([]);
  const tasksRef = useRef();

  // State for form data
  const [formData, setFormData] = useState({
    projectName: "",
    useLocationAsName: false,
    description: "",
    companyName: "",
    regNo: "",
    clientRepresentative: "",
    location: "",
    status: "",
    tasks: [],
    workers: [],
    admins: [],
    documents: [],
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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

  const getTaskStatus = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "status-in-progress";
      case "on pause":
        return "status-on-pause";
      case "negotiation":
        return "status-negotiation";
      case "finished":
        return "status-finished";
      case "cancelled":
        return "status-cancelled";
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

  // Handler for saving section data
  const handleSaveSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    setActivePanel("main");
  };

  // Handler for input changes in main form
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to format workers array into comma-separated string
  const formatWorkers = (workers) => {
    if (!workers || workers.length === 0) return "";

    if (workers.length === 1) {
      return workers[0];
    }

    if (workers.length === 2) {
      return workers.join(", ");
    }

    // For 3 or more workers: "Worker1, Worker2, and Worker3"
    const lastWorker = workers[workers.length - 1];
    const otherWorkers = workers.slice(0, -1).join(", ");
    return `${otherWorkers}, ${lastWorker}`;
  };

  const renderHeader = () => {
    if (activePanel === "main") {
      return (
        <Offcanvas.Header>
          <Offcanvas.Title className="canvas-title-wrapper">
            <div className="canvas-close-button" onClick={handleClose}>
              <img src={closeIcon} alt="close" width={20} />
            </div>
            <h1 className="canvas-title">Create Project</h1>
            <Button className="admin-btn-primary">Save</Button>
          </Offcanvas.Title>
        </Offcanvas.Header>
      );
    }
    return null;
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
          dialogClassName="modal-fullscreen"
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
                    <th className="col-select">
                      <input
                        type="checkbox"
                        className="row-select-main"
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
                  {projectsData.map((project) => (
                    <tr
                      key={project.id}
                      className={
                        selectedRows.includes(project.id) ? "selected" : ""
                      }
                    >
                      <td className="col-select">
                        <input
                          type="checkbox"
                          className="row-select-main"
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
            <div className="modal-import">
              <p>Drag and drop or upload a file to get started</p>
              <div className="modal-import-buttons">
                <input
                  type="file"
                  className="file-input"
                  id="upload-file"
                  onChange={handleFileChange}
                />
                <Button className="admin-btn-secondary">
                  <label htmlFor="upload-file" className="file-label">
                    Upload file
                  </label>
                </Button>
                <Button>Manually enter date</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Canvas */}
        <Button className="admin-btn-primary" onClick={handleShow}>
          Add project
        </Button>
        <Offcanvas
          show={canvasShow}
          onHide={handleClose}
          placement="end"
          style={{
            height: "calc(100vh - 100px)",
            top: "100px",
          }}
        >
          {renderHeader()}
          <Offcanvas.Body className="canvas-body">
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
                        value={
                          formData.useLocationAsName
                            ? formData.location
                            : formData.projectName
                        }
                        onChange={(e) =>
                          handleInputChange("projectName", e.target.value)
                        }
                      />
                      <div className="separator"></div>
                      <div className="form-check canvas-input">
                        <h6 className="check-title">Use location as name</h6>
                        <Form.Check
                          type="checkbox"
                          id="custom-switch"
                          checked={formData.useLocationAsName}
                          onChange={(e) =>
                            handleInputChange(
                              "useLocationAsName",
                              e.target.checked
                            )
                          }
                          className="custom-switch"
                        />
                      </div>
                    </Form.Group>

                    {/* Navigation options with previews */}
                    <Form.Group className="form-group">
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("location")}
                      >
                        <span className="icon-tab">
                          <img src={LocationIcon} alt="location" />
                          <div>
                            {formData.location ? (
                              <div className="option-preview">
                                {formData.location}
                              </div>
                            ) : (
                              <div>Location</div>
                            )}
                          </div>
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <div className="separator"></div>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("workers")}
                      >
                        <span className="icon-tab">
                          <img src={WorkersIcon} alt="workers" />
                          <div>
                            {formData.workers.length > 0 ? (
                              <div className="option-preview">
                                {formatWorkers(formData.workers)}
                              </div>
                            ) : (
                              <div>Project Team</div>
                            )}
                          </div>
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                      <div className="separator"></div>
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("admin")}
                      >
                        <span className="icon-tab">
                          <img src={TieIcon} alt="tie" />
                          <div>
                            {formData.admins.length > 0 ? (
                              <div className="option-preview">
                                {formatWorkers(formData.admins)}
                              </div>
                            ) : (
                              <div>Admin</div>
                            )}
                          </div>
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                    </Form.Group>
                    <Form.Group className="form-group">
                      {" "}
                      <button
                        type="button"
                        className="option-item"
                        onClick={() => setActivePanel("documents")}
                      >
                        <span className="icon-tab">
                          <img src={ClipIcon} alt="clip" />
                          <div>
                            {formData.documents.length > 0 ? (
                              <div className="option-preview">
                                {formData.documents.length} documents
                              </div>
                            ) : (
                              <div className="dark-title">Add documents</div>
                            )}
                          </div>
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
                          <div>
                            {formData.tasks.length > 0 ? (
                              <div className="option-preview">Edit task</div>
                            ) : (
                              <div className="dark-title">Add tasks</div>
                            )}
                          </div>
                        </span>
                        <span className="chevron">
                          <img src={Chevron} alt="chevron" />
                        </span>
                      </button>
                    </Form.Group>
                    <Form.Group className="form-group form-description">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      />
                    </Form.Group>
                    <button
                      type="button"
                      className="option-item status-select"
                      onClick={() => setActivePanel("status")}
                    >
                      <span className="icon-tab">
                        <div>
                          {formData.status ? (
                            <div className="option-preview status-wrapper">
                              Project Status
                              <span
                                className={`project-status status-badge ${getTaskStatus(
                                  formData.status
                                )}`}
                              >
                                {formData.status}
                              </span>
                            </div>
                          ) : (
                            <div>Project Status</div>
                          )}
                        </div>
                      </span>
                      <span className="chevron">
                        <img src={Chevron} alt="chevron" />
                      </span>
                    </button>

                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Company name"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                      />
                      <div className="separator"></div>
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Reg. No"
                        value={formData.regNo}
                        onChange={(e) =>
                          handleInputChange("regNo", e.target.value)
                        }
                      />
                      <div className="separator"></div>
                      <Form.Control
                        type="text"
                        className="canvas-input"
                        placeholder="Client representative"
                        value={formData.clientRepresentative}
                        onChange={(e) =>
                          handleInputChange(
                            "clientRepresentative",
                            e.target.value
                          )
                        }
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Project address</h5>
                    <Button
                      className="admin-btn-primary"
                      onClick={() => setActivePanel("main")}
                    >
                      Save
                    </Button>
                  </div>
                  <Location
                    onLocationSelect={(location) =>
                      setFormData((prev) => ({ ...prev, location }))
                    }
                  />
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Project Status</h5>
                    <Button
                      className="admin-btn-primary"
                      onClick={() => setActivePanel("main")}
                    >
                      Save
                    </Button>
                  </div>
                  <Status
                    onStatusSelect={(status) =>
                      setFormData((prev) => ({ ...prev, status }))
                    }
                  />
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Create Tasks</h5>
                    <SaveButton
                      onSave={() => {
                        if (tasksRef.current) {
                          tasksRef.current();
                        }
                        // Navigate back to main panel
                        setActivePanel("main");
                      }}
                      taskTitle={formData.tasks.forEach((task) => task.title)}
                    />
                  </div>
                  <Tasks
                    onTasksSelect={(tasks) =>
                      setFormData((prev) => ({ ...prev, tasks }))
                    }
                    onSaveButtonRef={tasksRef}
                  />
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Select your workers</h5>
                    <Button
                      className="admin-btn-primary"
                      onClick={() => setActivePanel("main")}
                    >
                      Save
                    </Button>
                  </div>
                  <Team
                    onWorkersSelect={(workers) =>
                      setFormData((prev) => ({ ...prev, workers }))
                    }
                  />
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Admins</h5>
                    <Button
                      className="admin-btn-primary"
                      onClick={() => setActivePanel("main")}
                    >
                      Save
                    </Button>
                  </div>
                  <CanvasAdmin
                    onAdminsSelect={(admins) =>
                      setFormData((prev) => ({ ...prev, admins }))
                    }
                  />
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
                      className="canvas-back-button"
                      onClick={() => setActivePanel("main")}
                    >
                      <img src={ChevronLeft} alt="chevron" />
                    </button>
                    <h5 className="subpanel-title">Add documents</h5>
                    <Button
                      className="admin-btn-primary"
                      onClick={() => setActivePanel("main")}
                    >
                      Save
                    </Button>
                  </div>
                  <Documents
                    onDocumentsSelect={(documents) =>
                      setFormData((prev) => ({ ...prev, documents }))
                    }
                  />
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
