import React from 'react';

const Header = () => {
    return React.createElement(
        'header',
        { style: { textAlign: 'center', marginBottom: '20px' } }, 
        React.createElement('h1', { style: { color: 'red', fontSize: '48px', margin: '0' } }, 'TaskManager'),
    );
};

export default Header;

