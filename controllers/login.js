
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const { request, response } = require('express')

loginRouter.post('/', async (request,response) =>{
    const {body}= request
    const {username, password} = body
    
    // Busca un usuario en la base de datos por el nombre de usuario proporcionado
    const user = await User.findOne({username})


    // Comprueba si el usuario existe y si la contraseña proporcionada es correcta
    const passwordCorrect = user == null
        ? false
        :await bcrypt.compare(password, user.passwordHash)


        // Si el usuario no existe o la contraseña no es correcta, devuelve un error de autenticación
    if(!(user && passwordCorrect)){
        response.status(401).json({
            error:'invalid user or password'
        })
    }

    // Prepara los datos del usuario para ser incluidos en el token JWT
    const userForToken = {
         id: user._id,
        username:user.username
    }
             
    
    // Crea un token JWT usando los datos del usuario y una palabra secreta, con una duración de validez de 7 días
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        {   // su valides expira en siete dias
            expiresIn:60 * 60 * 24 * 7
        }
        )


    // Devuelve los datos del usuario y el token JWT como respuesta al cliente
    response.send({
        name:user.name,
        username:user.username,
        token
    })

})

module.exports = loginRouter











