import connection from './db';

class Form {
    static read(callback) {
        connection.query('SELECT * FROM formulario_inspecao', callback);
    }
    
    static create(novaForm, callback) {
        connection.query('INSERT INTO formulario_inspecao SET ?, INSERT INTO estrutura SET ?, INSERT INTO itens SET ?', novaForm, callback);
    }
    
    static update(id, novosDados, callback) {
        connection.query('UPDATE formulario_inspecao SET ? WHERE id = ?', [novosDados, id], callback);
    }
    
    static delete(id, callback) {
        connection.query('DELETE FROM formulario_inspecao WHERE id = ?', [id], callback);
    }
}

export default Form;

