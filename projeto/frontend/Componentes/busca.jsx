import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leitura from "./leitura";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/filtro.css';
import '../CSS/busca.css';

const Ler = ({ setSecao, setIdForm }) => {
    const aviso = () => toast.error("Por favor selecione os campos corretamente");
    const [pre, setPre] = useState([]);
    const [cargar, setCargar] = useState(false);
    const [filtrar, setFiltrar] = useState({
        dataMin: '',
        dataMax: ''
    });
    const [visivel, setVisivel] = useState(false);

    const passa = (idForm) => {
        setIdForm(idForm);
        setSecao('leitura');
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


    async function filtra() { //Filtro
        let { dataMin, dataMax } = filtrar;

        if (!dataMin || !dataMax) {
            aviso();
            return;
        }
        if (new Date(dataMin) > new Date(dataMax)) {
            [dataMin, dataMax] = [dataMax, dataMin]; // Inverte as datas
        }
        try {
            const response = await axios.get(`http://localhost:3000/formFilt`, {
                params: { dataMin, dataMax },
            });
            setPre(response.data);
            console.log("filtrado", response.data);
            setFiltrar({dataMin:'', dataMax:''});
        } catch (err) {
            console.error("Erro ao buscar", err);
            setFiltrar({dataMin:'', dataMax:''});
        }
    };

    useEffect(() => {
        if (!cargar) {
            puxarTd();
        }
    }, [cargar]);

    useEffect(() => { //pra rodar sozinho uma unica vez
        console.log(filtrar);
    }, [filtrar]);

    return (

        <div className='busca'>
            <ToastContainer />
            <div className='filt'>
                <button className='filtB' onClick={() => ver()}>Filtros</button>
                {visivel && (
                    <div className='filtInps'>
                        Selecione a data Inicial<input type="date" name="dataMin" id="dataMin" onChange={handleChange} />
                        Selecione a data Final<input type="date" name="dataMax" id="dataMax" onChange={handleChange} />
                        <button className='filtrar'
                            onClick={() => {
                                filtra(); ver();
                            }}>Filtrar</button>
                    </div>
                )}
                <h1 className='titu'>Formulários encontrados</h1>
            </div>

            <div className='forms'>
                {pre.length === 0 ? (
                    <p>Nenhum Formulário encontrado.</p>
                ) : (

                    pre.map(form => (
                        <div className='card' key={form.id_form} onClick={() => passa(form.id_form)}>
                            <p>Inspetor 1: {form.nomePe}</p>
                            <p>Inspetor 2: {form.Inspetor2}</p>
                            <p>Número da Estrutura: {form.numEstrutura}</p>
                            <p>Data da Inspeção: {form.data}</p>
                            <p>Linha de Transmissão: {form.linhaTrans}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default function busca({ setSecaoAtual }) {
    const [idForm, setIdForm] = useState('');
    const [secao, setSecao] = useState('ler');

    return (
        <>
            <div className='ini' onClick={() => setSecaoAtual('home')}> <p> &lt;-- Voltar a tela de inicio</p></div>
            {secao === 'ler' && <Ler idForm={idForm} setIdForm={setIdForm} setSecao={setSecao} />}
            {secao === 'leitura' && <Leitura idForm={idForm} setSecao={setSecao} />}
        </>
    );
}