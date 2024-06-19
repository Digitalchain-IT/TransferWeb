import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

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
                    const response = await axios.get(`http://34.46.187.223:3000/customer-wallets/${customerId}`);
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

    const handleTransfer = async () => {
        if (selectedWallet) {
            const requestBody = {
                symbol: "AEDT",
                issuer: "SHA-256:3BC51062973C458D5A6F2D8D64A023246354AD7E064B1E4E009EC8A0699A3043",
                amount: "10",
                transferTo: "703277d7-5612-4a39-a99f-ac7d76caa9a2",
                transferFrom: "1fea91b6-58cf-4315-8260-b06561578055"
            };

            try {
                const response = await axios.post(`http://34.46.187.223:1336/token/transfer/4F01E4B3DBB0`, requestBody, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log('Transfer response:', response.data);
                alert(`Transfer successful: ${JSON.stringify(response.data)}`);
            } catch (error: any) {
                console.error('Error during transfer:', error);
                alert(`Transfer failed: ${error.message || 'An unknown error occurred'}`);
            }
        }
    };

    return (
        <div className="container">
            <header className="header">Complete Transfer</header>
            <div>
                <h2>Select a Wallet</h2>
                {loading ? (
                    <p>Loading wallets...</p>
                ) : (
                    <ul className="wallet-list">
                        {wallets.map(wallet => (
                            <li
                                key={wallet.wallet_id}
                                className={`wallet-item ${selectedWallet && selectedWallet.wallet_id === wallet.wallet_id ? 'wallet-item-selected' : ''}`}
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
                        <button className="submit-button" onClick={handleTransfer}>
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;