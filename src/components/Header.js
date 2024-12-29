import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component for routing

const Header = () => {
    return (
        <header style={{ backgroundColor: '#282c34', color: 'white', padding: '1rem', textAlign: 'center' }}>
            <h1>Financial Dashboard</h1>
            <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>  {/* Link to Dashboard */}
                <Link to="/transactions" style={{ marginRight: '1rem' }}>Transactions</Link>  {/* Link to Transactions */}
                <Link to="/settings" style={{ marginRight: '1rem' }}>Settings</Link>  {/* Link to Settings */}
            </nav>
        </header>
    );
};

export default Header;

