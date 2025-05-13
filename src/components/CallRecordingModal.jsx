import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faSave } from '@fortawesome/free-solid-svg-icons';

const CallRecordingModal = ({ show, handleClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingName, setRecordingName] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement actual recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSaveRecording = () => {
    // Save recording logic here
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record Call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="recordingName" className="form-label">Recording Name</label>
          <input
            type="text"
            className="form-control"
            id="recordingName"
            value={recordingName}
            onChange={(e) => setRecordingName(e.target.value)}
            placeholder="Enter recording name"
          />
        </div>
        <div className="d-flex justify-content-center mb-3">
          {isRecording ? (
            <div className="text-center">
              <div className="mb-2">
                <FontAwesomeIcon icon={faMicrophone} className="text-danger fa-3x pulse" />
              </div>
              <p className="text-danger">Recording in progress...</p>
              <Button variant="danger" onClick={handleStopRecording}>
                <FontAwesomeIcon icon={faStop} className="me-2" />
                Stop Recording
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={handleStartRecording}>
              <FontAwesomeIcon icon={faMicrophone} className="me-2" />
              Start Recording
            </Button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSaveRecording} disabled={!isRecording}>
          <FontAwesomeIcon icon={faSave} className="me-2" />
          Save Recording
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CallRecordingModal;