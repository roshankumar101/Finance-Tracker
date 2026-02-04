

const TransactionListTable = ({ transaction }) => {
  return (
    <div className={`${(transaction.type==='Income'? 'bg-green-500':'bg-red-400')} grid grid-cols-4 *:text-center py-2 my-2 rounded`}>
        <div>{transaction.type}</div>
        <div>{transaction.title}</div>
        <div>{transaction.amount}</div>
        <div>{transaction.date}</div>
    </div>
  )
}

export default TransactionListTable