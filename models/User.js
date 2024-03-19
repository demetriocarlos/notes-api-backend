
const uniqueValidator = require('mongoose-unique-validator')
const {model,Schema}= require('mongoose')

console.log('aaaa')
const userSchema = new Schema({
    //lo que indica que el valor unico en la coleccion de usuarios
    username: {
       type: String,
       unique:true  // Se especifica que el valor debe ser único
    },


    name:String,
    passwordHash:String,

    //el valor almacenado en este campo es el ID de un documento en la colección 'Notes'.
    notes:[{
        type:Schema.Types.ObjectId,
        //referencia ala base Note
        ref:'Note'
    }]
})


//debolviendo la respuesta con las siguientes espesificaciones
userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})

//aplicar el unibalidator
userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports= User