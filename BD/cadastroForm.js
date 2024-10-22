class CadastroForm {
    constructor(inspetor1, inspetor2, numEstrutura, dataInsp, linhaTrans, torre, concreto, susp, ancoragem, secc, metalica, devConcreto, sky) {
        this._inspetor1 = inspetor1;
        this._inspetor2 = inspetor2;
        this._numEstrutura = numEstrutura;
        this._dataInsp = dataInsp;
        this._linhaTrans = linhaTrans;
        this._torre = torre;
        this._concreto = concreto;
        this._susp = susp;
        this._ancoragem = ancoragem;
        this._secc = secc;
        this._metalica = metalica;
        this._devConcreto = devConcreto;
        this._sky = sky;
    }

    get inspetor1() {
        return this._inspetor1;
    }

    set inspetor1(novoInspetor1) {
        this._inspetor1 = novoInspetor1;
    }

    get inspetor2() {
        return this._inspetor2;
    }

    set inspetor2(novoInspetor2) {
        this._inspetor2 = novoInspetor2;
    }

    get numEstrutura() {
        return this._numEstrutura;
    }

    set numEstrutura(novoNumEstrutura) {
        this._numEstrutura = novoNumEstrutura;
    }

    get dataInsp() {
        return this._dataInsp;
    }

    set dataInsp(novaDataInsp) {
        this._dataInsp = novaDataInsp;
    }

    get linhaTrans() {
        return this._linhaTrans;
    }

    set linhaTrans(novaLinhaTrans) {
        this._linhaTrans = novaLinhaTrans;
    }

    get torre() {
        return this._torre;
    }

    set torre(novaTorre) {
        this._torre = novaTorre;
    }

    get concreto() {
        return this._concreto;
    }

    set concreto(novoConcreto) {
        this._concreto = novoConcreto;
    }

    get susp() {
        return this._susp;
    }

    set susp(novoSusp) {
        this._susp = novoSusp;
    }

    get ancoragem() {
        return this._ancoragem;
    }

    set ancoragem(novaAncoragem) {
        this._ancoragem = novaAncoragem;
    }

    get secc() {
        return this._secc;
    }

    set secc(novaSecc) {
        this._secc = novaSecc;
    }

    get metalica() {
        return this._metalica;
    }

    set metalica(novaMetalica) {
        this._metalica = novaMetalica;
    }

    get devConcreto() {
        return this._devConcreto;
    }

    set devConcreto(novoDevConcreto) {
        this._devConcreto = novoDevConcreto;
    }

    get sky() {
        return this._sky;
    }

    set sky(novoSky) {
        this._sky = novoSky;
    }
}

export default CadastroForm;
