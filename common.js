const express = require('express')
const fs = require('fs')

module.exports = class {

  constructor() { }

  static criarAppComDiretorioPublico(diretorio) {
    return require('express')()
      .disable('x-powered-by')
      .use(express.static(diretorio))
  }

  static listarModulosProjeto() {
    let listaArquivos = []
    const recursivamente = (diretorio, listaArquivos) => {
      fs.readdirSync(diretorio).filter(
          arquivo => !diretorio.startsWith('./node_modules') &&
                     !diretorio.startsWith('./.heroku') &&
                     !diretorio.startsWith('./.git')
        ).forEach((arquivo) => {
        const caminhoTemp = `${diretorio}/${arquivo}`
        if (fs.statSync(caminhoTemp).isDirectory())
          listaArquivos =
            recursivamente(caminhoTemp, listaArquivos)
        else {
          if(arquivo.endsWith('.js'))
            listaArquivos.push(caminhoTemp)
        }
      })
      return listaArquivos
    }
    return recursivamente('.', listaArquivos)
      .map(endpoint => endpoint.substring(0, endpoint.length - 3))
  }

  static adicionarConteudoEstatico(app, dependencia, possuiDist) {
    const prefixo = fs.existsSync('./node_modules') ?
      './node_modules' :
      './.heroku/node/lib/node_modules/npm/node_modules'
    app.use(`/${dependencia}`, express.static(
      `${prefixo}/${dependencia}${possuiDist ? '/dist' : ''}`))
  }

}
