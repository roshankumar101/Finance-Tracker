import { useState } from 'react'
import type { Refresh, Transaction } from '../types/transaction';
import { addTransaction,  generateId } from '../types/transaction'



const TransactionForm = ({ refresh, setRefresh }: Refresh) => {

  const [formVisible, setFormVisible] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>({id: '',title: '', type: '', amount: NaN, date: ''})



  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(isNaN(transaction.amount) || transaction.amount < 0){
      alert("Amount should be greater than 0")
      return;
    }

    // setting generated id in the transaction
    const withUniqueId = {...transaction, id: generateId()};
    setTransaction(withUniqueId);
    addTransaction(withUniqueId);

    setRefresh(!refresh)

    setTransaction({id: '', title: '', type: '', amount: NaN, date:  ''})
    setFormVisible(false)
  }
  
  
  
  const setInput = <T extends keyof Transaction>(field: T, value: Transaction[T]): void => {
    setTransaction(prev => ({ ...prev, [field]: value }));
  };


  const clearForm = () => {
    setTransaction({id: '', title: '', type: '', amount: NaN, date:  ''})
  }
  

  
  return (
    <div className='w-full h-full px-5 sm:px-10 py-4'>
      <div className='flex justify-between items-center py-1 mb-5 sm:mb-8'>
        <h2 className='text-nowrap text-sm sm:text-xl font-bold'>Add New Transaction</h2>
        <button className='text-nowrap bg-amber-500 active:scale-95 px-3 sm:px-4 py-1 text-sm sm:text-lg font-semibold rounded-md transition-all duration-300' onClick={()=>{setFormVisible(!formVisible)}}>Add Transaction</button>
      </div>
      <form onSubmit={(e) => { submitHandler(e) }} className={`${(formVisible?'block':'hidden')} w-full px-3 py-5 bg-gray-900 rounded-lg`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 *:mb-5'>
          <div>
            <label className='text-lg font-medium'>Title</label>
            <input type="text" required placeholder='Salary, Grocery, Shopping...' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.title} onChange={(e)=> setInput('title', e.target.value)} />
          </div>
          <div>
            <label className='text-lg font-medium'>Type</label>
            <div className='flex gap-3 items-center pt-1'>
              <button type='button' className='px-3 py-1 font-medium text-md bg-green-500 rounded-lg focus:scale-90 transition-all duration-300' onClick={()=> setInput('type', 'Income')}>Income</button>
              <button type='button' className='px-3 py-1 font-medium text-md bg-red-500 rounded-lg focus:scale-90 transition-all duration-300' onClick={()=> setInput('type', 'Expense')}>Expense</button>
            </div>
          </div>
          <div>
            <label className='text-lg font-medium'>Amount (&#8377;)</label>
            <input type="number" required min={0} placeholder='Amount' className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={isNaN(transaction.amount)? '': transaction.amount} onChange={(e)=> setInput('amount', Number(e.target.value) || NaN)} />
          </div>
          <div>
            <label className='text-lg font-medium'>Date</label>
            <input type="date" required className='outline-none px-4 py-2 border border-gray-500 rounded-md w-full' value={transaction.date} onChange={(e)=> setInput('date', e.target.value)} />
          </div>

        </div>
        <div className='flex justify-end items-center gap-5 pr-3'>
          <button type='submit' className='bg-green-400 px-6 py-1.5 rounded flex items-center active:scale-85 hover:bg-green-500 text-md font-semibol transition-all duration-200'>Add</button>
          <button type='button' className='bg-red-500 px-4 py-1.5 rounded flex items-center active:scale-85 hover:bg-red-600 text-md font-semibold transition-all duration-200' onClick={()=>{clearForm()}}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm