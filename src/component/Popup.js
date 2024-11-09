import React from "react";



const popupOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const popupStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  };

  
export default function Popup({ onClose, title, children }) {
    return (
      <div style={popupOverlayStyles}>
        <div style={popupStyles}>
          <h2>{title}</h2>
          {children}
          <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
      </div>
    );
  }