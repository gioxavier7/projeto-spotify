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
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')
const controllerArtista = require('./controller/artista/controllerArtista.js')
const controllerBanda = require('./controller/banda/controllerBanda.js')
const controllerPlano = require('./controller/plano/controllerPlano.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerTipoPagamento = require('./controller/tipoPagamento/controllerTipoPagamento.js')
const controllerDataVigencia = require('./controller/data_vigencia/controllerDataVigencia.js')


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

//endpoint para buscar uma música pelo id
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let idMusica = request.params.id

    let result = await controllerMusica.buscarMusica(idMusica)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para deletar uma musica
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    let idMusica = request.params.id

    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})

//endpoint pr atualizar uma musica
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idMusica = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir um usuario
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de usuarios
app.get('/v1/controle-musicas/usuario', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um usuario pelo id
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let idUsuario = request.params.id

    let result = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um usuário
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idUsuario = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um usuário
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir um artista
app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de artista
app.get('/v1/controle-musicas/artista', cors(), async function(request, response){

    //chama a função para retornar uma lista de artista
    let result = await controllerArtista.listarArtista()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um artista pelo id
app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response){

    let idArtista = request.params.id

    let result = await controllerArtista.buscarArtista(idArtista)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um artista
app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idArtista = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerArtista.atualizarArtista(dadosBody, idArtista, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um artista
app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response){
    let idArtista = request.params.id

    let result = await controllerArtista.excluirArtista(idArtista)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir uma banda
app.post('/v1/controle-musicas/banda', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerBanda.inserirBanda(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de banda
app.get('/v1/controle-musicas/banda', cors(), async function(request, response){

    //chama a função para retornar uma lista de banda
    let result = await controllerBanda.listarBanda()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um banda pelo id
app.get('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let idBanda = request.params.id

    let result = await controllerBanda.buscarBanda(idBanda)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um banda
app.put('/v1/controle-musicas/banda/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idBanda = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerBanda.atualizarBanda(dadosBody, idBanda, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um banda
app.delete('/v1/controle-musicas/banda/:id', cors(), async function(request, response){
    let idBanda = request.params.id

    let result = await controllerBanda.excluirBanda(idBanda)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir um plano
app.post('/v1/controle-musicas/plano', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerPlano.inserirPlano(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de plano
app.get('/v1/controle-musicas/plano', cors(), async function(request, response){

    //chama a função para retornar uma lista de plano
    let result = await controllerPlano.listarPlano()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um plano pelo id
app.get('/v1/controle-musicas/plano/:id', cors(), async function(request, response){

    let idPlano = request.params.id

    let result = await controllerPlano.buscarPlano(idPlano)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um Plano
app.put('/v1/controle-musicas/plano/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idPlano = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerPlano.atualizarPlano(dadosBody, idPlano, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um Plano
app.delete('/v1/controle-musicas/plano/:id', cors(), async function(request, response){
    let idPlano = request.params.id

    let result = await controllerPlano.excluirPlano(idPlano)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir um genero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de genero
app.get('/v1/controle-musicas/genero', cors(), async function(request, response){

    //chama a função para retornar uma lista de genero
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um genero pelo id
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let result = await controllerGenero.buscarGenero(idGenero)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um Genero
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idGenero = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um Genero
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let result = await controllerGenero.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir um tipo pagamento
app.post('/v1/controle-musicas/tipo-pagamento', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerTipoPagamento.inserirTipoPagamento(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de TipoPagamento
app.get('/v1/controle-musicas/tipo-pagamento', cors(), async function(request, response){

    //chama a função para retornar uma lista de TipoPagamento
    let result = await controllerTipoPagamento.listarTipoPagamento()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um tipo pagamento pelo id
app.get('/v1/controle-musicas/tipo-pagamento/:id', cors(), async function(request, response){

    let idTipoPagamento = request.params.id

    let result = await controllerTipoPagamento.buscarTipoPagamento(idTipoPagamento)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um tipo pagamento
app.put('/v1/controle-musicas/tipo-pagamento/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idTipoPagamento = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerTipoPagamento.atualizarTipoPagamento(dadosBody, idTipoPagamento, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um tipo pagamento
app.delete('/v1/controle-musicas/tipo-pagamento/:id', cors(), async function(request, response){
    let idTipoPagamento = request.params.id

    let result = await controllerTipoPagamento.excluirTipoPagamento(idTipoPagamento)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para inserir uma data vigencia
app.post('/v1/controle-musicas/data-vigencia', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerDataVigencia.inserirDataVigencia(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de DataVigencia
app.get('/v1/controle-musicas/data-vigencia', cors(), async function(request, response){

    //chama a função para retornar uma lista de DataVigencia
    let result = await controllerDataVigencia.listarDataVigencia()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um DataVigencia pelo id
app.get('/v1/controle-musicas/data-vigencia/:id', cors(), async function(request, response){

    let idDataVigencia = request.params.id

    let result = await controllerDataVigencia.buscarDataVigencia(idDataVigencia)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um DataVigencia
app.put('/v1/controle-musicas/data-vigencia/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idDataVigencia = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerDataVigencia.atualizarDataVigencia(dadosBody, idDataVigencia, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um DataVigencia
app.delete('/v1/controle-musicas/data-vigencia/:id', cors(), async function(request, response){
    let idDataVigencia = request.params.id

    let result = await controllerDataVigencia.excluirDataVigencia(idDataVigencia)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})