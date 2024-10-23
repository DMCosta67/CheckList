import connection from "./db.js";

export function createForm(inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, callback){
    connection.query('INSERT INTO formulario_inspecao (inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, ativo) VALUES (?, ?, ?, ?, ?, 1)',[inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao],callback);
}

export function createEst(idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky){
    connection.query('INSERT INTO estrutura id_form, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',[idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky],callback);
}

export function createItens(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao, callback){
    connection.query('INSERT INTO itens (Faixa, Base, EstruMetalicas, CadeiadeIsol, CaboCondutor, ChaveSecc, ParaRaios, Sinaliz, id_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',[faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao],callback);
}

export function readAll(callback) {
    connection.query('SELECT * FROM formulario_inspecao', callback);
}

export function readById(id, callback){
    connection.query(
    `
    SELECT f.*, date_format(dataInsp,'%d/%m/%Y') as data, e.*, i.*
    FROM coelba.formulario_inspecao f
    JOIN estrutura e ON f.id_form = e.id_form
    JOIN itens i ON f.id_form = i.id_form
    WHERE f.id_form = ? AND f.ativo = 1
    `,[id],callback
    );
}

export function readBydate(dataMin, dataMax, callback) {
    connection.query(`SELECT *, date_format(dataInsp,'%d/%m/%Y') as data FROM coelba.formulario_inspecao f WHERE f.ativo = 1'`, [dataMin, dataMax], callback);
}

export function deleteForms(id, callback) {
    connection.query('UPDATE formulario_inspecao SET ativo_pessoa = 0 WHERE id = ?', [id], callback);
}