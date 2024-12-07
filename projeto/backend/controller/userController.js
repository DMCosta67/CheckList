import { pegarInfo, deletar, deleteUserByEmail } from "../model/user.js";
//Função para buscar as informações do usuário pelo email
export async function buscar(req, res) {
    const { email } = req.query;

    try {
        const usuario = await pegarInfo(email);
        if (!usuario) {
            console.log('email errado');
            return res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.json({ nome: usuario.nomePe, id: usuario.idConta });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
}
//função para deletar o usuário pelo ID 
export async function deletarU(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "O ID é obrigatório." });
        }

        // Deletar no Firebase Authentication
        await deleteUserByEmail(id);

        // Deletar no banco de dados
        await deletar(id);

        res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.message);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
}