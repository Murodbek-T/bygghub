import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "./Documents.css";

import ClipperIcon from "../../assets/Paperclip.svg";

const Documents = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("application/") ||
        file.type === "application/pdf" ||
        file.type.includes("document")
    );

    setFiles((prev) => [...prev, ...validFiles]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return ClipperIcon;
    } else if (file.type === "application/pdf") {
      return ClipperIcon;
    } else if (file.type.includes("document") || file.type.includes("word")) {
      return ClipperIcon;
    } else if (file.type.includes("sheet") || file.type.includes("excel")) {
      return ClipperIcon;
    } else {
      return ClipperIcon;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="file-upload-container">
      {/* Drag and Drop Area */}
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""} ${
          files.length > 0 ? "has-files" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-zone-content">
          <h3 className="upload-title">Drag and drop your documents</h3>
          <p className="upload-subtitle">here, or click "Upload File"</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
            className="file-input"
          />

          <Button
            variant="primary"
            className="upload-button admin-btn-secondary"
            onClick={handleUploadClick}
          >
            Upload file
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="uploaded-files">
          <div className="files-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <img src={getFileIcon(file)} alt="file" />
                  <div className="file-details">
                    <div className="file-name">{file.name}</div>
                  </div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="remove-btn"
                  onClick={() => removeFile(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
