import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import mockTransactions from '../mock/transactions.json';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTimeout(() => setTransactions(mockTransactions), 1000);
  }, []);

  if (transactions.length === 0) {
    return <div className="page-loading">Loading...</div>;
  }

  return (
    <div className="page-background">
      <NavBar />
      <div className="transactions-wrapper">
        <h2>Argent Bank Checking (x8349)</h2>
        <h3>$2,082.79</h3>
        <p>Available Balance</p>
        <table className="transactions-table">
          <thead>
            <tr>
              <th className="table-header">DATE</th>
              <th className="table-header">DESCRIPTION</th>
              <th className="table-header">AMOUNT</th>
              <th className="table-header">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="table-data">{transaction.date}</td>
                <td className="table-data">{transaction.description}</td>
                <td className="table-data">${transaction.amount.toFixed(2)}</td>
                <td className="table-data">${transaction.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default TransactionsPage;
