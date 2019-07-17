const elasticSearchClient = new require('elasticsearch').Client({
  host: process.env.URL_ES,
  log: 'info'
})

const index = {
  index: 'usuarios'
}

elasticSearchClient.indices.exists(index,
  (errCheck, indexCheck, statusCheck) => {
  if (!index) {
    elasticSearchClient.indices.create(index,
        (errCreate, indexCreate, statusCreate) => {
      console.log(`Índice ${index.index} criado com sucesso no ElasticSearch!`)
    })
  }
})

module.exports = class {

  constructor() { }

  static salvarConsultar(consulta) {
    elasticSearchClient.index({
      index: index.index,
      body: consulta
    }, function(err, resp, status) {
      console.log(resp)
    })
  }

}
