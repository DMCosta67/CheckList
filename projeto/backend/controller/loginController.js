import { Verificacao,comparador } from "../model/login.js";
//Autenticar o usuário
export async function Autenticar(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await Verificacao(email);
        if (!usuario) {
            console.log('email errado');
            return res.status(404).json({ error: 'Usuário não encontrado' });
        } else {

            const senhaBuscada = usuario.senha;

            const comparar = await comparador(senha, senhaBuscada);

            if (comparar) {
                console.log("senha Correta");
                res.json({ nome: usuario.nomePe, acesso: usuario.nivel });

            } else {
                console.log('senha errada');
                res.status(401).json({ error: 'Senha incorreta' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
}