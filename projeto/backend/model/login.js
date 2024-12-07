import pool from "./db.js";
import bcrypt from 'bcrypt';

//modulo para validar a senha
export async function comparador(senhainserida,senhaBuscada) {
    const resposta = await bcrypt.compare(senhainserida, senhaBuscada);
    return resposta;
} 

//Modulo para fazer a autenticação 
export async function Verificacao(email) {
    const query = `SELECT nomePe, senha FROM conta WHERE emailPe = ? AND nivel = 1`
    const [results] = await pool.execute(query,[email]);
    if (!results || results.length === 0) {
        throw new Error("Erro ao Buscar.")
    }
    return results[0];
}