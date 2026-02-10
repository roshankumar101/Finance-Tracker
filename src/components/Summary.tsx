import { MoveUp, MoveDown } from 'lucide-react'
import { getBalance, type Balance } from '../types/transaction'
import { useEffect, useState } from 'react'


const Summary = ({ refresh }: { refresh: boolean} ) => {

  const [balance, setBalance] = useState<Balance>(getBalance())


  useEffect(function(){
    setBalance(getBalance())
  }, [refresh])

  return (
    <div className="w-full h-full px-5 sm:px-10 py-2">
      <div className="bg-gray-900 px-3 py-5 rounded-md">
        <h2 className="flex justify-center mb-5 text-xl font-bold">Summary</h2>
        <div className="grid grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-nowrap flex items-center justify-center gap-1">Income <MoveUp size={16} color='#00E100'/></h3>
            <p className='text-lg font-semibold text-nowrap text-center text-green-500'>&#8377; {balance.income}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-nowrap flex items-center justify-center gap-1">Expenses <MoveDown size={16} color='red'/></h3>
            <p className='text-lg font-semibold text-nowrap text-center text-red-500'>&#8377; {balance.expense}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-nowrap flex items-center justify-center gap-2">Balance</h3>
            <p className={`${(balance.income - balance.expense)>0 ? 'text-yellow-500':'text-red-500'} text-lg font-semibold text-nowrap text-center`}>&#8377; {balance.income - balance.expense}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary