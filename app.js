const cluster = require('cluster')
const common = require('./common')

const prepararServidor = () => {

  const app = common.criarAppComDiretorioPublico('public')
  app.on('error', (appErr, appCtx) => {
    console.error('Erro:', appErr.stack)
    console.error('URL:', appCtx.req.url)
    console.error('HEADERS:', appCtx.req.headers)
  })

  const dependenciasEstaticas = [
    { nome: 'angular', possuiDist: false },
    { nome: 'bootstrap', possuiDist: true },
    { nome: 'jquery', possuiDist: true },
    { nome: 'popper.js', possuiDist: true } ]

  dependenciasEstaticas.forEach((dpEstc) =>
    common.adicionarConteudoEstatico(app, dpEstc.nome, dpEstc.possuiDist))

  common.listarModulosProjeto()
      .filter(endpoint => Object.keys(require(endpoint)).includes('Rest'))
      .forEach((allinone) => {
    let prefixoEndpoint = allinone.substring(1, allinone.length)
    //console.log(`Montando endpoint '${prefixoEndpoint}' com o JS ${allinone}`)
    app.use(prefixoEndpoint, require(allinone).Rest)
  })

  const server = require('http').createServer(app)
  server.listen(process.env.PORT, () =>
    console.log(
      `Aplicação iniciada na porta ${process.env.PORT} [Worker: ${process.pid}]...`
    )
  )
}

let workers = []
const prepararWorkers = () => {
  const eventoOnMessageWorker = (mensagem) => console.log(mensagem)
  for(let i = 0; i < require('os').cpus().length; i++) {
    workers.push(cluster.fork())
    workers[i].on('message', eventoOnMessageWorker)
  }
  cluster.on('online', function(worker) {
    console.log(`Worker ${worker.process.pid} está pronto!`)
  })
  cluster.on('exit', function(worker, code, signal) {
    console.log(`Worker ${worker.process.pid} foi encerrado [${code}]: ${signal}`)
    console.log('Iniciando novo worker...')
    workers.push(cluster.fork())
    workers[workers.length - 1].on('message', eventoOnMessageWorker)
  });
}

if(cluster.isMaster) prepararWorkers()
else prepararServidor()
