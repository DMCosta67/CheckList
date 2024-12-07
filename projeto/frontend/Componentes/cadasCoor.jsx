import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/login.css";

const CadastrarCoor = ({setCas}) => {
  const sucessoCoor = () => toast.success("Coordenador cadastrado com sucesso!");
  const falha = () => toast.error("A ação não foi realizada!");

  const [cadastrarCoor, setCadastrarCoor] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");

  const validarSenha = (senha) => {
    const lengthRegex = /.{8,}/;
    const maxLengthRegex = /^.{0,16}$/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!lengthRegex.test(senha)) {
      return "A senha deve ter pelo menos 8 caracteres.";
    }
    if (!maxLengthRegex.test(senha)) {
        return "A senha não pode ter mais de 16 caracteres.";
    }
    if (!numberRegex.test(senha)) {
      return "A senha deve conter pelo menos um número.";
    }
    if (!specialCharRegex.test(senha)) {
      return "A senha deve conter pelo menos um caractere especial.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadastrarCoor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePass = (e) => {
    const { value } = e.target;
    setCadastrarCoor((prevState) => ({
      ...prevState,
      senha: value,
    }));

    const validacao = validarSenha(value);
    setError(validacao);
  };

  const handleCadastroC = async (e) => {
    e.preventDefault();
    if (error) {
      falha();
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/cadastrarUserC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastrarCoor),
      });
      if (response.ok) {
        sucessoCoor();
        setCas('menu');
        setCadastrarCoor({ nome: "", email: "", senha: "" });
        setError("");
      } else {
        falha();
      }
    } catch (error) {
      falha();
    }
  };
  const confirmar = (e) => {
    e.preventDefault(); 
    const confirmacao = window.confirm("Quer realmente realizar essa ação?");
    if (confirmacao) {
      handleCadastroC(e); 
    }
  };

  return (
    <>
    <div className='ini' onClick={() => setCas('menu')}> <p> &lt;-- Voltar a tela anterior</p></div>
    <div className="login">
      <ToastContainer />
      <img className="mini" src="LogoSN.png" alt="Logo" />
      <form className="loginF" onSubmit={confirmar}>
        <p>Nome</p>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite o Nome do Coordenador"
          value={cadastrarCoor.nome}
          onChange={handleChange}
          required
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite o Email do Coordenador"
          value={cadastrarCoor.email}
          onChange={handleChange}
          required
        />
        <p>Senha</p>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite a senha do Coordenador"
          value={cadastrarCoor.senha}
          onChange={handlePass}
          required
          maxLength={16}
        />
        {error && <p className="error">{error}</p>}
        <button className="logar" type="submit" disabled={!!error}>
          Cadastrar
        </button>
      </form>
    </div>
    </>
  );
};

export default CadastrarCoor;
