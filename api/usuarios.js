const esClient = require('./../elastic-search-client')

const url = 'https://jsonplaceholder.typicode.com/users'

const getWebsites = (usuarios) => usuarios.map(u => u.website)

const getUsuariosOrdenadosNome = (usuarios) =>
  usuarios.sort((x, y) => x.name > y.name ? 1 : 0).map(u => {
    let usuarioOrdenado = {
      'nome': u.name,
      'email': u.email,
      'empresa': u.company.name
    }
    return usuarioOrdenado
  })

const getUsuariosMorandoEmSuite = (usuarios) => usuarios
  .filter(u => u.address.suite.toLowerCase().includes('suite'))
  .map(u => u.username)

module.exports = {
  Rest: require('express')().get('/', (req, res) => {
    require('request')(url, { json: true }, (err, response, usuarios) => {

      if (err) res.status(500).send(err.message)
      const jsonResposta = {
        websites: getWebsites(usuarios),
        nomeEmailEmpresa: getUsuariosOrdenadosNome(usuarios),
        usuariosMorandoEmSuite: getUsuariosMorandoEmSuite(usuarios)
      }
      esClient.salvarConsultar(jsonResposta)
      res.send(jsonResposta)

    })
  })
}
