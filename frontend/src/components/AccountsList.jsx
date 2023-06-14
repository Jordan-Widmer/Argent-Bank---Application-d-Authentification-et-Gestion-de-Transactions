import React from 'react';
import Account from './Account';

function AccountsList({ accounts }) {
  return (
    <div>
      <h2 className="sr-only">Accounts</h2>
      {accounts && accounts.map((account) =>
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      )}
    </div>
  );
}

export default AccountsList;
