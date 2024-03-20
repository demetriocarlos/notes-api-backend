//instalar npm install nodemon -D , pababer rapidamente los cambios
//const http = require('http')

require('dotenv').config()

require('./mongo')

const Sentry = require("@sentry/node");
const {ProfilingIntegration} = require('@sentry/profiling-node');

//import { ProfilingIntegration } from "@sentry/profiling-node";
//const ProfilingIntegration = require("@sentry/profiling-node");
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
const logger = require('./loggerMiddlewars')

const Note = require('./models/Note')
const NotFound = require('./middleware/NotFound')
const handleErrors = require('./middleware/handleErrors')
const userExtractor = require('./middleware/userExtractor')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')
const User = require('./models/User');
 

app.use(cors())
app.use(express.json())

app.use( '/images', express.static('images'))


Sentry.init({
        dsn: "https://e0f494a720e8c30be3a82587f1d95ffb@o4506826946904064.ingest.sentry.io/4506827527815168",
        integrations: [
          // enable HTTP calls tracing
          new Sentry.Integrations.Http({ tracing: true }),
          // enable Express.js middleware tracing
          new Sentry.Integrations.Express({ app }),
          new ProfilingIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set sampling rate for profiling - this is relative to tracesSampleRate
        profilesSampleRate: 1.0,
      });

 app.use(Sentry.Handlers.requestHandler());

        // TracingHandler creates a trace for every incoming request
   app.use(Sentry.Handlers.tracingHandler());


app.use(logger)

 
 

/*const app = http.createServer((request,response) =>{ 'request'  
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(note))
})
*/

app.get('/', (request,response) =>{
        response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', async (request,response,next) =>{
        //devolver las notas
        /*Note.find({}).then(notes => {
                response.json(notes)
        }).catch(err => next(err))
*/                                       //se va atraer la informacion del "user" ace referencia alo creado en "userSchema"
        const notes = await Note.find({}).populate('user',{
                username:1,
                name:1
        })
        response.json(notes)
        
})

app.get('/api/notes/:id', (request,response, next) =>{
        const { id } = request.params
        //encontrar lasnotas por el id
        Note.findById(id).then(note =>{
                if(note){
                        response.json(note)
                     }else{
                        response.status(404).end()
                     }
        }).catch(err => {
                next(err)
                 
        }) 
})


app.put('/api/notes/:id', userExtractor ,(request,response, next) =>{
        const {id} = request.params

        const note = request.body

        const newNoteInfo = {
                content: note.content,
                important: note.important
        }
        //actualizar resultado utilizando la id  
        Note.findByIdAndUpdate(id, newNoteInfo,{new: true})
                .then(result => {
                        response.json(result)
                })
          
         

})


app.delete('/api/notes/:id',  userExtractor ,async (request,response, next) =>{
        const {id} = request.params

        await Note.findByIdAndDelete(id)
        response.status(204).end()

          

})



app.post('/api/notes',  userExtractor  ,async(request, response,next) =>{
        const {
                content, 
                important = false
                //userId
        } = request.body

        //
        
        
           
        // sacar userId de request

        const {userId} = request
                
        //recuperamos el usuario
        const user= await User.findById(userId)

        if(!content){
             return response.status(400).json({
                error:'note.content is missing'
             })
        }

        const newNote = new Note({
                content,
                date: new Date() ,
                important,
                user:user._id
                
        })

         /*
        newNote.save().then(savedNote => {
                response.json(savedNote)
        }).catch(err => next(err))
        */

        try{
                const savedNote = await newNote.save()
                //con el usuario accedemos note y recuperar las notas y añadir 1 "savedNote"
                user.notes = user.notes.concat(savedNote._id)
                //guardar los cambios del usuario
                await user.save()

                response.json(savedNote)
        }catch (error){
                next(error)
        }
         
        
});

        
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)


        app.use(NotFound )
        app.use(Sentry.Handlers.errorHandler());
        app.use(handleErrors)

//const PORT = 3001;
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = {app,server}