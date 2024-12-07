import React, { useState,useEffect } from "react";
import '../CSS/secao.css';
import Buscar from "./busca.jsx";
import Login from "./login.jsx";
import CadastrarUser from "./cadastrarUser.jsx";
import Logout from "./logout.jsx";

function Secao({setLogado}) {
    const [secaoAtual, setSecaoAtual] = useState('home');
    const cliqueSecao = (secao) => {
        setSecaoAtual(secao);
    }
    return(
        <>
             {secaoAtual === 'home' && (
                <div className="secao">
                    <header>
                    <img src="LogoSN.png" alt="logo" className="logoTP"/>
                    <button onClick={() => cliqueSecao('cadastrarUser')} className="botao_menu">Gerenciar usuários</button>
                    <button onClick={() => cliqueSecao('buscar')} className="botao_menu">Consultar Formulários</button>
                    <Logout setLogado={setLogado}  />
                    </header>
                    </div>            
                )}
                
                {secaoAtual === 'buscar' && <Buscar setSecaoAtual={setSecaoAtual}/>}
                {secaoAtual === 'cadastrarUser' && <CadastrarUser setSecaoAtual={setSecaoAtual}/>}
        </>  
    );
}

function Tela() {
    const [logado, setLogado] = useState(() => JSON.parse(localStorage.getItem('logado')) || false);
    const [email, setEmail] = useState(() => localStorage.getItem('email') || '');


    // Atualiza o localStorage quando logado ou nome mudarem
    useEffect(() => {
        localStorage.setItem('logado', JSON.stringify(logado));
        localStorage.setItem('email',email);


    }, [logado, email]);
    return (
        <>
        {logado ? <Secao email={email} setLogado={setLogado}  /> 
        :
        <Login setLogado={setLogado} setNome={setNome} setEmail={setEmail}/> }
        </>
    );
}

export default Tela;
