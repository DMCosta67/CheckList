const express = require ('express');
const app = express();
const { getFormById, getItensById, getEstruById } = require('./db');

app.get('/coelba/:id', async (req, res) =>{
    const { id } = req.params;
    //form
    try {
        const formulario_inspecao = await getFormById(id);
        if (formulario_inspecao){
            res.json(formulario_inspecao);
        } else {
            res.status(404).json({ message: 'form não tem'});
        }
    } catch (error) {
        res.status(500).json ({ message: 'Erro de conexão com o BD' })
    }
    //itens
    try {
        const itens = await getItensById(id);
        if (itens){
            res.json(itens);
        } else {
            res.status(404).json({ message: 'item não tem'});
        }
    } catch (error) {
        res.status(500).json ({ message: 'Erro de conexão com o BD' })
    }
    //estrutura
    try {
        const estrutura = await getEstruById(id);
        if (estrutura){
            res.json(estrutura);
        } else {
            res.status(404).json({ message: 'estrutura não tem'});
        }
    } catch (error) {
        res.status(500).json ({ message: 'Erro de conexão com o BD' })
    }

});


module.exports = app;
