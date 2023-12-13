import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import mockTransactions from '../mock/transactions.json';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const { accountType } = useParams();

  useEffect(() => {
    const filteredTransactions = mockTransactions.filter(transaction => transaction.accountType === accountType);
    setTimeout(() => setTransactions(filteredTransactions), 1000);
  }, [accountType]);

  if (transactions.length === 0) {
    return <div className="page-loading">Chargement...</div>;
  }

// The balance of the first transaction is the available balance
const availableBalance = transactions.length > 0 ? transactions[0].balance : 0;

// Dynamic title based on account type
const title = `Argent Bank ${accountType.charAt(0).toUpperCase() + accountType.slice(1)}`;

  return (
    <div className="page-background">
      <NavBar />
      <div className="transactions-wrapper">
        <h2>{title}</h2>
        <h3>${availableBalance.toFixed(2)}</h3>
        <p>Solde Disponible</p>
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
