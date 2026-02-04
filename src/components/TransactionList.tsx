import TransactionListTable from "./TransactionListTable";

const TransactionList = () => {

  const transactions: [] = JSON.parse(localStorage.getItem('transactions') || '[]');
  

  return (
    <div className="w-full h-full px-5 sm:px-10 py-2">
      <div className="bg-gray-900 px-3 py-5 rounded-md">
        <h2 className="flex text-xl sm:text-2xl font-bold justify-center items-center mb-5">Your Transaction History</h2>
        {transactions.length==0? 

          <h3 className="flex justify-center text-lg font-semibold items-center">No History</h3> :

          <div>
            <div className="grid grid-cols-4 py-2 *:text-center *:font-bold">
              <div>Type</div>
              <div>Title</div>
              <div>Amount</div>
              <div>Date</div>
            </div>
            {transactions.map((transaction, idx)=>{
              return <div key={idx}>
                <TransactionListTable transaction={transaction} />
              </div>
            })}
          </div>
        }
      </div>
      
    </div>
  )
}

export default TransactionList