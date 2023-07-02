import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import HomePage from  './Pages/HomePage';
import MenuPage from './Pages/MenuPage';
import PrivateRoute from './Components/PrivateAuth/PrivateRoute';
import AppProvider from './context/AppProvider';

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
