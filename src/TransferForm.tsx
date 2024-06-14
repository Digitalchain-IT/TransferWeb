import React, { ChangeEvent, useState } from 'react';
import apiClient from './apiClient';
import './TransferForm.css';

const TransferForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [symbol, setSymbol] = useState<string>('');
  const [issuer, setIssuer] = useState<string>('');
  const [transferTo, setTransferTo] = useState<string>('');
  const [transferFrom, setTransferFrom] = useState<string>('');
  const [shorthash, setShorthash] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'symbol':
        setSymbol(value);
        break;
      case 'issuer':
        setIssuer(value);
        break;
      case 'transferTo':
        setTransferTo(value);
        break;
      case 'transferFrom':
        setTransferFrom(value);
        break;
      case 'amount':
        handleAmountChange(e);
        break;
      case 'shorthash':
        setShorthash(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol && transferTo && amount > 0 && issuer && transferFrom) {
      const requestData = {
        symbol,
        amount,
        transferTo,
        transferFrom,
        issuer
      };

      try {
        const response = await apiClient.post(`/token/transfer/${shorthash}`, requestData);

        if (response.status === 200) {
          console.log('Response:', response.data);
          setResponseMessage('Transfer successful!');
        } else {
          console.log('No data found');
          setResponseMessage('No data found.');
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setResponseMessage('Error fetching data.');
      }
    } else {
      console.warn('Missing Data');
      setResponseMessage('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="transfer-form-container">
      <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Symbol:</label>
          <input type="text" name="symbol" value={symbol} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Issuer:</label>
          <input type="text" name="issuer" value={issuer} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input type="number" name="amount" value={amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Transfer To:</label>
          <input type="text" name="transferTo" value={transferTo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Transfer From:</label>
          <input type="text" name="transferFrom" value={transferFrom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Shorthash:</label>
          <input type="text" name="shorthash" value={shorthash} onChange={handleChange} />
        </div>
        <button type="submit">Transfer</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default TransferForm;