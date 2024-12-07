import { readAll, readById, readBydate, deleteForms} from "../model/formulario.js";



// função para puxar todos no banco
export async function lerTudo(req, res) {
    try {
        const results = await readAll();
        if (results.length > 0) {
            console.log('Todos os Dados pegos com sucesso');
            res.status(200).json(results);
        } else {
            res.status(404).json({ error: 'Form não encontrada ou está desativada' });
        }
    } catch (err) {
        console.error("Erro ao buscar os dados", err);
    }
}
//função para ler pelo id
export async function lerUm(req, res) {
    const id = req.params.id;
    try {
        const results = await readById(id);
        if (results) {
            console.log('Dados pegos com sucesso');
            res.status(200).json(results);
        } else {
            res.status(404).json({ error: 'Form não encontrada ou está desativada' });
        }
    } catch (err) {
        console.error("Erro ao buscar o formulário", err);
    }

}
//função pra pegar o filtro por data
export async function filtroPorData(req, res) {
    const { dataMin, dataMax } = req.query;
    try {
        const results = await readBydate(dataMin, dataMax);
        if (results.length > 0) {
            console.log('Dados filtrados com sucesso');
            res.status(200).json(results);
        } else {
            res.status(404).json({ error: 'Form não encontrada ou está desativada' });
        }
    } catch (err) {
        console.error("Erro ao buscar o formulário por data", err);
    }

}


// Função para desativar o formulário

export async function deleteForm(req, res) {
    const { id } = req.params;
    try {
        const result = await deleteForms(id);
        if(result){
        res.send('form excluída com sucesso');
        }
    } catch (err) {
        console.error("Erro ao apagar o formulário", err);
    }
}