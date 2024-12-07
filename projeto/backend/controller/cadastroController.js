import { hashSenha, createCoor, createInsp, criarUsuario } from "../model/cadastro.js";

// Inserir em conta como Coordenador

export async function inserirC(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const senhaC = await hashSenha(senha);

        const response = await createCoor(nome, email, senhaC);
        if (response) {
            console.log(response.insertId);
            res.status(200).json(response);
        }
    } catch (error) {
        console.log('Erro ao inserir a conta do coordenador', error);
    }

}
// Inserir em conta como Inspetor
export async function inserirI(req, res) {
    const { nome, email, senha } = req.body;
    const newUser = {
        email: email,
        password: senha,
      };
      console.log(newUser);
      await criarUsuario(newUser);
    try {
        const senhaC = await hashSenha(senha);

        const response = await createInsp(nome, email, senhaC);
        if (response) {
            console.log(response.insertId);
            res.status(200).json(response);
        }
        
    } catch (error) {
        console.log('Erro ao inserir a conta do inspetor', error);
    }
} 
