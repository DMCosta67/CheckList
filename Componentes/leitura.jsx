import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../CSS/Leitura.css';

const Leitura = ({idForm, setSecaoAtual}) => { // Prop para pegar o id clicado em ler.jsx
  const [id, setId] = useState('');
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/cadastrarForm/${id}`);
      
      if (response.data.length > 0) {
        const formDetails = response.data[0];
        setForm(formDetails);
        setError(null);
      } else {
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
      await axios.delete(`http://localhost:3000/cadastrarForm/${id}`);
      setError(null);
      alert('Form desativada com sucesso');
      window.location.reload();
    } catch (error) {
      setError('Erro ao desativar Form');
    }
  };

  const formatBoolean = (value) => {
    return value === 1 ? 'Sim' : 'Não';
  };
  useEffect(() => {
    if (idForm) {  // Verifica se o idForm foi passado corretamente
      // console.log(idForm); Pra ver qual Id tava passando
      setId(idForm);  // Define o ID
      // console.log(id); pra ver qual ID tava passando
      handleSearch(idForm);  // Busca o formulário com o ID correto
    }
  }, [idForm]); 

  return (
    
    <div className="container">
      <div className='voltar' onClick={() => setSecaoAtual('ler')}><p>X</p></div>
      {error && <p className="error">{error}</p>}
      {form && (
        <div className="form-details">
          <h2 key={form.id_form}>Dados do Formulário:</h2>
          <p>Inspetor 1: {form.Inspetor1}</p>
          <p>Inspetor 2: {form.Inspetor2}</p>
          <p>Número da Estrutura: {form.numEstrutura}</p>
          <p>Data da Inspeção: {form.data}</p>
          <p>LT: {form.linhaTrans}</p>
          <h3>Tipo de Estrutura:</h3>
          <p>Torre: {formatBoolean(form.torre)}</p>
          <p>Concreto: {formatBoolean(form.concreto)}</p>
          <p>Suspenção: {formatBoolean(form.susp)}</p>
          <p>Ancoragem: {formatBoolean(form.ancoragem)}</p>
          <p>Chave Secc: {formatBoolean(form.secc)}</p>
          <p>Metalica: {formatBoolean(form.metalica)}</p>
          <p>Dev. Concreto: {formatBoolean(form.devConcreto)}</p>
          <p>Sky: {formatBoolean(form.sky)}</p>
          
          <h3>Itens:</h3>
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
          <label className='desc'>descrição</label>
          <p className='descricao'>{form.descricao}</p>
        
      
          <button onClick={handleDelete}>Desativar Form</button>
        </div>
        
      )}
    </div>
  );
};

export default Leitura;