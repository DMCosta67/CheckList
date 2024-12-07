import React, { useState } from "react";
import 'react-toastify/ReactToastify.css';
import '../CSS/secao.css';
import CadastrarCoor from "./cadasCoor.jsx";
import CadastrarInsp from "./cadasIns.jsx";
import DeleteUser from "./DeleteUser.jsx";

const CadastrarUser = ({ setSecaoAtual }) => {
    const [cas, setCas] = useState('menu');
    const escolherCas = (sec) => {
        setCas(sec);
    }
    return (
        <>
            {cas === 'menu' && (
                <>
                <div className='ini' onClick={() => setSecaoAtual('home')}> <p> &lt;-- Voltar a tela de inicio</p></div>
                <div className="secao">
                    <header>
                        <img src="LogoSN.png" alt="logo" className="logoTP" />
                        <button onClick={() => escolherCas('inspetor')} className="botao_menu">Cadastrar Inspetor</button>
                        <button onClick={() => escolherCas('coordenador')} className="botao_menu">Cadastrar Coordenador</button>
                        <button onClick={() => escolherCas('delete')} className="botao_menu">Deletar usuário</button>
                    </header>
                </div>
                </>
            )}

            {cas === 'inspetor' && <CadastrarInsp setCas={setCas} />}
            {cas === 'coordenador' && <CadastrarCoor setCas={setCas} />}
            {cas === 'delete' && <DeleteUser setCas={setCas} />}
            
        </>
    );
}
export default CadastrarUser;