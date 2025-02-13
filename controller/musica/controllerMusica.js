/**
 * Objetivo: Controller responsável pela manipilação do CRUD de dados de música
 * Data: 13/02/2025
 * Dev: Giovanna
 * Versão: 1.0
 */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//função para inserir uma nova música
const inserirMusica = async function(musica){
    if (musica.nome == undefined || musica.nome == '' || musica.nome == null || musica.nome.length > 80 ||
        musica.link == undefined || musica.link == '' || musica.link == null || musica.link.length > 200 ||
        musica.duracao == undefined || musica.duracao == '' || musica.duracao == null || musica.duracao.length > 5 ||
        musica.data_lancamento == undefined || musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
        musica.foto_capa == undefined || musica.foto_capa.length > 200 ||
        musica.letra == undefined
    ){
        return MESSAGE.ERROR_REQUIRE_FIELDS
    }
}

//função para atualizar uma música existente
const atualizarMusica = async function(){

}

//função para excluir uma música existente
const excluirMusica = async function(){

}

//função para retornar todas as música
const listarMusica = async function(){

}

//função para listar uma música pelo ID
const buscarMusica = async function(){

}