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

    const handleTransfer = async () => {
        if (selectedWallet) {
            const requestBody = {
                symbol: "AEDT",
                issuer: "SHA-256:3BC51062973C458D5A6F2D8D64A023246354AD7E064B1E4E009EC8A0699A3043",
                amount: "10",
                transferTo: "703277d7-5612-4a39-a99f-ac7d76caa9a2",
                transferFrom: "c8f7a2ab-5bae-4853-8bdd-f52b1153d1ca"
            };

            try {
                const response = await axios.post(`http://127.0.0.1:1336/token/transfer/4F01E4B3DBB0`, requestBody, {
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

    const parameters = {
        symbol: "AEDT",
        issuer: "SHA-256:3BC51062973C458D5A6F2D8D64A023246354AD7E064B1E4E009EC8A0699A3043",
        amount: "10",
        transferTo: "703277d7-5612-4a39-a99f-ac7d76caa9a2",
        transferFrom: "c8f7a2ab-5bae-4853-8bdd-f52b1153d1ca"
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
                        <div className="request-body-box">
                            <h4>Transfer Details:</h4>
                            <p>Symbol: ${parameters.symbol}</p>
                            <p>Issuer: ${parameters.issuer}</p>
                            <p>Amount: ${parameters.amount}</p>
                            <p>Transfer To: ${parameters.transferTo}</p>
                            <p>Transfer From: ${parameters.transferFrom}</p>
                        </div>
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