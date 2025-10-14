import React, { useState } from "react";
import "./Status.css";
import { Check } from "react-bootstrap-icons";

const Status = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const statusOptions = [
    { value: "in-progress", label: "In Progress" },
    { value: "on-pause", label: "On Pause" },
    { value: "negotiation", label: "Negotiation" },
    { value: "finished", label: "Finished" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const NavigableInput = ({ label, value, onClick, showArrow = true }) => (
    <div className="navigable-input" onClick={onClick}>
      <div className="navigable-input-label">{label}</div>
      <div className="navigable-input-value">{value || "Select status"}</div>
      {showArrow && <div className="navigable-input-arrow">{">"}</div>}
    </div>
  );

  const ListItemWithCheck = ({ label, isSelected, onClick }) => (
    <div className="list-item-with-check" onClick={onClick}>
      <span>{label}</span>
      <div className={`check-indicator ${isSelected ? "selected" : ""}`}>
        {isSelected && <Check size={18} />}
      </div>
    </div>
  );

  return (
    <div>
      {statusOptions.map((option) => (
        <ListItemWithCheck
          key={option.value}
          label={option.label}
          isSelected={selectedStatus === option.label}
          onClick={() => setSelectedStatus(option.label)}
        />
      ))}
    </div>
  );
};

export default Status;
