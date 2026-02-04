import Summary from '../components/Summary'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

const HomePage = () => {
  return (
    <div>
        <TransactionForm />
        <Summary />
        <TransactionList />
    </div>
  )
}

export default HomePage