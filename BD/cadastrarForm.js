import express, { json } from "express";
import cors from "cors";
import connection from './db.js';

const app = express();

app.use(express.json());
app.use(cors());

async function pegarData(){
    const date = new Date();
    return date.toISOString().split('T')[0];
}

// Adicionar no BD
app.post('/cadastrarForm', async (req, res) => {
    const { inspetor1, inspetor2, numEstrutura, linhaTrans, descricao,
            torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky,
            faixa, base, estrut, cadeia, cabo, chave, para, sinaliz } = req.body;

    const dataInsp = await pegarData();
    console.log("Dados recebidos", {
        inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao,
        torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky,
        faixa, base, estrut, cadeia, cabo, chave, para, sinaliz
    });

    const sql1 = "INSERT INTO formulario_inspecao (inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, ativo) VALUES (?, ?, ?, ?, ?, ?, 1)";
    const sql2 = "INSERT INTO estrutura (id_form, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const sql3 = "INSERT INTO itens (Faixa, Base, EstruMetalicas, CadeiadeIsol, CaboCondutor, ChaveSecc, ParaRaios, Sinaliz, id_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";;

    connection.query(sql1, [inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao], (error1, results1) => {
        if (error1) {
            console.error("Erro ao inserir dados em formulario_inspecao", error1);
            return res.status(500).json({ error: 'Erro ao inserir dados em formulario_inspecao' });
        } else {
            console.log('Dados inseridos em formulario_inspecao com sucesso');
            const idFormularioInspecao = results1.insertId;

            connection.query(sql2, [idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky], (error2, results2) => {
                if (error2) {
                    console.error("Erro ao inserir dados em estrutura", error2);
                    return res.status(500).json({ error: 'Erro ao inserir dados em estrutura' });
                } else {
                    console.log('Dados inseridos em estrutura com sucesso');
                    
                    // Inserir os dados de conformidade dos itens
                    insertItem(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao);

                    res.status(200).json({ message: 'Dados inseridos com sucesso' });
                }
            });
        }
    });

    // Função para inserir um item na tabela
    function insertItem(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormulario) {
        connection.query(sql3, [faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormulario], (error, results) => {
            if (error) {
                console.error("Erro ao inserir dados do item", error);
                return;
            }
            console.log(`Dados dos itens inseridos com sucesso`);
        });
    }
});


// Leitura do BD
app.get('/cadastrarForm/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT f.*, date_format(dataInsp,'%d/%m/%Y') as data, e.*, i.*
        FROM coelba.formulario_inspecao f
        JOIN estrutura e ON f.id_form = e.id_form
        JOIN itens i ON f.id_form = i.id_form
        WHERE f.id_form = ? AND f.ativo = 1
    `;

    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            console.error("Erro ao ler dados", error);
            res.status(500).json({ error: 'Erro ao ler dados' });
        } else {
            if (results.length > 0) {
                console.log('Dados pegos com sucesso');
                res.status(200).json(results);
                
            } else {
                res.status(404).json({ error: 'Form não encontrada ou está desativada' });
            }
        }
    });
});
//Rota pra pegar todos os registros
app.get('/cadastrarForm', async (req, res) => {
    const pegar = `SELECT *, date_format(dataInsp,'%d/%m/%Y') as data FROM coelba.formulario_inspecao f WHERE f.ativo = 1`;

    connection.query(pegar, (error, results) => {
        if (error) {
            console.error("Erro ao ler dados", error);
            res.status(500).json({ error: 'Erro ao ler dados' });
        } else {
            if (results.length > 0) {
                console.log('Todos os Dados pegos com sucesso');
                res.status(200).json(results);
            } else {
                res.status(404).json({ error: 'Form não encontrada ou está desativada' });
            }
        }
    });
});

//rota pra pegar os registros filtrados
app.get('/cadastrarFormFilt', async (req, res) => {
    const { dataMin, dataMax } = req.query;
    const filtrar = `SELECT *, date_format(dataInsp,'%d/%m/%Y')as data
    FROM coelba.formulario_inspecao
    f WHERE f.ativo = 1
    AND dataInsp BETWEEN ? AND ?`;

    connection.query(filtrar, [dataMin,dataMax], (error, results) => {
        if (error) {
            console.error("Erro ao ler dados", error);
            res.status(500).json({ error: 'Erro ao ler dados' });
        } else {
            if (results.length > 0) {
                console.log('Dados filtrados com sucesso');
                res.status(200).json(results);
            } else {
                res.status(404).json({ error: 'Form não encontrada ou está desativada' });
            }
        }
    });
});

// Atualizar o campo ativo para 0
app.delete('/cadastrarForm/:id', async (req, res) => {
    const id = req.params.id;
    
    const sql = `UPDATE formulario_inspecao SET ativo = 0 WHERE id_form = ?`;

    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            console.error("Erro ao desativar Form", error);
            res.status(500).json({ error: 'Erro ao desativar Form' });
        } else {
            if (results.affectedRows > 0) {
                console.log('Form desativada com sucesso');
                res.status(200).json({ message: 'Form desativada com sucesso' });
            } else {
                res.status(404).json({ error: 'Form não encontrada' });
            }
        }
    });
});

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso na porta 3000`);
});
