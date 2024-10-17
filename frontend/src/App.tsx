import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Home, Login, Register, ExpenseTransaction, ExpenseMaintenance, ExpenseLists, CashFundLists, BasicBars, DeductCashFund, AddCashFund, SupplyDetergent, SupplyFabcon, FoldsList, Error, Transaction, TransactionLists, TransactionMaintenance } from './pages/'
import { BottomNavigaton, Header, ProtectedRoute } from './components/'


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

            <Route path='/supplies-detergent' element={<ProtectedRoute />} >
              <Route path='/supplies-detergent' element={<SupplyDetergent />} />
            </Route>

            <Route path='/supplies-fabcon' element={<ProtectedRoute />} >
              <Route path='/supplies-fabcon' element={<SupplyFabcon />} />
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
