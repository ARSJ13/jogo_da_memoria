function onLoad(){

  const dependencias = {
    tela: Tela,
    util: Util
  }

  const logica = new Logica(dependencias)
  logica.inicializar();
}
window.onload = onLoad;