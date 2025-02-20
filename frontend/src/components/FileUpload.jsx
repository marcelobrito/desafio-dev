// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

const FileUpload = ({getCnabs}) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = () => {
    setDragging(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0]; // Get the first file
    if (droppedFile) {
      setFile(droppedFile);
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  const handleSubmit = async () => {
    if(!file) {
      setUploadStatus('Por favor selecione um arquivo para fazer o upload.');
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/cnab', {
        method: 'POST',
        body: form
      });

      const data = await response.json();

      setUploadStatus(data.message);
      
      if(response.status == 200)
            await getCnabs();
      
      setLoading(false);
        
    } catch (error) {
        setUploadStatus(error.message);
        setLoading(false);
    }
  }

  return (
      <div className="upload-container">
        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Pegue e solte um arquivo ou clique no botão para fazer o upload</p>
          <input
            type="file"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="btn">Selecione um arquivo txt</label>
        </div>

        {file && (
          <div className="file-info">
            {file && <p>Arquivo selecionado: {file.name}</p>}
          </div>
        )}
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? <img src="/loading.gif" className="loading" /> : 'Upload'}
          </button>
        {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
FileUpload.propTypes = {
  getCnabs: PropTypes.func.isRequired
}

export default FileUpload;
