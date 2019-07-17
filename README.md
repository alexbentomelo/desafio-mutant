# Desafio Mutant

Recebi o desafio abaixo:
```
> Sua tarefa é fazer um aplicativo que carregue a saida da URL https://jsonplaceholder.typicode.com/users, que retorna uma lista de usuário em JSON.

> Faça um programa que carregue a saída dessa URL e mostre os seguintes dados:

1. Os websites de todos os usuários
2. O Nome, email e a empresa em que trabalha (em ordem alfabética).
3. Mostrar todos os usuários que no endereço contem a palavra ```suite```
4. Salvar logs de todas interações no elasticsearch
5. EXTRA: Criar test unitário para validar os itens a cima.

Nos utilizamos as linguagens NodeJS e Scala, então vocẽ pode escolher uma destas para criar o programa.

Publique o código no Bitbucket e nos envie o link do mesmo.

> Sua configuração deve ser capaz de ser executado como abaixo:

1. Implantar uma máquina virtual. Para não gerar custos para você e para nós, use o `vagrant` com VirtualBox para provisionar sua instância.
2. Entregar o aplicativo usando o Docker e garantir que ele "sobreviva" nas reinicializações
```
Dadas circunstâncias, desenvolvi o app em Node utilizando `express` para o backend e o clássico `angularjs` para o front (com o `bootstrap`). As requisições foram feitas com o framework `request`, que converte a requisição em um promise.

# Variáveis de ambiente

A aplicacão precisa de DUAS variáveis do ambiente, sendo elas o `PORT` (porta HTTP utilizada) e o `URL_ES` (endereço do ElasticSearch), elas possuem valor padrão no Dockerfile, mas na aplicacão não.

# E o ElasticSearch?

É possível subir uma instância gratuitamente, mas é possível rodar ela pelo Docker com os dois comandos abaixo:
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.2.0
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.2.0
```
Com isso o nosso ElasticSearch vai rodar na versão `7.2.0` e no endereço `http://localhost:9200/`.

# Legal, quero rodar a aplicação no Docker, como faço?

Primeiro: tenha o Docker instalado. Segundo: Rode o comando abaixo:
```
docker build -t desafio-mutant --build-arg PORTA_WEB_APP=8080 --build-arg URL_ELASTIC_SEARCH=localhost:9200 .
```
E, por último, o comando abaixo:
```
docker run -p 80:8080 desafio-mutant
```
Após a mensagem que a aplicação iniciou, abra o seu navegador favorito e entre em `http://localhost` (sem porta mesmo).

# Testes unitários nada, né?
Não vi necessidade pois escrevi a aplicação sem uma camada Service, fiz tudo na Rest pela simplicidade das regras e tudo na mesma requisição.

# E cadê a instância do Vagrant rodando?
Não achei como fazê-lo, então subi no [Heroku](https:\\desafio-mutant-node.herokuapp.com), espero que seja válido.
O Bonsai Elastic Search foi utilizado nessa instância do Heroku.
