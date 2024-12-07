import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import '../CSS/filtro.css';
import '../CSS/busca.css';
import '../CSS/delete.css'

const DeleteUser = ({ setCas }) => {
    const aviso = (mensagem) => toast.error(mensagem);
    const sucesso = (mensagem) => toast.success(mensagem);

    const [email, setEmail] = useState('');
    const [info, setInfo] = useState({
        nome: '',
        id: ''
    });

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const buscarUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pegarInfo`, {
                params: { email }
            });
            if (response.data && response.data.id) {
                setInfo(response.data);
                sucesso("Usuário encontrado!");
            } else {
                setInfo({ nome: '', id: '' });
                aviso("Usuário não encontrado!");
            }
        } catch (err) {
            console.error("Erro ao buscar", err);
            aviso("Erro ao buscar usuário.");
        }
    };

    const deletarUser = async () => {
        try {
            await axios.delete(`http://localhost:3000/deletarUser/${info.id}`);
            sucesso("Usuário deletado com sucesso!");
            setInfo({ nome: '', id: '' });
            setEmail('');
        } catch (err) {
            console.error("Erro ao deletar", err);
            aviso("Erro ao deletar usuário.");
        }
    };

    return (
        <>
            <div className='ini' onClick={() => setCas('menu')}> <p> &lt;-- Voltar à tela anterior</p></div>
            <div className='buscar'>
                <ToastContainer />
                <h1 className='titu'>Buscar usuário</h1>
                
                <div className='nd'>
                    <div className='busc'>
                            Email
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                value={email}
                                placeholder="Coloque o email do usuário"
                            />
                        <button onClick={buscarUser}>Buscar</button>
                      
                        {info.nome && (
                            <>
                                <p> Nome do usuário: {info.nome}</p>
                                <button onClick={deletarUser}>Deletar Usuário</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteUser;
