import pool from "./db.js";


//modulos do RUD
export async function createForm(inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, idConta) {
    const query =
        `
        INSERT INTO formulario_inspecao ( inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, ativo, idConta)
        VALUES (?, ?, ?, ?, ?, 1, ?)
        `;
    const [result] = await pool.execute(query, [inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, idConta]);
    if (!result.insertId) { 
        throw new Error("Erro ao inserir.");
    }
    return result;
}

export async function createEst(idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky) {
    const query = `
        INSERT INTO estrutura (id_form, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const [result] = await pool.execute(query, [idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky]);
    if (!result.insertId) { 
        throw new Error("Erro ao inserir.");
    }
    return result;
}

export async function createItens(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao) {
    const query = `
        INSERT INTO itens (Faixa, Base, EstruMetalicas, CadeiadeIsol, CaboCondutor, ChaveSecc, ParaRaios, Sinaliz, id_form)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    const [result] = await pool.execute(query, [faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao]);
    if (!result.insertId) { 
        throw new Error("Erro ao inserir.");
    }
    return result;
}

export async function readAll() {
    const query = `
        SELECT c.nomePe, f.*, date_format(dataInsp,'%d/%m/%Y') as data 
        FROM conta c
        join formulario_inspecao f on c.idConta = f.idConta and f.ativo = '1'
        ORDER BY f.dataInsp DESC
        LIMIT 31;
        `;
    const [results] = await pool.execute(query);
    if (!results || results.length === 0) {
        return []; // Retorna um array vazio em vez de lançar erro
    }
    return results;
}

export async function readById(id) {

    const query = `
    SELECT f.*,c.nomePe, date_format(dataInsp,'%d/%m/%Y') as data, e.*, i.*
    FROM formulario_inspecao f
    JOIN estrutura e ON f.id_form = e.id_form
    JOIN itens i ON f.id_form = i.id_form
    JOIN conta c on c.idConta = f.idConta
    WHERE f.id_form = ? AND f.ativo = 1
    `;
    const [results] = await pool.execute(query,[id]);
    if (!results || results.length === 0) {
        return []; // Retorna um array vazio em vez de lançar erro
    }
    return results[0];
}

export async function readBydate(dataMin, dataMax) {

    const query = `
    SELECT f.*, c.nomePe, date_format(dataInsp,'%d/%m/%Y') as data
    FROM formulario_inspecao f
    JOIN conta c on c.idConta = f.idConta
    WHERE f.ativo = 1
    AND
    dataInsp bETWEEN ? AND ?
    ORDER BY f.dataInsp DESC
    LIMIT 31;;
    `;
    const [results] = await pool.execute(query, [dataMin, dataMax]);
    if (!results || results.length === 0) {
        return []; // Retorna um array vazio em vez de lançar erro
    }
    return results;
}

export async function deleteForms(id) {
    const query = 'UPDATE formulario_inspecao SET ativo = 0 WHERE id_form = ?';
    const [result] = await pool.execute(query, [id]);
    if (!result.affectedRows) { // Verifique affectedRows
        throw new Error("Erro ao deletar ou formulário não encontrado.");
    }
    return result;
}

//agr permanente
export async function pegarId(mail) {
    const query = 'SELECT idConta FROM conta WHERE emailPe = ?';
    const [results] = await pool.execute(query, [mail]);
    if (!results || results.length === 0) {
        throw new Error("Usuário não encontrado para o email fornecido.");
    }
    return results[0]?.idConta;
}