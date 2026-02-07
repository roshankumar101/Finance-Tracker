import { useState } from 'react'
import Summary from '../components/Summary'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

const HomePage = () => {

  const [refresh, setRefresh] = useState<boolean>(true)

  return (
    <div className='bg-gray-950 pb-10'>
        <TransactionForm refresh={refresh} setRefresh={setRefresh}/>
        <Summary refresh={refresh}/>
        <TransactionList refresh={refresh} setRefresh={setRefresh}/>
    </div>
  )
}

export default HomePage