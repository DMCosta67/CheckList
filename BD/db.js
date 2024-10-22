import { createConnection } from "mysql";

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'coelba'
});


connection.connect((err) => {
    if (err) {
        console.error('Erro ao realizar conexão com o BD:', err);
        throw err;
    }
    console.log('Conexão realizada');
});


export default connection;