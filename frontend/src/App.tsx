import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import BottomNavigaton from './components/BottomNavigaton';
import Transaction from './pages/Transaction';
import TransactionLists from './pages/TransactionLists';
import TransactionMaintenance from './pages/TransactionMaintenance';



const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/transaction-list' element={<TransactionLists />} />
            <Route path='/transaction-maintenance/:salesId' element={<TransactionMaintenance />} />
          </Routes>

          <BottomNavigaton />

        </div>
      </Router>


    </>
  )
}

export default App;
