class Logica {
  constructor({tela, util}){
    this.tela = tela;
    this.util = util;

    this.princesasIniciais = [
      {img: './src/image/ariel.png', nome:'Ariel'},
      {img: './src/image/bela.png', nome:'Bela'},
      {img: './src/image/brancadeneve.png', nome:'Branca De Neve'},
      {img: './src/image/cinderela.png', nome:'Cinderela'}
    ]

    this.iconePadrao = './src/image/padrao.png';
    this.princesasEscondidas = [];
    this.princesasSelecionadas = [];
  }

  inicializar(){
    this.tela.atualizarImagens(this.princesasIniciais);
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
    this.tela.configurarBotaoMostrarTudo(this.mostrarPrincesasEscondidas.bind(this));
  }

  async embaralhar(){
    const copias = this.princesasIniciais
    .concat(this.princesasIniciais)
    .map(item=>{
      return Object.assign({}, item, {id: Math.random()/0.5})
    })
    .sort(()=>Math.random()-0.5)

    this.tela.atualizarImagens(copias);

    await this.util.timeout(1000)      
    this.esconderPrincesas(copias)
   
  }

  esconderPrincesas(princesas){
    const princesasOcultas = princesas.map(({nome, id}) => ({
      id,
      nome,
      img: this.iconePadrao
    }))

    this.tela.atualizarImagens(princesasOcultas);

    this.princesasEscondidas = princesasOcultas;
  }

  exibirPrincesas(nomeDaPrincesa){
    const {img} = this.princesasIniciais.find(({nome})=> nomeDaPrincesa === nome);
    this.tela.exibirPrincesas(nomeDaPrincesa, img);
  }

  verificarSelecao(id, nome){
    const item = {id, nome};
    const princesasSelecionadas = this.princesasSelecionadas.length;
    switch(princesasSelecionadas){
      case 0: 
        this.princesasSelecionadas.push(item);
        break;
      
      case 1:
        const[opcao1] = this.princesasSelecionadas;
        this.princesasSelecionadas = [];

        if(opcao1.nome === item.nome && opcao1.id !== item.id){
          this.exibirPrincesas(item.nome);
          this.tela.exibirMensagem();
          return;
        }
        this.tela.exibirMensagem(false);
        break;
    }
  }

  mostrarPrincesasEscondidas(){
    const princesasEscondidas = this.princesasEscondidas;
    for(const princesa of princesasEscondidas){
      const {img} = this.princesasIniciais.find(item => item.nome === princesa.nome);
      princesa.img = img;
    }
    this.tela.atualizarImagens(princesasEscondidas);
  }

  jogar(){
    this.embaralhar();
  }
}