const util = Util;

const ID_CONTEUDO = "cards";
const ID_BTN_JOGAR = 'iniciar';
const ID_MENSAGEM = 'mensagem';
const CLASSE_INVISIVEL = 'invisible';
const ID_BTN_MOSTRAR = "mostrar";

const MENSAGENS = {
  sucesso: {
    texto: 'Combinação correta!',
    classe: 'success'
  },
  erro: {
    texto: 'Combinação incorreta!',
    classe: 'danger'
  }
}

class Tela {

  static obterCodigoHtml(item){
    return `<div class="item" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
    <img src="${item.img}" name="${item.nome}" alt="">
    </br>
    </div>`
  }

  static configurarBotaoVerificarSelecao(funcaoOnClick){
    window.verificarSelecao = funcaoOnClick;
  }

  static alterarConteudoHTML(CodigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO);
    conteudo.innerHTML = CodigoHtml;
  }

  static gerarStringPelaImagem(itens){
    return itens.map(Tela.obterCodigoHtml).join('');
  }

  static atualizarImagens(itens){
    const codigoHtml = Tela.gerarStringPelaImagem(itens);
    Tela.alterarConteudoHTML(codigoHtml);
  }

  static configurarBotaoJogar(funcaoOnClick){
    const btnJogar = document.getElementById(ID_BTN_JOGAR);
    btnJogar.onclick = funcaoOnClick;
  }

  static exibirPrincesas(nomeDaPrincesa, img){
    const elementosHtml = document.getElementsByName(nomeDaPrincesa);
    elementosHtml.forEach(item => (item.src = img))
  }

  static async exibirMensagem(sucesso = true){
    const elemento = document.getElementById(ID_MENSAGEM);
    
    if(sucesso){
      elemento.classList.remove(MENSAGENS.erro.classe);
      elemento.classList.add(MENSAGENS.sucesso.classe);
      elemento.innerText = MENSAGENS.sucesso.texto;
    }else{
      elemento.classList.remove(MENSAGENS.sucesso.classe);
      elemento.classList.add(MENSAGENS.erro.classe);
      elemento.innerText = MENSAGENS.erro.texto;
    }
    elemento.classList.remove(CLASSE_INVISIVEL);
    await util.timeout(1000)
    elemento.classList.add(CLASSE_INVISIVEL);
  }

  static configurarBotaoMostrarTudo(funcaoOnClick){
    const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR);
    btnMostrarTudo.onclick = funcaoOnClick;
  }
}
