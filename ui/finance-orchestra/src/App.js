import logo from './logo.svg';
import './App.css';
import {Home} from './Home.js';
import {Transactions} from './Transactions.js';
import {Transfers} from './Transfers.js';
import {Users} from './Users.js';

import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h1 className="d-flex justify-content-center m-3">
        Finance Orchestra
      </h1>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1 ">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/users">
              Users
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/transactions">
              Transactions
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/transfers">
              Transfers
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/transfers' element={<Transfers/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
