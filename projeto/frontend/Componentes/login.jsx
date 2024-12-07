import React, {useState} from "react";
import '../CSS/login.css';
const Login = ({setLogado, setNome, setEmail}) => {

    const [usuario, setUsuario] = useState({
        email:'',
        senha:''
    });
    const [error, setError] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            if(!usuario.email || !usuario.senha){
                setError('Alguns campos ficaram vazios');
                return;
            }else{
            setError(null);
            console.log('Os dados que serão:', usuario.email,usuario.senha);
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
              });
              if(response.ok){
                setLogado(true);
                const data = await response.json();
                console.log(':)', data);
                setNome(data.nome);
                setEmail(usuario.email);
                setError(null);
              }else{
                console.log(':(');
                setError('Email ou senha incorretos');
                console.log('Usuário não encontrado');
              }
            }
        }catch(error){
            console.log(error);
        }
    }

return(
    <div className="login">
        <img className="mini" src="LogoSN.png" alt="Logo" />
        <form className="loginF" onSubmit={handleLogin}>
        <p>Email</p>
        <input type="email" name="email" id="email"
        placeholder="Digite o seu email"
        value={usuario.email}
        onChange={handleChange}
        />
        <p>Senha</p>
        <input type="password" name="senha" id="senha"
        placeholder="Digite a sua senha"
        value={usuario.senha}
        onChange={handleChange}
        />
      {error && <p className="error">{error}</p>}
        <button className="logar" type="submit">Login</button>
        </form>
    </div>
)


}
export default Login;