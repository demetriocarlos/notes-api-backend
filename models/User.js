
const {model,Schema}= require('mongoose')


const userSchema = new Schema({
    username:String,
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


const User = model('User', userSchema)

module.exports= User