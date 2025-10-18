import React, { useState } from "react";
import "./Status.css";
import { Check } from "react-bootstrap-icons";

const Status = ({ onStatusSelect }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusOptions = [
    { value: "in-progress", label: "In Progress" },
    { value: "on-pause", label: "On Pause" },
    { value: "negotiation", label: "Negotiation" },
    { value: "finished", label: "Finished" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // Send the selected status back to parent
    if (onStatusSelect) {
      onStatusSelect(status);
    }
  };

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
          onClick={() => handleStatusSelect(option.label)}
        />
      ))}
    </div>
  );
};

export default Status;
