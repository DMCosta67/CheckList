const bcrypt = require('bcrypt');

async function hashSenha(senha) {
    try {
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash(senha, salt);
        console.log('Hash gerado: ', hash);
        return hash;
    } catch (err) {
        console.log('Falha na hora de gerar o hash: ', err);
    }
}

async function comparador(senhainserida, senhaBuscada) {
    const resposta = await bcrypt.compare(senhainserida, senhaBuscada);
    return resposta;
}

// Exportando as funções
module.exports = { hashSenha, comparador };
