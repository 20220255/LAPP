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
import ProtectedRoute from './components/ProtectedRoute';
import Error from './pages/Error';
import FoldsList from './pages/FoldsList';
import ExpenseTransaction from './pages/ExpenseTransaction';
import ExpenseMaintenance from './pages/ExpenseMaintenance';
import ExpenseLists from './pages/ExpenseLists';
import BasicBars from './pages/chart';
import AddCashFund from './pages/AddCashFund';
import DeductCashFund from './pages/DeductCashFund';
import CashFundLists from './pages/CashFundLists';



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

            <Route path="/transaction" element={<ProtectedRoute />}>
              <Route path='/transaction' element={<Transaction />} />
            </Route>

            <Route path="/transaction-list" element={<ProtectedRoute />}>
              <Route path='/transaction-list' element={<TransactionLists />} />
            </Route>

            <Route path="/transaction-maintenance/:salesId" element={<ProtectedRoute />}>
              <Route path='/transaction-maintenance/:salesId' element={<TransactionMaintenance />} />
            </Route>

            <Route path="/expense" element={<ProtectedRoute />}>
              <Route path='/expense' element={<ExpenseTransaction />} />
            </Route>

            <Route path="/expense-maintenance/:expenseId" element={<ProtectedRoute />}>
              <Route path='/expense-maintenance/:expenseId' element={<ExpenseMaintenance />} />
            </Route>

            <Route path="/expense-list" element={<ProtectedRoute />}>
              <Route path='/expense-list' element={<ExpenseLists />} />
            </Route>

            <Route path="/cashfund-list" element={<ProtectedRoute />}>
              <Route path='/cashfund-list' element={<CashFundLists />} />
            </Route>

            <Route path="/folds-list" element={<ProtectedRoute />}>
              <Route path='/folds-list' element={<FoldsList />} />
            </Route>

            <Route path='/chart' element={<ProtectedRoute />} >
              <Route path='/chart' element={<BasicBars />} />
            </Route>

            <Route path='/deductCashFund' element={<ProtectedRoute />} >
              <Route path='/deductCashFund' element={<DeductCashFund />} />
            </Route>

            <Route path='/addCashFund' element={<ProtectedRoute />} >
              <Route path='/addCashFund' element={<AddCashFund />} />
            </Route>


            <Route
              path="*"
              element={
                <Error
                  errMsg={{ statusText: "Page not found", status: "404" }}
                />
              }
            />
          </Routes>
          <BottomNavigaton />
        </div>
      </Router>


    </>
  )
}

export default App;
