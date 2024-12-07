import express, { json } from "express";
import cors from "cors";
import { lerTudo, lerUm, filtroPorData, deleteForm } from '../controller/formController.js';
import { Autenticar } from '../controller/loginController.js';
import { inserirC, inserirI } from "../controller/cadastroController.js";
import { buscar, deletarU } from "../controller/userController.js";

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para RUD de form
app.get('/getAllForm', lerTudo);
app.get('/getForm/:id', lerUm);
app.get('/formFilt', filtroPorData); 
app.delete('/delForm/:id', deleteForm); 

// Rota do login
app.post('/login',Autenticar); 

// Rota do Cadastro
app.post('/cadastrarUserC',inserirC);
app.post('/cadastrarUserI',inserirI);

//Rota de gerenciamento de usuário
app.get('/pegarInfo', buscar)
app.delete('/deletarUser/:id', deletarU);

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso na porta 3000`);
});