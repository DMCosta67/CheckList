import React, {useState} from "react";
import "../CSS/suporte.css"

function Suporte({setSec}) {
  const [suppForm, setSuppForm] = useState({
    nome: '',
    cargo: '',
    email: '',
    problema: '',
    contato: '',

  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSuppForm({
      ...suppForm,
      [name]: value
    });
  };

  const handleCSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Dados a serem enviados: ", suppForm);
      const response = await fetch('http://localhost:3000/suporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(suppForm)
      });

      const json = await response.json();
      console.log(response);
      console.log(json);
    } catch (err) {
      console.error("Erro ao enviar", err);
    }
  };

      return (
        <form className="sup" onSubmit={handleCSubmit}>
            <div className='back' onClick={() => setSec('principal')}> <p> &lt;-- Voltar a tela de inicio</p></div>
          <div className='supTitulo'>Formulário de suporte:</div>
          <div className='supInps'>
          Nome:
          <input type='text' name="nome" value={suppForm.nome} onChange={handleChange} required/>
          <br />
          Cargo:
          <input type='text' name="cargo" value={suppForm.cargo} onChange={handleChange} required/>
          <br />
          Email:
          <input type='email' name="email" value={suppForm.email} onChange={handleChange} required/>
          <br />
          Problema:
          <input type='text' name="problema" value={suppForm.problema} onChange={handleChange} required/>
          Contato:
          <input type='text' name="contato" value={suppForm.contato} onChange={handleChange} required/>
          <br />
          <div>


          <button type="submit">Enviar</button>
          </div>
          </div>
        </form>
      );
    }
export default Suporte;