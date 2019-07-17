#!/bin/bash

docker build -t desafio-mutant --build-arg PORTA_WEB_APP=8080 --build-arg URL_ELASTIC_SEARCH=localhost:9200 .
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.2.0
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.2.0
docker run -p 80:8080 desafio-mutant

curl localhost/api/usuarios/teste
