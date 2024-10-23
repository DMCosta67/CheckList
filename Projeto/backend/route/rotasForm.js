import express, { json } from "express";
import cors from "cors";
import { criarForm, lerTudo, lerUm, filtroPorData, deleteForm } from '../controller/controllerForm.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para CRUD de form
app.post('/cadastrarForm', criarForm); 
app.get('/getAllForm', lerTudo);
app.get('/getForm/:id', lerUm);
app.get('/formFilt', filtroPorData); 
app.delete('/delForm/:id', deleteForm); 


app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso na porta 3000`);
});