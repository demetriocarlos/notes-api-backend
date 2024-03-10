const bcrypt=require('bcrypt')
const User = require('../models/User')
const {api,getUsers} = require('./Helpers')
const mongoose = require('mongoose')
const {server} = require('../index')

describe.only('create a new user', () =>{
    // esto se va a ejecutar antes de cada test
    beforeEach(async () =>{
        await User.deleteMany({})

        const passwordHash= await bcrypt.hash('pswd',10)
        const user = new User({username:'miduroot',passwordHash})

        await user.save()
    },10000)   

    test('works as expected creating a fresh username', async() => {

         
         const userAtStart = await getUsers()

        const newUser = {
            username:'midudev',
            name:'migel',
            password:'twitch'  
        }       

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

             
            // recupera los usuarios que tenemos al final
             
            const usersAtEnd = await getUsers()
  
            //tiene quener la longitud de antes +1
            expect(usersAtEnd).toHaveLength(userAtStart.length + 1)
            //mapea los usuario
            const usernames = usersAtEnd.map(u => u.username)
            //esperamos que contenga el usario que sea creado
            expect(usernames).toContain(newUser.username)
    })


    test('creation fails with proper statuscode and message if username is already taken', async () => {
        
        //recuperamos los usuasios
        const userAtStart = await getUsers()

        const newUser = {
            username:'miduroot',
            name:'miguel',
            password: 'midutest'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.errors.username.message).toContain(' `username` to be unique')

            const usersAtEnd = await getUsers()
            expect(usersAtEnd).toHaveLength(userAtStart.length)



    })


    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})


