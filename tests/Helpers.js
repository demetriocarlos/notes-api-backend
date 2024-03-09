
//const {app} = require('../index')
const {app} = require('../index')

const supertest = require('supertest')
const User = require('../models/User')

const api = supertest(app)


const initialNotes=[
    {
        content:'Aprendiendo fullStack js con midudev',
        important:true,
        date: new Date()
    },
    {
        content:'sigjeme en midudev',
        important:true,
        date: new Date()
    },
    {
        content:'gracias al',
        important:true,
        date: new Date()
    }
]

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        contents: response.body.map(note => note.content),
        response
    
    }
}

const getUsers = async () => {
    // recuperar todos los usuarios
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())
}

module.exports={ 
    api,
    initialNotes,
    getAllContentFromNotes,
    getUsers
}