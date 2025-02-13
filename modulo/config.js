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

module.exports = {
    ERROR_REQUIRE_FIELDS
}