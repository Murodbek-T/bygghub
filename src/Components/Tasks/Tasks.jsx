import React, { useState, useRef } from "react";
import { Form, Button, Offcanvas, InputGroup } from "react-bootstrap";
import { Check, Search, Paperclip, ChevronRight } from "react-bootstrap-icons";
import "./Tasks.css";
import ChevronLeft2 from "../../assets/chevron.svg";

import workersIcon from "../../assets/Workers.svg";

// Export the SaveButton component
export const SaveButton = ({
  onSave,
  // Add any other props you need for validation
}) => {
  const handleClick = () => {
    // Call the onSave callback from AdminButtons
    if (onSave) {
      onSave();
    }
  };

  return (
    <Button className="admin-btn-primary" onClick={handleClick}>
      Save
    </Button>
  );
};

const Tasks = ({ onTasksSelect, onSaveButtonRef }) => {
  // State for controlling the visibility of the off-canvas components
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAssignTo, setShowAssignTo] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [showProjectSelect, setShowProjectSelect] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  // State for user selections
  const [selectedMembers, setSelectedMembers] = useState([1, 2]);
  const [customReminderText, setCustomReminderText] = useState("");
  const [reminderType, setReminderType] = useState("custom");
  const [repeatOption, setRepeatOption] = useState("hourly");

  // New states for main form
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [notes, setNotes] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (["pdf"].includes(extension)) return "pdf";
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension))
      return "image";
    if (["doc", "docx", "txt"].includes(extension)) return "document";
    if (["xls", "xlsx", "csv"].includes(extension)) return "spreadsheet";
    if (["zip", "rar", "7z"].includes(extension)) return "zip";
    return "file";
  };

  // Mock data
  const teamMembers = [
    { id: 1, name: "Alex Gerhard", role: "Foreman", avatar: "AG" },
    { id: 2, name: "Alexander Reed", role: "Builder", avatar: "AR" },
    { id: 3, name: "Daniel Thompson", role: "Surveyor", avatar: "DT" },
    { id: 4, name: "Henry Cooper", role: "Roofer", avatar: "HC" },
  ];

  const projects = [
    { id: 1, name: "Ludvika Residential Complex" },
    { id: 2, name: "Residential Complex Norrmalm" },
    { id: 3, name: "Shopping Center Svea" },
    { id: 4, name: "Hospital Wing Karolinska" },
  ];

  const repeatOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
  ];

  // Handler to toggle member selection
  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Project selection handler
  const handleProjectSelect = (project) => {
    setSelectedProject(project.name);
    setShowProjectSelect(false);
  };

  // Date and time handlers
  const handleStartDateTimeSelect = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().slice(0, 5);

    setStartDate(formattedDate);
    setStartTime(formattedTime);
    setShowStartDate(false);
  };

  const handleDueDateTimeSelect = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];
    const formattedTime = "17:00";

    setDueDate(formattedDate);
    setDueTime(formattedTime);
    setShowDueDate(false);
  };

  // Format date for display
  const formatDateDisplay = (date, time) => {
    if (!date)
      return (
        <>
          <p className="month-date">Month Year</p> <p className="time">Time</p>
        </>
      );

    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();
    return (
      <>
        <p className="month-date">
          {month} {year}
        </p>{" "}
        <p className="time">{time}</p>
      </>
    );
  };

  // Save task handler
  const handleSaveTask = () => {
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      project: selectedProject,
      startDate,
      startTime,
      dueDate,
      dueTime,
      assignedMembers: selectedMembers,
      reminderType,
      customReminder: customReminderText,
      repeatOption,
      notes,
      attachments: uploadedFiles.map((f) => f.name),
    };

    console.log("Saving task:", taskData);

    // Send task data to parent via callback
    if (onTasksSelect) {
      onTasksSelect([taskData]);
    }
  };
  React.useEffect(() => {
    if (onSaveButtonRef) {
      onSaveButtonRef.current = handleSaveTask;
    }
  }, [onSaveButtonRef, handleSaveTask]);
  // UI component for an input field that triggers an Offcanvas/Modal
  const NavigableInput = ({ label, value, onClick }) => (
    <div className="navigable-input" onClick={onClick}>
      <div className="navigable-input-label">{label}</div>
      <div className="navigable-input-value">{value}</div>
    </div>
  );

  // UI component for a list item with a checkmark indicator
  const ListItemWithCheck = ({ label, isSelected, onClick }) => (
    <div className="list-item-with-check" onClick={onClick}>
      <span>{label}</span>
      <div className={`check-indicator ${isSelected ? "selected" : ""}`}>
        {isSelected && <Check size={18} />}
      </div>
    </div>
  );

  // Helper component for member list item
  const MemberListItem = ({ member, isSelected, onClick }) => (
    <div className="member-list-item-wrapper" onClick={onClick}>
      <div className="member-info-container">
        <div className="member-avatar">{member.avatar}</div>
        <div className="member-details">
          <div className="member-name">{member.name}</div>
          <div className="member-role">{member.role}</div>
        </div>
      </div>
      <div className={`member-check ${isSelected ? "selected" : ""}`}>
        {isSelected ? (
          <Check size={20} color="#007bff" />
        ) : (
          <div className="unselected-circle"></div>
        )}
      </div>
    </div>
  );

  // File upload component
  const FileUploadSection = () => (
    <div
      className={`file-upload-section ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h6>Upload Documents</h6>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileUpload}
        className="file-input"
      />
      <Button
        variant="outline-primary"
        onClick={() => fileInputRef.current.click()}
        className="upload-btn"
      >
        Choose Files
      </Button>

      <p style={{ marginTop: "12px", color: "#6c757d", fontSize: "14px" }}>
        or drag and drop files here
      </p>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-list">
          <h6>Uploaded Files:</h6>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="uploaded-file-item"
              data-file-type={getFileType(file.name)}
            >
              <span>{file.name}</span>
              <Button
                variant="outline-danger"
                onClick={() => removeFile(index)}
                title="Remove file"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="tasks-container">
      {/* Main Task Creation Form */}
      <Form className="form-group">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Task Title"
            className="input-field title-field"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="separator"></div>
          <Form.Control
            type="text"
            placeholder="Task Description"
            className="input-field desc-field"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div className="separator"></div>
        </Form.Group>

        {/* Navigable List */}
        <div className="nav-list-container">
          <NavigableInput
            label="Project"
            value={<p className="selected-project-name">{selectedProject}</p>}
            onClick={() => setShowProjectSelect(true)}
          />
          <NavigableInput
            label="Start Date"
            value={formatDateDisplay(startDate, startTime)}
            onClick={() => setShowStartDate(true)}
          />
          <NavigableInput
            label="Due Date"
            value={formatDateDisplay(dueDate, dueTime)}
            onClick={() => setShowDueDate(true)}
          />
          <NavigableInput
            label="Notifications"
            value=""
            onClick={() => setShowNotifications(true)}
          />
        </div>
      </Form>

      <div className="documents-wrapper">
        <NavigableInput
          label={
            <div className="documents-wrapper">
              <Paperclip size={18} />{" "}
              {uploadedFiles.length > 0
                ? `${uploadedFiles.length} files uploaded`
                : "Add documents"}
            </div>
          }
          value={
            <p>
              {uploadedFiles.length > 0 ? `${uploadedFiles.length} files` : ""}
            </p>
          }
          onClick={() => setShowDocuments(true)}
        />
      </div>

      <div className="notes-container">
        <Form.Control
          as="input"
          rows={3}
          placeholder="Notes"
          className="input-field notes-field"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* 1. Notifications Offcanvas */}
      <Offcanvas
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => setShowNotifications(false)}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Notifications
          </Offcanvas.Title>
          <Button
            variant="primary"
            className="save-btn-offcanvas"
            onClick={() => setShowNotifications(false)}
          >
            Save
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <div
            className="notification-team"
            onClick={() => {
              setShowNotifications(false);
              setShowAssignTo(true);
            }}
          >
            <div className="wrapper">
              <img src={workersIcon} alt="workers" />
              <p className="notification-title">Select project members</p>
            </div>
          </div>

          <hr className="divider" />

          <Form.Group className="form-group">
            <div className="reminder-option-toggle">
              <span>Auto Reminder</span>
              <Form.Check
                type="switch"
                id="auto-reminder-switch"
                checked={reminderType === "auto"}
                onChange={() => setReminderType("auto")}
                className="custom-toggle"
              />
            </div>

            <div className="reminder-option-toggle">
              <span>Custom Reminder</span>
              <Form.Check
                type="switch"
                id="custom-reminder-switch"
                checked={reminderType === "custom"}
                onChange={() => setReminderType("custom")}
                className="custom-toggle green-toggle"
              />
            </div>

            {reminderType === "custom" && (
              <Form.Control
                as="input"
                rows={2}
                placeholder="Write your own reminder for the team."
                value={customReminderText}
                onChange={(e) => setCustomReminderText(e.target.value)}
                className="input-field"
              />
            )}
          </Form.Group>

          <div className="form-group repeat">
            <NavigableInput
              label="Repeat"
              value={
                <ChevronRight
                  size={20}
                  color="#052d50"
                  fontWeight={700}
                  className="chevron-right"
                />
              }
              onClick={() => {
                setShowNotifications(false);
                setShowRepeat(true);
              }}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 2. Assign To Offcanvas */}
      <Offcanvas
        show={showAssignTo}
        onHide={() => setShowAssignTo(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => {
              setShowAssignTo(false);
              setShowNotifications(true);
            }}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Assign to
          </Offcanvas.Title>
          <Button
            variant="primary"
            className="save-btn-offcanvas"
            onClick={() => setShowAssignTo(false)}
          >
            Save
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <InputGroup className="mb-4 search-group">
            <Form.Control
              type="text"
              placeholder="Search"
              className="search-input-field"
            />
            <InputGroup.Text className="search-icon-wrapper">
              <Search size={18} />
            </InputGroup.Text>
          </InputGroup>

          <div className="role-filters-container mb-4">
            {["Everyone", "Foremans", "Builders", "Surveyors", "Roofers"].map(
              (role, index) => (
                <Button
                  key={index}
                  variant={role === "Everyone" ? "primary" : "light"}
                  className={`role-filter-pill ${
                    role === "Everyone" ? "active" : ""
                  }`}
                >
                  {role}
                </Button>
              )
            )}
          </div>

          <div className="members-list-container">
            {teamMembers.map((member) => (
              <MemberListItem
                key={member.id}
                member={member}
                isSelected={selectedMembers.includes(member.id)}
                onClick={() => toggleMemberSelection(member.id)}
              />
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 3. Repeat Offcanvas */}
      <Offcanvas
        show={showRepeat}
        onHide={() => setShowRepeat(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => {
              setShowRepeat(false);
              setShowNotifications(true);
            }}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Repeat
          </Offcanvas.Title>
          <Button
            variant="primary"
            className="save-btn-offcanvas"
            onClick={() => setShowRepeat(false)}
          >
            Save
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <div className="repeat-options-container">
            {repeatOptions.map((option) => (
              <ListItemWithCheck
                key={option.value}
                label={option.label}
                isSelected={repeatOption === option.value}
                onClick={() => setRepeatOption(option.value)}
              />
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 4. Project Selection Offcanvas */}
      <Offcanvas
        show={showProjectSelect}
        onHide={() => setShowProjectSelect(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => setShowProjectSelect(false)}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Select Project
          </Offcanvas.Title>
          <Button className="admin-btn-primary">Save</Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <div className="project-list-container">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-list-item"
                onClick={() => handleProjectSelect(project)}
              >
                {project.name}
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 5. Documents Offcanvas */}
      <Offcanvas
        show={showDocuments}
        onHide={() => setShowDocuments(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => setShowDocuments(false)}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Add Documents
          </Offcanvas.Title>
          <Button
            className="admin-btn-primary"
            onClick={() => setShowDocuments(false)}
          >
            Save
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <FileUploadSection />
        </Offcanvas.Body>
      </Offcanvas>

      {/* 6. Start Date Offcanvas */}
      <Offcanvas
        show={showStartDate}
        onHide={() => setShowStartDate(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => setShowStartDate(false)}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Start Date & Time
          </Offcanvas.Title>
          <Button
            variant="primary"
            className="save-btn-offcanvas"
            onClick={handleStartDateTimeSelect}
          >
            Set
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 7. Due Date Offcanvas */}
      <Offcanvas
        show={showDueDate}
        onHide={() => setShowDueDate(false)}
        placement="end"
        className="tasks-offcanvas"
        style={{
          height: "calc(100vh - 100px)",
          top: "100px",
        }}
      >
        <div className="offcanvas-header-custom">
          <button
            className="canvas-back-button"
            onClick={() => setShowDueDate(false)}
          >
            <img src={ChevronLeft2} alt="chevron" />
          </button>
          <Offcanvas.Title className="offcanvas-title-custom">
            Due Date & Time
          </Offcanvas.Title>
          <Button
            variant="primary"
            className="save-btn-offcanvas"
            onClick={handleDueDateTimeSelect}
          >
            Set
          </Button>
        </div>
        <Offcanvas.Body className="offcanvas-body-custom">
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Tasks;
