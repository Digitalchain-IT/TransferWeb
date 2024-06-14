import React from 'react';

const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  const styles = {
    overlay: {
      position: 'fixed' as 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      background: '#fff',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
    },
    button: {
      marginTop: '10px',
      padding: '10px 20px',
      background: '#05668D',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>
        <button style={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
