import { Trash2 } from 'lucide-react';
import { deleteTransaction, type Refresh, type Transaction } from '../types/transaction';


const TransactionListTable = ({ transaction, refresh, setRefresh }: {transaction: Transaction, refresh: Refresh['refresh'], setRefresh: Refresh['setRefresh']}) => {
  return (
    <div className={`${(transaction.type==='Income'? 'text-green-500':'text-red-400')} bg-gray-700 grid grid-cols-9 *:text-center py-2 my-2 rounded relative pr-5 sm:pr-0`}>
        <div className="col-span-2 capitalize">{transaction.type}</div>
        <div className="col-span-2 capitalize">{transaction.title}</div>
        <div className="col-span-2 capitalize">&#8377; {transaction.amount}</div>
        <div className="col-span-3 capitalize">{transaction.date}</div>
        <div className='absolute right-0 sm:right-[1%] top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 hover:bg-red-400 p-1 rounded-full' onClick={() => {deleteTransaction(transaction.id); setRefresh(!refresh)}}><Trash2/></div>
    </div>
  )
}

export default TransactionListTable