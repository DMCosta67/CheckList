import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'coelba',
});

//Test de conexão
async function test(){
    try {
        const connection = await pool.getConnection();
        await connection.query('SELECT 1');
        console.log('Conexão realizada com sucesso');
        connection.release();
    } catch (err) {
        console.error('Erro ao realizar conexão com o BD:', err);
    }
}
await test();

export default pool;