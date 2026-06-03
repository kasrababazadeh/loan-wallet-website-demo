import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Nav from './components/Nav';
import Home from './components/Home';
import Shops from './components/Shops';
import ShopDetail from './components/ShopDetails'; // Fixed the import
import StoreCategories from './components/StoreCategories';
import BuyGuide from './components/BuyGuide';
import WalletGuide from './components/WalletGuide';
import Stores from './components/Stores';
import Organizations from './components/Organizations';
import Clients from './components/Clients';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { AuthProvider, AuthContext } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Nav />
        <div className="flex flex-col dark:bg-gray-900 min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/shops" element={<StoreCategories />} />
              <Route path="/shop" element={<Shops />} />
              <Route path="/shop-detail" element={<ShopDetail />} />
              <Route path="/BuyGuide" element={<BuyGuide />} />
              <Route path="/WalletGuide" element={<WalletGuide />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="*" element={<Navigate to="/clients" />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
