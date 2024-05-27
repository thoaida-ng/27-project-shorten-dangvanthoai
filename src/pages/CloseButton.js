import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CloseButton({ to }) { // Nhận tham số 'to' cho đường dẫn chuyển hướng
  const navigate = useNavigate();

  return (
    <button className="close-button" onClick={() => navigate(to)}>
      <span className="close-icon">x</span>
    </button>
  );
}

export default CloseButton;