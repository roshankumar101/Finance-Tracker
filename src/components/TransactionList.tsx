import { useEffect } from "react";
import TransactionListTable from "./TransactionListTable";
import { getTransactions, type Transaction } from "../types/transaction";

const TransactionList = ({ refresh,setRefresh }) => {


  let transactions: Transaction[] = getTransactions();
  const getData = () => {
    transactions = getTransactions();
  }
  
  useEffect(function(){
    getData();
  }, [refresh])


  return (
    <div className="w-full h-full px-5 sm:px-10 py-2">
      <div className="bg-gray-900 px-3 py-5 rounded-md">
        <h2 className="flex text-xl sm:text-2xl font-bold justify-center items-center mb-5">Your Transaction History</h2>
        {transactions.length==0? 

          <h3 className="flex justify-center text-lg font-semibold items-center">No History</h3> :

          <div>
            <div className="grid grid-cols-9 *:text-center *:font-bold">
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Title</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-3">Date</div>
            </div>
            {transactions.map((transaction, idx)=>{
              return <div key={idx}>
                <TransactionListTable transaction={transaction} refresh={refresh} setRefresh={setRefresh} />
              </div>
            })}
          </div>
        }
      </div>
      
    </div>
  )
}

export default TransactionList