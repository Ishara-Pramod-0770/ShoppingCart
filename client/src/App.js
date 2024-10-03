import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import './App.css';
import ShoppingCart from './ShoppingCart';
import Test from './Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingCart/>} />
        <Route path="/t" element={<Test/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
