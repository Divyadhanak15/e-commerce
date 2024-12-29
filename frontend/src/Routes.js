import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import Product from './pages/Product';
import Orders from './pages/Orders';
import DisplayProducts from './pages/DisplayProducts';

const Routes = () => {
  return (
    <Switch>
    <Route path="/" element={<Home />} />
    
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/product" element={<Product />} />
    <Route path="/orders" component={Orders} />
    <Route path="/display-products" element={<DisplayProducts />} />

  </Switch>
  );
};

export default Routes;
