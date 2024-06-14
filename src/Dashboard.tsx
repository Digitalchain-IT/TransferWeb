import React, { useState, useEffect } from 'react';
import TransferForm from './TransferForm';

interface Wallet {
  id: string;
  name: string;
  balance: number;
}

const Dashboard: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    // Fetch wallets data (simulated here with hardcoded data)
    const fetchWallets = async () => {
      const walletData: Wallet[] = [
        { id: '1', name: 'Wallet 1', balance: 500 },
        { id: '2', name: 'Wallet 2', balance: 1500 },
        { id: '3', name: 'Wallet 3', balance: 250 },
      ];
      setWallets(walletData);
    };

    fetchWallets();
  }, []);

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

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
    walletList: {
      listStyleType: 'none' as 'none',
      padding: 0,
    },
    walletItem: {
      padding: '1rem',
      margin: '0.5rem 0',
      background: '#f0f0f0',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    walletItemSelected: {
      background: '#d0d0d0',
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
    <>
      <div style={styles.container}>
        <header style={styles.header}>Dashboard</header>
        <div>
          <h2>Select a Wallet</h2>
          <ul style={styles.walletList}>
            {wallets.map(wallet => (
              <li
                key={wallet.id}
                style={{
                  ...styles.walletItem,
                  ...(selectedWallet && selectedWallet.id === wallet.id
                    ? styles.walletItemSelected
                    : {}),
                }}
                onClick={() => handleWalletSelect(wallet)}
              >
                {wallet.name} - ${wallet.balance}
              </li>
            ))}
          </ul>
          {selectedWallet && (
            <div>
              <h3>Selected Wallet:</h3>
              <p>{selectedWallet.name} - ${selectedWallet.balance}</p>
            </div>
          )}
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <TransferForm />
    </>
  );
};

export default Dashboard;
