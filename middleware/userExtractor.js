 
 
 const { request, response } = require("express");
 const jwt = require('jsonwebtoken')
 
 
 module.exports = (request,response,next)=>{
             // Recupera la cabecera 'authorization' de la solicitud
         const authorization = request.get('authorization')
         let token =  ''
 
 
         // Si la cabecera 'authorization' existe y comienza con 'Bearer', extrae el token
         if(authorization && authorization.toLowerCase().startsWith('bearer')){
                 token = authorization.substring(7)
         }
 
          
         // Decodifica el token JWT utilizando la palabra secreta para obtener la información decodificada
         const decodedToken= jwt.verify(token,process.env.SECRET) 
 
 
          // Si el token está ausente o es inválido, devuelve un error de autorización
         if(!token || !decodedToken.id){
                 return response.status(401).json({ error: 'token missing or invalid'})
         }
 
          // Extrae el ID de usuario del token decodificado
         const {id: userId} = decodedToken;
         
 
         // Añade el ID de usuario a la solicitud para su posterior uso en las rutas protegidas
         request.userId= userId
 
 
         next()
            //     
 }