import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./CanvasAdmin.css";

const admins = [
  { id: 1, name: "Alex Gerhard", role: "Foreman", avatar: "AG" },
  { id: 2, name: "Alexander Reed", role: "Builder", avatar: "AR" },
  { id: 3, name: "Daniel Thompson", role: "Surveyor", avatar: "DT" },
  { id: 4, name: "Henry Cooper", role: "Roofer", avatar: "HC" },
  { id: 5, name: "Michael Brown", role: "Foreman", avatar: "MB" },
  { id: 6, name: "Sarah Wilson", role: "Builder", avatar: "SW" },
  { id: 7, name: "David Clark", role: "Surveyor", avatar: "DC" },
  { id: 8, name: "Emma Roberts", role: "Roofer", avatar: "ER" },
];

const roles = ["Team project", "Everyone", "Foremans", "Builders", "Surveyors"];

const CanvasAdmin = ({ onAdminsSelect }) => {
  const [selectedRole, setSelectedRole] = useState("Everyone");
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const filteredAdmins = admins.filter((member) => {
    const matchesRole =
      selectedRole === "Everyone" ||
      member.role.toLowerCase() === selectedRole.toLowerCase().slice(0, -1);

    return matchesRole;
  });

  // Handle admin selection
  const handleAdminSelect = (adminName, isSelected) => {
    let updatedAdmins;

    if (isSelected) {
      updatedAdmins = [...selectedAdmins, adminName];
    } else {
      updatedAdmins = selectedAdmins.filter((name) => name !== adminName);
    }

    setSelectedAdmins(updatedAdmins);

    // Send only admin names back to parent
    if (onAdminsSelect) {
      onAdminsSelect(updatedAdmins);
    }
  };



  return (
    <div className="team-selection-container">
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
        {filteredAdmins.map((member) => (
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
              checked={selectedAdmins.includes(member.name)}
              onChange={(e) => handleAdminSelect(member.name, e.target.checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasAdmin;
