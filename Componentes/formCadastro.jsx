import React, { useState } from "react";
import '../CSS/Form.css';

function FormCadastro() {
  const [formValores, setFormValores] = useState({
    inspetor1: '',
    inspetor2: '',
    numEstrutura: '',
    linhaTrans: '',
    descricao: '',
    torre: 0,
    concreto: 0,
    susp: 0,
    ancoragem: 0,
    secc: 0,
    metalica: 0,
    devConcreto: 0,
    sky: 0,
    faixa: '',
    base: '',
    estrut: '',
    cadeia: '',
    cabo: '',
    chave: '',
    para: '',
    sinaliz: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue;

    if (type === 'checkbox') {
      newValue = checked ? 1 : 0;
    } else if (type === 'radio') {
      newValue = event.target.id;
    } else {
      newValue = value;
    }

    setFormValores({
      ...formValores,
      [name]: newValue
    });
  };

  const handleCSubmit = async (e) => {
    e.preventDefault();


    if (!formValores.faixa || !formValores.base || !formValores.estrut ||
      !formValores.cadeia || !formValores.cabo || !formValores.chave ||
      !formValores.para || !formValores.sinaliz) {
      
      alert('Selecione as opções C, NC ou NA para os campos obrigatórios.');
      return;
  }

    try {
      console.log("Dados a serem enviados: ", formValores);
      const response = await fetch('http://localhost:3000/cadastrarForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValores)
      });

      const json = await response.json();
      console.log(response);
      console.log(json);
      alert('Formulário cadastrado com sucesso');
      window.location.reload();
    } catch (err) {
      console.error("Erro ao enviar", err);
    }
  };

      return (
        <form onSubmit={handleCSubmit}>
          <div className='cima'>Formulário de Inspeção de Linha:</div>
          <div className='cadas'>
          Inspetor 1:
          <input type='text' name="inspetor1" value={formValores.inspetor1} onChange={handleChange} required/>
          <br />
          Inspetor 2:
          <input type='text' name="inspetor2" value={formValores.inspetor2} onChange={handleChange} required/>
          <br />
          Número da Estrutura:
          <input type='text' name="numEstrutura" value={formValores.numEstrutura} onChange={handleChange} required/>
          <br />
          LT:
          <input type='text' name="linhaTrans" value={formValores.linhaTrans} onChange={handleChange} required/>
          <br />
          <div>
          Selecione os tipos de estrutura: <br/> <br/>

          Torre:
          <input type='checkbox' name="torre" value={formValores.torre} onChange={handleChange} />
          <br />
          Concreto:
          <input type='checkbox' name="concreto" value={formValores.concreto} onChange={handleChange} />
          <br />
          Suspensão:
          <input type='checkbox' name="susp" value={formValores.susp} onChange={handleChange} />
          <br />
          Ancoragem:
          <input type='checkbox' name="ancoragem" value={formValores.ancoragem} onChange={handleChange} />
          <br />
          Chave Secc:
          <input type='checkbox' name="secc" value={formValores.secc} onChange={handleChange} />
          <br />
          Metalica:
          <input type='checkbox' name="metalica" value={formValores.metalica} onChange={handleChange} />
          <br />
          Derivado Concreto:
          <input type='checkbox' name="devConcreto" value={formValores.devConcreto} onChange={handleChange} />
          <br />
          Sky:
          <input type='checkbox' name="sky" value={formValores.sky} onChange={handleChange} />
          <br /> <br/>
          </div>
          Selecione as conformidades: <br/><br/>
          <div className="item">
          Faixa de Servidão: <br />
          C <input type="radio" name="faixa" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="faixa" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="faixa" id="NA" onChange={handleChange}/> 
          <br />
          
          Base Estrutura e Estai: <br />
          C <input type="radio" name="base" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="base" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="base" id="NA" onChange={handleChange}/> 
          <br />

          Estrut. Metálicas e Concreto: <br />
          C <input type="radio" name="estrut" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="estrut" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="estrut" id="NA" onChange={handleChange}/> 
          <br />

          Cadeia de Isol. e Acessórios: <br />
          C <input type="radio" name="cadeia" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="cadeia" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="cadeia" id="NA" onChange={handleChange}/> 
          <br />

          Cabo Condutor e Emendas: <br />
          C <input type="radio" name="cabo" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="cabo" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="cabo" id="NA" onChange={handleChange}/> 
          <br />

          Chave Secc. de LT: <br />
          C <input type="radio" name="chave" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="chave" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="chave" id="NA" onChange={handleChange}/> 
          <br />

          Para Raios (Cabos e Equipamentos): <br />
          C <input type="radio" name="para" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="para" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="para" id="NA" onChange={handleChange}/> 
          <br />

          Sinaliz, Travessias e Cruzamentos: <br />
          C <input type="radio" name="sinaliz" id="C" onChange={handleChange} /> 
          NC <input type="radio" name="sinaliz" id="NC" onChange={handleChange}/> 
          NA <input type="radio" name="sinaliz" id="NA" onChange={handleChange}/> 
          <br />
          </div>
          <label className="desc">Descrição</label>
          <textarea name="descricao" id="descricao" cols="30" rows="10" value={formValores.descricao} onChange={handleChange}></textarea>

          <button type="submit">Enviar</button>
          
          </div>
        </form>
      );
    }
export default FormCadastro;