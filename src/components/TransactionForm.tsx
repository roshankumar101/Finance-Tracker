import { useState, FormEvent } from 'react'

interface Transaction {
  id: string,
  title: string,
  type: string,
  amount: number,
  date: string
}

const TransactionForm = () => {


  const [formVisible, setFormVisible] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>({id: '',title: '', type: '', amount: NaN, date: ''})

  // to generate unique id
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 8).toLowerCase();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if(isNaN(transaction.amount) || transaction.amount < 0){
      alert("Amount should be greater than 0")
      return;
    }

    // setting generated id in the transaction
    const withUniqueId = {...transaction, id: generateId()};
    setTransaction(withUniqueId)


    const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(withUniqueId);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    

    setTransaction({id: '', title: '', type: '', amount: NaN, date:  ''})
    
    setFormVisible(false)
  }
  
  
  
  const setInput = <T extends keyof Transaction>(field: T, value: Transaction[T]): void => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className='w-full h-full px-5 sm:px-10 py-4'>
      <div className='flex justify-between items-center py-1 mb-5 sm:mb-8'>
        <h2 className='text-nowrap text-sm sm:text-xl font-bold'>Add New Transaction</h2>
        <button className='text-nowrap bg-amber-500 active:scale-95 px-3 sm:px-4 py-1 text-sm sm:text-lg font-semibold rounded-md transition-all duration-300' onClick={()=>{setFormVisible(!formVisible)}}>Add Transaction</button>
      </div>
      <form onSubmit={(e) => { submitHandler(e) }} className={`${(formVisible?'block':'hidden')} w-full px-3 py-5 bg-gray-900 rounded-lg`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 *:mb-5'>
          <input type="text" required placeholder='Title (eg:- Salary, Grocery, Shopping...' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.title} onChange={(e)=> setInput('title', e.target.value)} />
          <input type="text" required placeholder='Income / Expense' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.type} onChange={(e)=> setInput('type', e.target.value)} />
          <input type="number" required min={0} placeholder='Amount' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={isNaN(transaction.amount)? '': transaction.amount} onChange={(e)=> setInput('amount', Number(e.target.value) || NaN)} />
          <input type="text" required placeholder='Date (eg:- 16-01-2026  or  16/01/2026)' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.date} onChange={(e)=> setInput('date', e.target.value)} />
        </div>
        <div className='flex justify-end items-center gap-5 pr-3'>
          <button className='bg-green-400 px-6 py-1.5 rounded flex items-center active:scale-85 hover:bg-green-500 text-md font-semibol transition-all duration-200'>Add</button>
          <button className='bg-red-500 px-4 py-1.5 rounded flex items-center active:scale-85 hover:bg-red-600 text-md font-semibold transition-all duration-200' onClick={()=>{}}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm