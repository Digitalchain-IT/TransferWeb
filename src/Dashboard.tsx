import React from 'react';

const Dashboard: React.FC = () => {
  const styles = {
    container: {
      padding: '2rem',
      textAlign: 'center' as 'center',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '1.5rem',
    },
    content: {
      fontSize: '1.2rem',
    },
    logoutButton: {
      marginTop: '1rem',
      padding: '10px 20px',
      background: '#05668D',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const handleLogout = () => {
    // Logic to handle logout
    alert('Logged out');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>Dashboard</header>
      <div style={styles.content}>
        <p>Welcome to the Dashboard!</p>
        <p>Here you can manage your application.</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
