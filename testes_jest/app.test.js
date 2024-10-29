const { getFormById, getItensById, getEstruById, getDate, getContById, connection } = require('./db');
const axios = require('axios'); 
const http = require('http');

    beforeAll(async () => {

        //Inserindo
        //conta
        await connection.query("INSERT INTO conta (nomePe, emailPe, senha, nivel) VALUES ('Thiago Barros', 'thiaguinhomaroto@gmail.com', 'Barrosmello123', 1)");
        //formulario_inspecao
        await connection.query("INSERT INTO formulario_inspecao (numEstrutura, dataInsp, linhaTrans, Inspetor2, ativo, idConta) VALUES ('202', '2022-07-11', 'CatuRios', 'Marcos', '1', 1)");
        //itens
        await connection.query("INSERT INTO itens (Faixa, Base, EstruMetalicas, CadeiadeIsol, CaboCondutor, ChaveSecc, ParaRaios, Sinaliz, id_form) VALUES ('C', 'NC', 'NA', 'C', 'C', 'NC', 'NA', 'C', 1)");
        //estrutura
        await connection.query("INSERT INTO estrutura (torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky, id_form) VALUES (1, 0, 0, 1, 0, 1, 0, 0, 1)");


        //Inserindo para testar erros
        //conta, senha menor que 8 digitos
        await connection.query("INSERT INTO conta (nomePe, emailPe, senha, nivel) VALUES ('Michael Scofield', 'scofield24@gmail.com', 'Sco4567', 0)");
        //conta, senha maior que 16 digitos
        await connection.query("INSERT INTO conta (nomePe, emailPe, senha, nivel) VALUES ('Marcos Vinicius', 'vinicin234@gmail.com', 'Na0seioquecolocarparaatingir', 1)");
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
        expect(conta).toHaveProperty('senha', 'Barrosmello123');
        expect(conta).toHaveProperty('nivel', 1);

    });

    //Garantir que email esteja em formato válido
    test('5 - Garantir que o email está em um formato válido', async () => {
        const conta = await getContById(1);
        const emailRegex = /^[^\s@]+@[^\s@]+[^\s@]+$/;

        expect(conta.emailPe).toMatch(emailRegex);
    });

    //Garantir que a senha esteja em formato valido
    test('6 - Garantir que a senha está em um formato e tamanho válido', async () => {
        const conta = await getContById(1);
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+/;
    
        expect(conta.senha).toMatch(passwordRegex);
        expect(conta.senha.length).toBeGreaterThanOrEqual(8);
        expect(conta.senha.length).toBeLessThan(16);
    });

    //Formulario_inspecao e conta vericando parte do nome
    test('7 - verifica parte do nome', async () => {
        const formulario_inspecao = await getFormById(1);
        const conta = await getContById(1);

        expect(formulario_inspecao.Inspetor2).toMatch(/Mar/);

        expect(conta.nomePe).toMatch(/hiago/);
        
    });

    //Formulario_inspecao, estrutura, Itens e Conta vericando que não seja null
    test('8 - garantir que não sejam NUll ou Undefined', async () => {
        const formulario_inspecao = await getFormById(1);
        const itens = await getItensById(1);
        const conta = await getContById(1);
        const estrutura = await getEstruById(1);

        //Form
        expect(formulario_inspecao.numEstrutura).not.toBeNull();
        expect(formulario_inspecao.numEstrutura).not.toBeUndefined();

        expect(formulario_inspecao.dataInsp).not.toBeNull();
        expect(formulario_inspecao.dataInsp).not.toBeUndefined();
        
        expect(formulario_inspecao.linhaTrans).not.toBeNull();
        expect(formulario_inspecao.linhaTrans).not.toBeUndefined();

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

        //estrutura pode ser Null
        expect(estrutura.torre).not.toBeUndefined();

        expect(estrutura.concreto).not.toBeUndefined();

        expect(estrutura.susp).not.toBeUndefined();

        expect(estrutura.ancoragem).not.toBeUndefined();

        expect(estrutura.secc).not.toBeUndefined();

        expect(estrutura.metalica).not.toBeUndefined();

        expect(estrutura.sky).not.toBeUndefined();

        expect(estrutura.id_form).not.toBeUndefined();

        //conta
        expect(conta.nomePe).not.toBeNull();
        expect(conta.nomePe).not.toBeUndefined();

        expect(conta.emailPe).not.toBeNull();
        expect(conta.emailPe).not.toBeUndefined();

        expect(conta.senha).not.toBeNull();
        expect(conta.senha).not.toBeUndefined();

        expect(conta.nivel).not.toBeNull();
        expect(conta.nivel).not.toBeUndefined();
    });

    //Datas especificas
    test('9 - Deve retornar o Form entre as datas especificadas', async () => {
        const form = await getDate('2022-07-08','2022-07-13');
        const itens = await getItensById(form.id_form);
        const estrutura = await getEstruById(form.id_form);

        expect(form).toHaveProperty('Inspetor2', 'Marcos', 'numEstrutura', '202', 'dataInsp', '2022-07-11', 'linhaTrans', 'CatuRios');
        expect(itens).toHaveProperty('Faixa', 'C', 'Base', 'NC', 'EstruMetalicas', 'NA', 'CadeiadeIsol', 'C', 'CaboCondutor', 'C', 'ChaveSecc', 'NC', 'ParaRaios', 'NA', 'Sinaliz', 'C')
        expect(estrutura).toHaveProperty('torre', 1, 'concreto', 0, 'susp', 0, 'ancoragem', 1, 'secc', 0, 'metalica', 1, 'devConcreto', 0, 'sky', 0);
        
    });

    //Garantir que de erro quando for menor que 8 caracteres
    test('10 - Garantir que de erro na senha com menos de 8 caracteres', async () => {
        const menor = await getContById(2);
        
        expect(menor.senha.length).not.toBeGreaterThanOrEqual(8);
    });

    //Garantir que de erro quando for maior que 16 caracteres
    test('11 - Garantir que de erro na senha for maior de 16 caracteres', async () => {
        const maior = await getContById(3);

        expect(maior.senha.length).not.toBeLessThanOrEqual(16);
    });

    //Teste de desempenho
    test('12 - Verificar se os "gets" responde em menos de 100ms', async () => {
        const inicio = performance.now(); //Inicio da contagem
        await getFormById(1);
        await getItensById (1); 
        await getEstruById(1);
        await getContById(1);
        await getDate('2022-07-08','2022-07-13');
        const fim = performance.now(); //Fim da contagem

        const duracao = fim - inicio;
        console.log(`Tempo de execução ${duracao.toFixed(2)} ms`);
        expect(duracao).toBeLessThanOrEqual(100);
    });

    //Teste de Carga -----------------------
    const startServer = (port) => {
        return new Promise((resolve) => {
            const server = http.createServer((req, res) => {
                if (req.url === '/coelba/1') {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Requisição bem-sucedida!' }));
                } else {
                    res.statusCode = 404;
                    res.end('erro, não achou\n');
                }
            });
    
            server.listen(port, () => {
                console.log(`Servidor rodando em http://127.0.0.1:${port}/`);
                resolve(server);
            });
        });
    };
    
    // Funcão para realizar o teste de carga
    const performLoadTest = async (numRequests, port) => {
        const start = Date.now();
        let completedRequests = 0;
    
        for (let i = 0; i < numRequests; i++) {
            try {
                await axios.get(`http://localhost:${port}/coelba/1`);
                completedRequests++;
            } catch (error) {
                console.error('Erro na requisição:', error.message);
            }
        }
        
        const totalTime = Date.now() - start;
        console.log(`Executado ${completedRequests} requisições em ${totalTime}ms`);
        console.log(`Tempo médio por requisição: ${(totalTime / completedRequests).toFixed(2)}ms`);
    };
    
    // Teste de carga
    test('11 - Teste de Carga', async () => {
        const port = 3000;
        const server = await startServer(port);
    
        await performLoadTest(1000, port);  // Testando 1000 requisições
    
        server.close(() => {
            console.log('Servidor encerrado.');
        });
    });
    
});