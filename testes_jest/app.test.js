const { getFormById, getItensById, getEstruById, getDate, getContById, connection } = require('./db');

    beforeAll(async () => {

        //Inserindo
        //formulario_inspecao
        await connection.query("INSERT INTO formulario_inspecao (numEstrutura, dataInsp, linhaTrans, Inspetor1, Inspetor2, ativo) VALUES ('202', '2022-07-11', 'CatuRios', 'Daniel', 'Marcos', '1')");
        
        //itens
        await connection.query("INSERT INTO itens (Faixa, Base, EstruMetalicas, CadeiadeIsol, CaboCondutor, ChaveSecc, ParaRaios, Sinaliz, id_form) VALUES ('C', 'NC', 'NA', 'C', 'C', 'NC', 'NA', 'C', 1)");

        //estrutura
        await connection.query("INSERT INTO estrutura (torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky, id_form) VALUES (1, 0, 0, 1, 0, 1, 0, 0, 1)");

        //conta
        await connection.query("INSERT INTO conta (nomePe, emailPe, senha, nivel) VALUES ('Thiago Barros', 'thiaguinhomaroto@gmail.com', 'barrosmello123', 1)");
}); 

    afterAll(async () => {
        //Desabilita as verificações de chave estrangeira
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    await connection.query('TRUNCATE TABLE formulario_inspecao');
    await connection.query('TRUNCATE TABLE itens');
    await connection.query('TRUNCATE TABLE estrutura');
    await connection.query('TRUNCATE TABLE conta');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    await connection.end();
    });


    describe ('Testes para getFormById, getItensById, getEstruById e getDate', () => {

    //Formulario_inspecao
    test('1 - puxando do formulario_inspecao', async () => {
        const formulario_inspecao = await getFormById(1);
        // toHaveProperty matcher doo jest para verificar se um objeto possui uma propriedade especifica
        expect(formulario_inspecao).toHaveProperty('numEstrutura', 202);
        expect(formulario_inspecao.dataInsp.toISOString().split('T')[0]).toBe('2022-07-11');
        expect(formulario_inspecao).toHaveProperty('linhaTrans', 'CatuRios');
        expect(formulario_inspecao).toHaveProperty('Inspetor1', 'Daniel');
        expect(formulario_inspecao).toHaveProperty('Inspetor2', 'Marcos');
        expect(formulario_inspecao).toHaveProperty('ativo', 1);
    });

    // itens
    test('2 - puxando do itens', async () => {
        const itens = await getItensById(1);

        expect(itens).toHaveProperty('Faixa', 'C');
        expect(itens).toHaveProperty('Base', 'NC');
        expect(itens).toHaveProperty('EstruMetalicas', 'NA');
        expect(itens).toHaveProperty('CadeiadeIsol', 'C');
        expect(itens).toHaveProperty('CaboCondutor', 'C');
        expect(itens).toHaveProperty('ChaveSecc', 'NC');
        expect(itens).toHaveProperty('ParaRaios', 'NA');
        expect(itens).toHaveProperty('Sinaliz', 'C');
        expect(itens).toHaveProperty('id_form', 1);
        
    });

    // estrutura
    test('3 - puxando da estrutura', async () => {
        const estrutura = await getEstruById(1);

        expect(estrutura).toHaveProperty('torre', 1);
        expect(estrutura).toHaveProperty('concreto', 0);
        expect(estrutura).toHaveProperty('susp', 0);
        expect(estrutura).toHaveProperty('ancoragem', 1);
        expect(estrutura).toHaveProperty('secc', 0);
        expect(estrutura).toHaveProperty('metalica', 1);
        expect(estrutura).toHaveProperty('devConcreto', 0);
        expect(estrutura).toHaveProperty('sky', 0);

    });

    // conta
    test('4 - puxando da conta', async () => {
        const conta = await getContById(1);

        expect(conta).toHaveProperty('nomePe', 'Thiago Barros');
        expect(conta).toHaveProperty('emailPe', 'thiaguinhomaroto@gmail.com');
        expect(conta).toHaveProperty('senha', 'barrosmello123');
        expect(conta).toHaveProperty('nivel', 1);

    });

    //Garantir que email esteja em formato válido
    test('5 - Garantir que o email está em um formato válido', async () => {
        const conta = await getContById(1);
        const emailRegex = /^[^\s@]+@[^\s@]+[^\s@]+$/;

        expect(conta.emailPe).toMatch(emailRegex);
    });

    //Formulario_inspecao e conta vericando parte do nome
    test('6 - verifica parte do nome', async () => {
        const formulario_inspecao = await getFormById(1);
        const conta = await getContById(1);

        expect(formulario_inspecao.Inspetor1).toMatch(/Dan/);
        expect(formulario_inspecao.Inspetor2).toMatch(/Mar/);

        expect(conta.nomePe).toMatch(/hiago/);
        
    });

    //Formulario_inspecao, Itens e Conta vericando que não seja null
    test('7 - garantir que não sejam NUll ou Undefined', async () => {
        const formulario_inspecao = await getFormById(1);
        const itens = await getItensById(1);
        const conta = await getContById(1);

        //Form
        expect(formulario_inspecao.numEstrutura).not.toBeNull();
        expect(formulario_inspecao.numEstrutura).not.toBeUndefined();

        expect(formulario_inspecao.dataInsp).not.toBeNull();
        expect(formulario_inspecao.dataInsp).not.toBeUndefined();
        
        expect(formulario_inspecao.linhaTrans).not.toBeNull();
        expect(formulario_inspecao.linhaTrans).not.toBeUndefined();

        expect(formulario_inspecao.Inspetor1).not.toBeNull();
        expect(formulario_inspecao.Inspetor1).not.toBeUndefined();

        expect(formulario_inspecao.Inspetor2).not.toBeNull();
        expect(formulario_inspecao.Inspetor2).not.toBeUndefined();

        expect(formulario_inspecao.descricao).not.toBeUndefined();

        //itens
        expect(itens.Faixa).not.toBeNull();
        expect(itens.Faixa).not.toBeUndefined();

        expect(itens.Base).not.toBeNull();
        expect(itens.Base).not.toBeUndefined();

        expect(itens.EstruMetalicas).not.toBeNull();
        expect(itens.EstruMetalicas).not.toBeUndefined();

        expect(itens.CadeiadeIsol).not.toBeNull();
        expect(itens.CadeiadeIsol).not.toBeUndefined();
        
        expect(itens.CaboCondutor).not.toBeNull();
        expect(itens.CaboCondutor).not.toBeUndefined();
        
        expect(itens.ChaveSecc).not.toBeNull();
        expect(itens.ChaveSecc).not.toBeUndefined();

        expect(itens.ParaRaios).not.toBeNull();
        expect(itens.ParaRaios).not.toBeUndefined();

        expect(itens.Sinaliz).not.toBeNull();
        expect(itens.Sinaliz).not.toBeUndefined();

        //conta
        expect(itens.nomePe).not.toBeNull();
        expect(itens.nomePe).not.toBeUndefined();

        expect(itens.emailPe).not.toBeNull();
        expect(itens.emailPe).not.toBeUndefined();
    });

    //Datas especificas
    test('8 - Deve retornar o Form entre as datas especificadas', async () => {
        const form = await getDate('2022-07-08','2022-07-13');
        const itens = await getItensById(form.id_form);
        const estrutura = await getEstruById(form.id_form);

        expect(form).toHaveProperty('Inspetor1', 'Daniel', 'Inspetor2', 'Marcos', 'numEstrutura', '202', 'dataInsp', '2022-07-11', 'linhaTrans', 'CatuRios');
        expect(itens).toHaveProperty('Faixa', 'C', 'Base', 'NC', 'EstruMetalicas', 'NA', 'CadeiadeIsol', 'C', 'CaboCondutor', 'C', 'ChaveSecc', 'NC', 'ParaRaios', 'NA', 'Sinaliz', 'C')
        expect(estrutura).toHaveProperty('torre', 1, 'concreto', 0, 'susp', 0, 'ancoragem', 1, 'secc', 0, 'metalica', 1, 'devConcreto', 0, 'sky', 0);
        
    });

    //Teste de desempenho
    test('9 - Verificar se os "gets" responde em menos de 100ms', async () => {
        const inicio = performance.now(); //Inicio da contagem
        await getFormById(1);
        await getItensById (1); 
        await getEstruById(1);
        const fim = performance.now(); //Fim da contagem

        const duracao = fim - inicio;
        console.log(`Tempo de execução ${duracao.toFixed(2)} ms`);
        expect(duracao).toBeLessThanOrEqual(100);
    });

    //Teste de Carga -----------------------
    const http = require('http');
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('TESTE\n');
    })

    server.listen(port, hostname, () => {
        console.log(`servidor rodando em http://${hostname}:${port}/`);
    })

    const performLoadTest = (requisicoes) => {
        const inicio = Date.now();
        let completed = 0;
        for (let i = 0; i < requisicoes; i++) {
            http.get('http://localhost:3000', (res) =>{
                completed++;
                if (completed === requisicoes){
                    const tempototal = Date.now() - inicio;
                    console.log(`Executado ${requisicoes} requisições em ${tempototal}ms`);
                    console.log(`Tempo médio por requisição: ${tempototal / requisicoes}ms`)
                }
            });
        }
    }

    performLoadTest(100); //Simula 100 requisições

});