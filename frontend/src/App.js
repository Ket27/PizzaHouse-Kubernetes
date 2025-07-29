import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import AuthPage from './pages/AuthPage.js';
import HomePage from  './pages/HomePage.js';
import MenuPage from './pages/MenuPage.js';
import PizzaPage from './pages/PizzaPage.js';
import PrivateRoute from './Components/PrivateAuth/PrivateRoute.js';
import AppProvider from './context/AppProvider.js';

function App() {
  return (
    <div className="App">    
      <Router>
        <AppProvider>
          <Routes>
            <Route path="/" element={<AuthPage />}/>
            <Route path = "/menu" element ={<PrivateRoute Component={MenuPage}/>}/>
            <Route path="/home" element={<PrivateRoute Component={HomePage}/>}/>
            <Route path="/menu/:pizzaId" element={<PrivateRoute Component={PizzaPage}/>}/>
          </Routes>
        </AppProvider>
      </Router>   
    </div>
  );
}

export default App;
