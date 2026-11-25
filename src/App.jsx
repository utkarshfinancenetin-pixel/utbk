import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ApplyLoan from './pages/ApplyLoan';
import LoanDetails from './pages/LoanDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container relative min-h-screen flex flex-col justify-between">
        <Navbar />
        
        <main className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/online-loan-apply" element={<ApplyLoan />} />
            <Route path="/:loanType" element={<LoanDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
