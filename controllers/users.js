
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
 
const User = require('../models/User')


usersRouter.post('/', async (request,response) => {
    const {body} = request
    const {username,name, password}= body

    //nivel de incriptacion
    const saltRounds =10
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, saltRounds)
     //instancia del nuevo usuario
    const user = new User({
        username,
        name,
        passwordHash
    })
    //guarda el usuario
    const savedUser = await user.save()
    //si se a creado el usuario correctamente debe responder con un 201
    response.status(201).json(savedUser)
})

module.exports = usersRouter