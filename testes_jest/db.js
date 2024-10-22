const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database:'coelba'
});

//formulario_inspecao
async function getFormById(id){
    const [rows] = await connection.query('SELECT * FROM formulario_inspecao WHERE id_form = ?', [id])
    return rows[0];
}   

//itens
async function getItensById(id){
    const [rows] = await connection.query('SELECT * FROM itens WHERE id_form = ?', [id])
    return rows[0];
}   

//estrutura
async function getEstruById(id){
    const [rows] = await connection.query('SELECT * FROM estrutura WHERE id_form = ?', [id])
    return rows[0];
}   

//conta
async function getContById(id){
    const [rows] = await connection.query('SELECT * FROM conta WHERE idConta = ?', [id])
    return rows[0];
}   

//Datas especificas
async function getDate(ini, fim) {
    const [rows] = await connection.query('SELECT * FROM formulario_inspecao WHERE dataInsp BETWEEN ? AND ?', [ini, fim]);
    return rows[0];
}


module.exports = { getFormById, getItensById, getEstruById, getDate, getContById, connection}; 