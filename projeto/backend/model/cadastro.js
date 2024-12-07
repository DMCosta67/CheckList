import pool from "./db.js";
import bcrypt from 'bcrypt';
import admin from "./firebase.js";


// Módulo para hashear a senha
export async function hashSenha(senha) {
  try {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(senha, salt);
    return hash;
  } catch (err) {
    console.log('Falha na hora de gerar o hash, ', err);
  }
}
// Módulos de cadastro
export async function createCoor(nome, email, senhaC) {
  const query = `INSERT INTO conta(nomePe,emailPe,senha,nivel) VALUES(?,?,?,1)`
  const [result] = await pool.execute(query, [nome, email, senhaC]);
  if (!result.insertId) { 
    throw new Error("Erro ao inserir.");
  }
  return result;
}
//Inspetor
export async function createInsp(nome, email, senhaC) {
  const query = `INSERT INTO conta(nomePe,emailPe,senha,nivel) VALUES(?,?,?,0)`
  const [result] = await pool.execute(query, [nome, email, senhaC]);
  if (!result.insertId) { 
    throw new Error("Erro ao inserir.");
  }
  return result;
}
//Cadastrar inspetor no firebase
export async function criarUsuario(newUser) {
  console.log("veio", newUser);
  admin.auth().createUser(newUser)
    .then((userRecord) => {
      console.log('Usuário criado com sucesso:', userRecord.uid);
    })
    .catch((error) => {
      console.error('Erro ao criar usuário:', error);
    });
};