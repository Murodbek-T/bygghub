import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./Team.css";

const Team = ({ onWorkersSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Everyone");
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const teamMembers = [
    { id: 1, name: "Alex Gerhard", role: "Foreman", avatar: "AG" },
    { id: 2, name: "Alexander Reed", role: "Builder", avatar: "AR" },
    { id: 3, name: "Daniel Thompson", role: "Surveyor", avatar: "DT" },
    { id: 4, name: "Henry Cooper", role: "Roofer", avatar: "HC" },
    { id: 5, name: "Michael Brown", role: "Foreman", avatar: "MB" },
    { id: 6, name: "Sarah Wilson", role: "Builder", avatar: "SW" },
    { id: 7, name: "David Clark", role: "Surveyor", avatar: "DC" },
    { id: 8, name: "Emma Roberts", role: "Roofer", avatar: "ER" },
  ];

  const roles = ["Everyone", "Foremans", "Builders", "Surveyors", "Roofers"];

  // Filter team members based on search and role
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "Everyone" ||
      member.role.toLowerCase() === selectedRole.toLowerCase().slice(0, -1);

    return matchesSearch && matchesRole;
  });

  // Handle worker selection
  const handleWorkerSelect = (workerName, isSelected) => {
    let updatedWorkers;

    if (isSelected) {
      updatedWorkers = [...selectedWorkers, workerName];
    } else {
      updatedWorkers = selectedWorkers.filter((name) => name !== workerName);
    }

    setSelectedWorkers(updatedWorkers);

    // Send only worker names back to parent
    if (onWorkersSelect) {
      onWorkersSelect(updatedWorkers);
    }
  };



  return (
    <div className="team-selection-container">
      {/* Search Bar */}
      <div className="search-section mb-4">
        <InputGroup className="search-input-group">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </InputGroup>
      </div>

      {/* Role Filter Buttons */}
      <div className="role-filters mb-4">
        <div className="role-buttons">
          {roles.map((role) => (
            <Button
              key={role}
              variant={selectedRole === role ? "primary" : "outline-secondary"}
              className={`role-btn ${selectedRole === role ? "active" : ""}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>
      </div>

 

   

      {/* Team Members List */}
      <div className="team-members-list">
        {filteredMembers.map((member) => (
          <div key={member.id} className="team-member-item">
            <div className="member-info">
              <div className="member-avatar">{member.avatar}</div>
              <div className="member-details">
                <div className="member-name">{member.name}</div>
                <div className="member-role">{member.role}</div>
              </div>
            </div>
            <Form.Check
              type="checkbox"
              id={`member-${member.id}`}
              className="member-checkbox"
              checked={selectedWorkers.includes(member.name)}
              onChange={(e) =>
                handleWorkerSelect(member.name, e.target.checked)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
