import React from 'react';

interface WalletCardProps {
  wallet: {
    wallet_id: string;
    bankname: string;
    currency: string;
    amount: string;
  };
  onSelect: (walletId: string) => void;
  isSelected: boolean;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, onSelect, isSelected }) => {
  const styles = {
    card: {
      backgroundColor: isSelected ? '#2d2d2d' : '#18181b',
      color: '#a1a1aa',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 10px 15px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
      width: '300px',
      height: '150px',
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'space-between' as 'space-between',
      position: 'relative' as 'relative',
      overflow: 'hidden' as 'hidden',
      cursor: 'pointer' as 'pointer',
    },
    bankname: {
      fontSize: '1.5rem',
      fontWeight: 'bold' as 'bold',
      color: '#fff',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between' as 'space-between',
      alignItems: 'center' as 'center',
      fontSize: '1.2rem',
      color: '#d4d4d8',
    },
  };

  return (
    <div style={styles.card} onClick={() => onSelect(wallet.wallet_id)}>
      <div style={styles.bankname}>{wallet.bankname}</div>
      <div style={styles.details}>
        <span>{wallet.currency}</span>
        <span>{wallet.amount}</span>
      </div>
    </div>
  );
};

export default WalletCard;
