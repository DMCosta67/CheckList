import { createForm, createEst, createItens, readAll, readById, readBydate, deleteForms } from "../model/formulario.js";

// Puxar data do dida
async function pegarData(){
    const date = new Date();
    return date.toISOString().split('T')[0];
}

// função para inserir no banco
export async function criarForm(req, res) {
     const { inspetor1, inspetor2, numEstrutura, linhaTrans, descricao,
        torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky,
        faixa, base, estrut, cadeia, cabo, chave, para, sinaliz } = req.body;

        const dataInsp = await pegarData();

     console.log("Dados recebidos", {
        inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, descricao,
        torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky,
        faixa, base, estrut, cadeia, cabo, chave, para, sinaliz
    });
    //inserir na tabela formulário
    createForm(inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans,descricao, (err1, result1) => {
        if (err1) {
            console.error("Erro ao inserir dados em formulario_inspecao", err1);
            return res.status(500).json({ error: 'Erro ao inserir dados em formulario_inspecao' });
        } else {
            console.log('Dados inseridos em formulario_inspecao com sucesso');
            const idFormularioInspecao = result1.insertId;
            //inserir na tabela estrutura
            createEst(idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky, (err2) => {
                if (err2) {
                    console.error("Erro ao inserir dados em estrutura", err2);
                    return res.status(500).json({ error: 'Erro ao inserir dados em estrutura' });
                } else {
                    console.log('Dados inseridos em estrutura com sucesso');
                    res.status(201).json({ mensagem: 'Dados inseridos com sucesso' });
                }    
            });
            //inserir na tabela formulário
            createItens(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao, (err3) => {
                    if (error) {
                        console.error("Erro ao inserir dados do item", error);
                        return;
                    }else{
                    console.log(`Dados dos itens inseridos com sucesso`);
                    }
            });
        }
    });
}
// função para puxar todos no banco
export async function lerTudo(req, res){
    readAll((error, results) => {
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
}
//função para ler pelo id
export async function lerUm(req, res){
    const id = req.params.id;
    readById((id),(error, results) => {
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
}
//função pra pegar o filtro por data
export async function filtroPorData(req, res){
    const { dataMin, dataMax } = req.query;
    readBydate((dataMin, dataMax),(error, results) => {
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
}





export async function deleteForm(req, res) {
    const { id } = req.params;
    deleteForms(id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send('form excluída com sucesso');
    });
}