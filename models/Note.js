
const {model,Schema}= require('mongoose')
//es quemas de las notas
const noteSchema = new Schema({
    content:String,
    date:Date,
    important:Boolean
})

//debolviendo la respuesta con las siguientes espesificaciones
noteSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note =model('Note', noteSchema)

module.exports = Note