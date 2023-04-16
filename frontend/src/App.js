import React from 'react';
import { Router, Route,  Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ItemsPage from './components/ItemsPage';
import ItemDetailsPage from './components/ItemDetailsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const App = () => {
  return (
    <Router>
      <Header />
   <main>
  <Routes>
    <Route path="/" element={<HomePage />} index />
    <Route path="/items" element={<ItemsPage />} />
    <Route path="/items/:id" element={<ItemDetailsPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    {/* ... other routes */}
  </Routes>
</main>
    </Router>
  );
};

export default App;
