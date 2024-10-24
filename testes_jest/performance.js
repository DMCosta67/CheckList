import axios from "axios"; 

async function realizarReq(){
    try{
        const response = await axios.get(`http://localhost:3000/coelba/1`);
        console.log(response.status);
        console.log(response.data);
    }catch(erro){
        console.log(erro.message);
    }
}


async function teste(quant){
    const respostas = [];
    const inicio = performance.now();
    for (let i = 0; i < quant; i++) {
        respostas.push(realizarReq());
    }
    Promise.all(respostas);
    const fim = performance.now();
    const duracao = fim - inicio;
    console.log(`Para realizar essas requisições foi necessário ${duracao.toFixed(2)} ms`);
}

teste(1);

