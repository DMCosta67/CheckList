import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leitura from "./leitura";
import '../CSS/Ler.css';

const Ler = () => {
    const [pre, setPre] = useState([]);
    const [idForm, setIdForm] = useState('');
    const [visivel, setVisivel] = useState(true);
    const [secaoAtual, setSecaoAtual] = useState('home');

    const passa = (idForm) => {
        setIdForm(idForm);
        setSecaoAtual('leitura'); 
        setVisivel(!visivel);
    }

    const puxarTd = async () => { //Puxa todos os dados
        try {
            const response = await axios.get(`http://localhost:3000/cadastrarForm`);
            setPre(response.data);
            console.log(response.data);
        } catch (err) {
            console.error("Erro ao buscar", err);
        }
    };

    useEffect(() => { //pra rodar sozinho
        puxarTd();
    }, []);

    return (
        <>
            {visivel && (<div className='forms'>
                <h1>Formulários encontrados</h1>
                {pre.length === 0 ? (
                    <p>Nenhum Formulário encontrado.</p>
                ) : (
                    pre.map(form => ( // pre.map pra passar todos os vetores e form pra receber cada dado
                        <div className='card' key={form.id_form} onClick={() => passa(form.id_form)}>
                            <p>Inspetor 1: {form.Inspetor1}</p>
                            <p>Inspetor 2: {form.Inspetor2}</p>
                            <p>Número da Estrutura: {form.numEstrutura}</p>
                            <p>Data da Inspeção: {form.dataInsp}</p>
                            <p>LT: {form.linhaTrans}</p>
                        </div>
                    ))
                )}
            </div>)}
            <div className='formulario'>
                {secaoAtual === 'leitura' && <Leitura idForm={idForm} />}
            </div>
        </>
    );
};

export default Ler;
