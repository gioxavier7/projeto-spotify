/**
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/02/2025
 * Dev: giovanna
 * Versões: 1.0      
 */

/*
      Observações: 
        Para criar a API precisamos instalar:
            ->    express           npm install express --save
            ->    cors              npm install cors --save
            ->    body-parser       npm install body-parser --save
  
        Para criar a conexão com o banco de dados MYSQL precisamos instalar:
            ->    prisma            npm install prisma --save
            ->    prisma/client     npm install @prisma/client --save
        
        Após a instalação do prisma é necessário instalar:
            ->    npx prisma init

        Para sincronizar o prisma com o banco de dados podemos utilizar:
            ->    npx prisma migrate dev
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//import das controllers do projeto
const controllerMusica = require('./controller/musica/controllerMusica.js')

//criando formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//criando o objeto app para criar a API
const app = express()

//configuração do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formao de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de musicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    //chama a função para retornar uma lista de musicas
    let result = await controllerMusica.listarMusica()

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})