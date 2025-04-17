/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de usuário
  * Data: 17/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const usuarioDAO = require('../../model/dao/usuario.js')
const { json } = require('body-parser')

//funcao pra inserir um novo usuário
const inserirUsuario = async function(usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                usuario.nome == undefined || usuario.nome == '' || usuario.nome == null || usuario.nome.length > 50 ||
                usuario.username == undefined || usuario.username == '' || usuario.username == null || usuario.username.length > 45 ||
                usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length > 75 ||
                usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length > 8
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS
            }else{
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if(resultUsuario)
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

module.exports = {
    inserirUsuario
}