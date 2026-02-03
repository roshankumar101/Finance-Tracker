import React, { useState } from 'react'

const TransactionForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [transaction, setTransaction] = useState({title: '', type: '', amount: '', date:  ''})


  const submitHandler = (e) => {
    e.preventDefault();

    // const dateInput = {...transaction, date: transaction.date || new Date().toLocaleDateString}

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push({ ...transaction });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    setTransaction({title: '', type: '', amount: '', date:  ''})
  }
  

  const getInput = (field, value) => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className='w-full h-full px-5 sm:px-10 py-4'>
      <div className='flex justify-between items-center py-1 mb-5 sm:mb-8'>
        <h2 className='text-nowrap text-sm sm:text-xl font-bold'>Add Your Transaction</h2>
        <button className='text-nowrap bg-amber-500 active:scale-95 px-3 sm:px-4 py-1 text-sm sm:text-lg font-semibold rounded-md transition-all duration-300' onClick={()=>{setFormVisible(!formVisible)}}>Add Transaction</button>
      </div>
      <form onSubmit={(e) => { submitHandler(e) }} className={`${(formVisible?'':'hidden')} w-full px-3 py-5 bg-gray-900 rounded-lg`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 *:mb-5'>
          <input type="text" required placeholder='Title (eg:- Salary, Grocery, Shopping...' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.title} onChange={(e)=> getInput('title', e.target.value)} />
          <input type="text" required placeholder='Income / Expense' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.type} onChange={(e)=> getInput('type', e.target.value)} />
          <input type="number" required placeholder='Amount' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.amount} onChange={(e)=> getInput('amount', e.target.value)} />
          <input type="text" placeholder='Date (eg:- 16-01-2026) or select from calendar' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.date} onChange={(e)=> getInput('date', e.target.value)} />
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