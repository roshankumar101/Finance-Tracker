export interface Transaction {
  id: string,
  title: string,
  type: string,
  amount: number,
  date: string,
}


export interface Balance {
  income: number,
  expense: number,
}



// to generate unique id for transaction
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 8).toLowerCase();
};


export const addTransaction = ( transaction: Transaction ) => {
  const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]')
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  manageBalance(transaction.type, transaction.amount)
}


export const deleteTransaction = ( deleteById: string ) => {
  const deletingTransaction: Transaction = JSON.parse(localStorage.getItem('transactions') || '[]').find(transaction => transaction.id === deleteById);
  console.log(deletingTransaction, deletingTransaction.type, deletingTransaction.amount);
  manageBalance(deletingTransaction.type, -1*(deletingTransaction.amount));

  const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]')
                                      .filter(transaction => transaction.id !== deleteById);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


// to update the balance for summary part
const manageBalance = (type: string, amount: number) => {
  console.log(type, amount);
  const balance: Balance = JSON.parse(localStorage.getItem('balance') || '{"income": 0, "expense": 0}')
  if(type === 'Income'){
    balance.income += amount
  }else{
    balance.expense += amount
  }
  localStorage.setItem('balance', JSON.stringify(balance));
}


export const getTransactions =  (): Transaction[] => {
  return JSON.parse(localStorage.getItem('transactions') || '[]')
}

export const getBalance = (): Balance => {
  return JSON.parse(localStorage.getItem('balance') || '{"income": 0, "expense": 0}');
}