import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/Leitura.css';

const Leitura = ({idForm, setSecao}) => {
  const sucesso = () => toast.success("Formulário desativado!");
  const [id, setId] = useState('');
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/getForm/${id}`);
      
      if (response.data) {
        setForm(response.data);
        setError(null);
      } else {
        console.log(response.data);
        setError('Form não encontrada ou está desativada');
        setForm(null);
      }
    } catch (error) {
      setError('Form não encontrado');
      setForm(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/delForm/${id}`);
      setError(null);
      sucesso();
      setSecao('ler');
    } catch (error) {
      setError('Erro ao desativar Form');
    }
  };

  const confirmar = (e) => {
    e.preventDefault(); 
    const confirmacao = window.confirm("Quer realmente realizar essa ação?");
    if (confirmacao) {
      handleDelete(); 
    }
  };
  useEffect(() => {
    if (idForm) {  
      setId(idForm);  
      handleSearch(idForm);  
    }
  }, [idForm]); 

  return (
    
    <div className="leitura">
      <div className='voltar' onClick={() => setSecao('ler')}> <p>X</p></div>
      {error && <p className="error">{error}</p>}
      {form && (
        <div className="form">
          <div className='formBasic' key={form.id_form}>
          <p>Inspetor 1: {form.nomePe}</p>
          <p>Inspetor 2: {form.Inspetor2}</p>
          <p>Número da Estrutura: {form.numEstrutura}</p>
          <p>Data da Inspeção: {form.data}</p>
          <p>LT: {form.linhaTrans}</p>
          </div>
          <div className='estruturaInfo'>
          <h3>Tipo de Estrutura:</h3>
          Torre:<input type='checkbox' checked={(form.torre)} readOnly></input>
          <br />
          Concreto:<input type='checkbox' checked={(form.concreto)} readOnly></input>
          <br />
          Suspenção: <input type='checkbox' checked={(form.susp)} readOnly></input>
          <br />
          Ancoragem:<input type='checkbox' checked={(form.ancoragem)} readOnly></input>
          <br />
          Chave Secc:<input type='checkbox' checked={(form.secc)} readOnly></input>
          <br />
          Metalica:<input type='checkbox' checked={(form.metalica)} readOnly></input>
          <br />
          Dev. Concreto:<input type='checkbox' checked={(form.devConcreto)} readOnly></input>
          <br />
          Sky:<input type='checkbox' checked={(form.sky)} readOnly></input>
          </div>
          <div className='itensInfo'>
          <ul>
            <li>Faixa de servidão: {form.Faixa}</li>
            <li>Base Estrutura e Estai: {form.Base}</li>
            <li>Estrut. Metálicas e Concreto: {form.EstruMetalicas}</li>
            <li>Cadeia de Isol. e Acessórios: {form.CadeiadeIsol}</li>
            <li>Cabo Condutor e Emendas: {form.CaboCondutor}</li>
            <li>Chave Secc. de LT: {form.ChaveSecc}</li>
            <li>Para Raios (Cabos e Equipamentos): {form.ParaRaios}</li>
            <li>Sinaliz, Travessias e Cruzamentos: {form.Sinaliz}</li>
          </ul>
          </div>
          <p className='descricao'>{form.descricao}</p>
        <br />
          
        </div>
        
      )}
      <div className='desativar'><button  onClick={confirmar}>Desativar Form</button></div>
      
    </div>
    
  );
};

export default Leitura;