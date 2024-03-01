
const mongoose=require('mongoose')
 

const connectionString =process.env.MONGO_DB_URI  

// conexion a mongodb
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useFindAndModify:false,
    //useCreateIndex:true
})
    .then(() =>{
        console.log('database connect')
    }).catch(err =>{
        console.log(err)
    })



    //cuando alla un error desconectar ala base de datos
    process.on('uncaughtException', () => {
        mongoose.Collection.disconnect()
    })
    
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
    