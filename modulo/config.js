/**
 * Objetivo: Arquivo de configuração do projeto onde teremos mensagens padronizadas, variáveis e constantes para o projeto
 * Data: 13/02/2025
 * Dev: Giovanna
 * Versão: 1.0 
 */

/**MENSAGENS DE STATUS CODE PARA A API
 *      MENSAGENS DE ERRO
 */
const ERROR_REQUIRE_FIELDS = {status: false, status_code: 400, message: 'Existem campos com preenchimento obrigatórios e não foram encaminhados.'}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Devido ao erro interno do servidor, não foi possível processar a requisição.'}

/**MENSAGENS DE STATUS CODE PARA A API
 *      MENSAGENS DE SUCESSO
 */

const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!'}

module.exports = {
    ERROR_REQUIRE_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM
}