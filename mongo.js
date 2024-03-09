
const mongoose=require('mongoose')
 
const {MONGO_DB_URI,MONGO_DB_URI_TEST,NODE_ENV}=process.env

const connectionString = NODE_ENV === 'test' 
       ? MONGO_DB_URI_TEST
       : MONGO_DB_URI

//const connectionString =process.env.MONGO_DB_URI  
// conexion a mongodb
mongoose.connect( connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
        console.log('database connect')
    }).catch(err =>{
        console.log(err)
    })



    //cuando alla un error desconectar ala base de datos
    process.on('uncaughtException', () => {
        mongoose.connection.disconnect()
    })
    //mongoose.Collection.disconnect()
/*
const noteSchema = new Schema({
    content:String,
    date:Date,
    important:Boolean
})


const Note =model('Note', noteSchema)
*/


/*
//encontrar notas
Note.find({}).then(result => {
    console.log(result)
    mongoose.Connection.close()
})
*/

/*
// crear nota
const note = new Note({
    content:'MongoDB es increible,',
    date: new Date(),
    important:true
})

//guardar nota creada
note.save()
    .then(result =>{
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err =>{
        console.log(err)
    })
*/
    