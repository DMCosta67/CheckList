import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leitura from "./leitura";
import '../CSS/filtro.css';
import '../CSS/Ler.css';

const Ler = ({idForm, setSecaoAtual, setIdForm}) => {
    const [pre, setPre] = useState([]);
    const [cargar, setCargar] = useState(false);
    const [filtrar,setFiltrar] = useState({
            dataMin: '',
            dataMax: ''
    });
    const [visivel, setVisivel] = useState(false);

    const passa = (idForm) => {
        setIdForm(idForm);
        setSecaoAtual('leitura'); 
    };
    
    const ver = () => {
        setVisivel(!visivel);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltrar(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const puxarTd = async () => { //Puxa todos os dados
        try {
            const response = await axios.get(`http://localhost:3000/getAllForm`);
            setPre(response.data);
            console.log(response.data);
            setCargar(true);
        } catch (err) {
            console.error("Erro ao buscar", err);
        }
    };

    async function filtra(){
        const { dataMin, dataMax } = filtrar;

        if (!dataMin || !dataMax) {
            console.warn("Por favor, selecione as duas datas.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/formFilt`,{
                params: {dataMin, dataMax},
            });
            setPre(response.data);
            console.log("filtrado",response.data);
        } catch (err) {
            console.error("Erro ao buscar", err);
        }
    };

    useEffect(() => {
        if (!cargar) {
            puxarTd();
        }
    }, [cargar]);

    useEffect(() => { //pra rodar sozinho uma unica
        console.log(filtrar);
    }, [filtrar]);

    return (
        
           <div className='forms'>
                    <div className='filt'>
        <button className='filtB' onClick={() => ver()}>Filtros</button>
            {visivel && (
            <div className='filtInps'>
                    Selecione a data Inicial<input type="date" name="dataMin" id="dataMin" onChange={handleChange}/>
                    Selecione a data Final<input type="date" name="dataMax" id="dataMax" onChange={handleChange}/>
            <button className='filtrar' onClick={filtra}>Filtrar</button>
            </div>
            )}
            </div>
                <h1>Formulários encontrados</h1>
                {pre.length === 0 ? (
                    <p>Nenhum Formulário encontrado.</p>
                ) : (
                    
                    pre.map(form => (
                        <div className='card' key={form.id_form} onClick={() => passa(form.id_form)}>
                            <p>Inspetor 1: {form.Inspetor1}</p>
                            <p>Inspetor 2: {form.Inspetor2}</p>
                            <p>Número da Estrutura: {form.numEstrutura}</p>
                            <p>Data da Inspeção: {form.data}</p>
                            <p>LT: {form.linhaTrans}</p>
                        </div>
                    ))
                )}
            </div>
    );
};

export default function busca ({puxarTd}) {
    const [idForm, setIdForm] = useState('');
    const [secaoAtual, setSecaoAtual] = useState('ler');

    return (
      <div>
        {secaoAtual === 'ler' && <Ler idForm={idForm} setIdForm={setIdForm} setSecaoAtual={setSecaoAtual} />}
        {secaoAtual === 'leitura' && <Leitura idForm={idForm} setSecaoAtual={setSecaoAtual} />}
      </div>  
    );
}