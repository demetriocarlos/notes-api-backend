
const {model,Schema}= require('mongoose')
//es quemas de las notas
const noteSchema = new Schema({
    content:String,
    date:Date,
    important:Boolean,
    
    //el valor almacenado en este campo es el ID de un documento en la colección 'User'.
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
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