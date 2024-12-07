import { createEst, createForm, createItens, pegarId } from "../model/formulario.js";



export async function control(data) {
   //declaração das constantes da estrutura
   const torre = await sim(data.estrutura.find(estrutura => estrutura.name === 'Torre')?.selected);
   const concreto = await  sim(data.estrutura.find(estrutura => estrutura.name === 'Concreto')?.selected);
   const susp = await sim(data.estrutura.find(estrutura => estrutura.name === 'Suspensão')?.selected);
   const ancoragem = await sim(data.estrutura.find(estrutura => estrutura.name === 'Ancoragem')?.selected);
   const secc = await sim(data.estrutura.find(estrutura => estrutura.name === 'Chave Secc')?.selected);
   const metalica = await sim(data.estrutura.find(estrutura => estrutura.name === 'Estrutura derivação metálica')?.selected);
   const devConcreto = await sim(data.estrutura.find(estrutura => estrutura.name === 'Estrutura derivação concreto')?.selected);
   const sky = await sim(data.estrutura.find(estrutura => estrutura.name === 'Sky')?.selected);

   //declaração das constantes da itens
   const faixa = data.itens.find(itens => itens.name === 'Faixa de Servidão').status;
   const base = data.itens.find(itens => itens.name === 'Base da Estrutura e Estai').status;
   const estrut = data.itens.find(itens => itens.name === 'Estrut Metálicas e Concreto').status;
   const cadeia = data.itens.find(itens => itens.name === 'Cadeia de Isol. e acessórios').status;
   const cabo = data.itens.find(itens => itens.name === 'Cabo Condutor e emendas').status;
   const chave = data.itens.find(itens => itens.name === 'Chave Secc de LT').status;
   const para = data.itens.find(itens => itens.name === 'Para Raios').status;
   const sinaliz = data.itens.find(itens => itens.name === 'Sinaliz, Travessias e cruzamentos').status;
   //declaração das constantes do form
   const inspetor2 = data.inspetor2;
   const numEstrutura = data.numEstrutura;
   const dataInsp = data.dataInsp;
   const linhaTrans = data.linhaT;
   const descricao = data.descricao;
   const mail = data.email;
   

console.log("Dados recebidos que já foram tratados",{
     inspetor2, numEstrutura, dataInsp, linhaTrans, descricao,
     torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky,
     faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, mail
   });

   try {
    const idConta = await pegarId(mail);

    //inserir na tabela formulário
    const resultForm = await createForm(inspetor2, numEstrutura, dataInsp, linhaTrans, descricao, idConta);
    const idFormularioInspecao = resultForm.insertId;
    if(resultForm.insertId){
      console.log("Fórmulário cadastrado");
    }
    //inserir na tabela estrutura
    const resultEst = await createEst(idFormularioInspecao, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky);
    
    if(resultEst.insertId){
      console.log("Estrutura cadastrada");
    }
    //inserir na tabela itens
    const resultItens = await createItens(faixa, base, estrut, cadeia, cabo, chave, para, sinaliz, idFormularioInspecao);
    if(resultItens.insertId){
      console.log("Itens cadastrados");
    }
} catch (err) {
    console.error("Erro ao criar o formulário", err);
    res.status(500).json({ error: 'Erro ao inserir dados' });
}

}

async function sim(valor) {
  if (valor === true) {
    return 1;
  }else{
    return 0;
  }
};
