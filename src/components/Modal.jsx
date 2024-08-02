import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, data }) => {
  const [selectedId, setSelectedId] = useState('');

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };

  const handleOkClick = () => {
    if (selectedId) {
      window.location.href = `/dashboard/${selectedId}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select an ID</h2>
        <select onChange={handleSelectChange} value={selectedId}>
          <option value="" disabled>Select an ID</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </select>
        <button onClick={handleOkClick}>OK</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
