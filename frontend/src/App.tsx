import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button'
import BottomNavigaton from './components/BottomNavigaton';
import Transaction from './pages/Transaction';


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
            <Route path='transaction' element={<Transaction />} />
          </Routes>

          <BottomNavigaton />

        </div>
      </Router>


    </>
  )
}

export default App;
