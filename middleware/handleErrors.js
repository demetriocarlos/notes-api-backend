const { response } = require("express")

const ERROR_HANDLERS = {
    // Manejador de errores para cuando ocurre un error de conversión (por ejemplo, al convertir un tipo de datos)
    CastError: response =>
       response.status(400).send({error:'id used is malformed'}),

     // Manejador de errores para cuando ocurre un error de validación (por ejemplo, al validar datos en un esquema)
    ValidationError: (response,{message}) =>
        response.status(409).send({error: message}),


    // Manejador de errores para cuando ocurre un error relacionado con el token JWT (por ejemplo, token faltante o inválido)
    JsonWebTokenError: ( response) =>
        response.status(401).json({error: 'token missing or invalid'}),
    

    //// Manejador de errores para cuando ocurre un error relacionado con la expiración del token JWT
    TokenExpirerError: ( response) =>
        response.status(401).json({error: 'token  expired'}),
    
    // Manejador de errores por defecto para otros tipos de errores no especificados anteriormente
    defaultError: response => response.status(500).end()

}

  

module.exports=( error,request,response,next) =>{
    console.error(error.name)
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(response, error)
}