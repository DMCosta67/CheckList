import React from 'react';
import '../CSS/secao.css';
const Logout = ({ setLogado }) => {
    const handleLogout = () => {
        localStorage.removeItem('logado');
        localStorage.removeItem('nome');

        setLogado(false);
    };

    return (
        <button onClick={handleLogout} className="botao_menu">
            Logout
        </button>
    );
};

export default Logout;
