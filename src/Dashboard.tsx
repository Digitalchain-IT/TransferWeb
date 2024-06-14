import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransferForm from './TransferForm';

interface Wallet {
  wallet_id: string;
  bankname: string;
  currency: string;
  amount: string;
}

const Dashboard: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWallets = async () => {
      const customerId = localStorage.getItem('customer_id');
      if (customerId) {
        try {
          const response = await axios.get(`http://127.0.0.1:3000/customer-wallets/${customerId}`);
          setWallets(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching wallets:', error);
          setLoading(false);
        }
      }
    };

    fetchWallets();
  }, []);

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  const handleSubmit = () => {
    if (selectedWallet) {
      console.log('Selected Wallet:', selectedWallet);
      // Add your submit logic here
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      textAlign: 'center' as 'center',
      position: 'relative' as 'relative',
      minHeight: '100vh',
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
    submitButton: {
      marginTop: '1rem',
      padding: '15px 30px',
      background: '#ffffff',
      color: '#05668D',
      border: '2px solid #05668D',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: 'bold' as 'bold',
      position: 'absolute' as 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
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
    localStorage.removeItem('customer_id');
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>Complete Transfer</header>
      <div>
        <h2>Select a Wallet</h2>
        {loading ? (
          <p>Loading wallets...</p>
        ) : (
          <ul style={styles.walletList}>
            {wallets.map(wallet => (
              <li
                key={wallet.wallet_id}
                style={{
                  ...styles.walletItem,
                  ...(selectedWallet && selectedWallet.wallet_id === wallet.wallet_id
                    ? styles.walletItemSelected
                    : {}),
                }}
                onClick={() => handleWalletSelect(wallet)}
              >
                {wallet.bankname} - {wallet.currency} {wallet.amount}
              </li>
            ))}
          </ul>
        )}
        {selectedWallet && (
          <div>
            <h3>Selected Wallet:</h3>
            <p>{selectedWallet.bankname} - {selectedWallet.currency} {selectedWallet.amount}</p>
            <button style={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
