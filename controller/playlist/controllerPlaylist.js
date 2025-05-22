/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de playlist
  * Data: 17/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const playlistDAO = require('../../model/dao/playlist.js')
const { json } = require('body-parser')

//Import das controlleres para criar as relações com a playlist
const controllerUsuario = require('../usuario/controllerUsuario.js')

//Import das controlleres para criar as relações com a playlist
const controllerPlaylistMusica = require('../playlist/controllerPlaylistMusica.js')

//funcao pra inserir um novo playlist
const inserirPlaylist = async function(playlist, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                playlist.titulo == undefined || playlist.titulo == '' || playlist.titulo == null || playlist.titulo.length > 50 ||
                playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null || playlist.descricao.length > 100 ||
                playlist.id_usuario == undefined || playlist.id_usuario == '' ||
                playlist.musicas == undefined ||  typeof(playlist.musicas) !== 'object'
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let musicas = playlist.musicas
                delete playlist.musicas
                let resultPlaylist = await playlistDAO.insertPlaylist(playlist)
                for(id_music of musicas){
                    let relacao = {id_musica: id_music, id_playlist: resultPlaylist.id}
                    let insert = controllerPlaylistMusica.inserirPlaylist(relacao, contentType)
                    // console.log(insert);
                }

                if(resultPlaylist)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
 // funcao pra tratar o retorno de uma lista de playlist do dao
const listarPlaylist = async function(){
    try {

        // objeto do tipo array pra utilizar no foreach pra carregar os dados da playlist e do usuario
        const arrayPlaylist = []

        // objeto json
        let dadosPlaylist = {}

        //chamar a função que retorna as musicas
        let resultPlaylist = await playlistDAO.selectAllPlaylist()

        if(resultPlaylist != false || typeof(resultPlaylist) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Playlists
            if(resultPlaylist.length > 0){
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.item = resultPlaylist.length
                
                // for of pra trabalhar com requisição async e await
                for(itemPlaylist of resultPlaylist){
                    // busca os dados do usuarui na controller usuario utilizando o id do usuario (chave estrangeira)
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                    let dadosPlaylistMusica = await controllerPlaylistMusica.buscarMusicaPorPlaylist(itemPlaylist.id)

                    //adicionando um atributo "usuario" no json de playlists
                    itemPlaylist.usuario = dadosUsuario.usuario
                    itemPlaylist.musicas = dadosPlaylistMusica.musicas

                    //remove o atributo id_usuario do json de playlist, pois ja tem o id dentro dos dados de usuario
                    delete itemPlaylist.id_usuario

                    //adiciona o json do filme, agoa com os dados de usuario em um array
                    arrayPlaylist.push(itemPlaylist)
                }
                //adiciona o novo array de playlist o json pra retornar ao app
                dadosPlaylist.playlist = arrayPlaylist

                return dadosPlaylist
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar um Playlist pelo ID
const buscarPlaylist = async function(id){
    try {

        let arrayPlaylist = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosPlaylist = {}
            let resultPlaylist = await playlistDAO.selectByIdPlaylist(id)

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                    dadosPlaylist.status = true
                    dadosPlaylist.status_code = 200
                    
                // for of pra trabalhar com requisição async e await
                for(itemPlaylist of resultPlaylist){
                    // busca os dados do usuarui na controller usuario utilizando o id do usuario (chave estrangeira)
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)

                    //adicionando um atributo "usuario" no json de playlists
                    itemPlaylist.usuario = dadosUsuario.usuario

                    //remove o atributo id_usuario do json de playlist, pois ja tem o id dentro dos dados de usuario
                    delete itemPlaylist.id_usuario

                    //adiciona o json do filme, agoa com os dados de usuario em um array
                    arrayPlaylist.push(itemPlaylist)
                }
                //adiciona o novo array de playlist o json pra retornar ao app
                dadosPlaylist.playlist = arrayPlaylist

                return dadosPlaylist
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar um playlist existente
const atualizarPlaylist = async function(playlist, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                playlist.titulo == undefined || playlist.titulo == '' || playlist.titulo == null || playlist.titulo.length > 100 ||
                playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null || playlist.descricao.length > 100 ||
                playlist.id_usuario == undefined || playlist.id_usuario == '' ||
                playlist.musicas == undefined ||  typeof(playlist.musicas) !== 'object' ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let musicas = playlist.musicas
                delete playlist.musicas
                let resultPlaylist = await buscarPlaylist(id)

                if(resultPlaylist.status_code == 200){
                    //update
                    playlist.id = id //adiciona o atributo id no json e e coloca o id da música que chegou na controller
                    let result = await playlistDAO.updatePlaylist(playlist)
                    for(id_music of musicas){
                        let relacao = {id_musica: id_music, id_playlist: id}
                        let insert = controllerPlaylistMusica.inserirPlaylist(relacao, contentType)
                        console.log(insert);
                    }

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultPlaylist.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma playlist existente
const excluirPlaylist = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            // validar se o ID existe
            let resultPlaylist = await buscarPlaylist(id)

            if(resultPlaylist.status_code == 200){
                // delete do user
                let result = await playlistDAO.deletePlaylist(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultPlaylist.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirPlaylist,
    listarPlaylist,
    buscarPlaylist,
    atualizarPlaylist,
    excluirPlaylist
}