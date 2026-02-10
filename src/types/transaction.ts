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


export type Refresh = {
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}


// to generate unique id for transaction
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 8).toLowerCase();
};


export const addTransaction = ( transaction: Transaction ) => {
  const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]')
  const sortedTransactions = [...transactions, transaction].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  localStorage.setItem('transactions', JSON.stringify(sortedTransactions));

  manageBalance(transaction.type, transaction.amount);
}


export const deleteTransaction = ( deleteById: string ) => {
  const deletingTransaction = (JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[])
                                            .find(transaction => transaction.id === deleteById);
  if(deletingTransaction){                                          
    console.log(deletingTransaction, deletingTransaction.type, deletingTransaction.amount);
    manageBalance(deletingTransaction.type, -1*(deletingTransaction.amount));
  }else{
    throw Error('Deleting Records not Found!');
  }

  const transactions: Transaction[] = (JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[])
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