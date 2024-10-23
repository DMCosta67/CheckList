import React, { useState } from "react";
import '../CSS/App.css';
import FormCadastro from "./formCadastro";
import Buscar from "./busca.jsx";
function Tela() {
    const [secaoAtual, setSecaoAtual] = useState('home');

    const cliqueSecao = (secao) => {
        setSecaoAtual(secao);
    }

    return (
        <div>
            <div className="secao">
                {secaoAtual === 'home' && (
                    <>
                    <header>
                    <img src="Logo.png" alt="logo" className="logo"/>
                    <nav>
                    <ul>
                    <button onClick={() => cliqueSecao('cadastrar')} className="botao_menu">Cadastrar inspeção</button>
                    <button onClick={() => cliqueSecao('buscar')} className="botao_menu">Consultar Formularios</button>
                    </ul>
                    </nav>
                    </header>                            
                    </>
                )}

                {secaoAtual === 'cadastrar' && <FormCadastro/>}
                {secaoAtual === 'buscar' && <Buscar/>}
            </div>
        </div>
    );
}

export default Tela;
