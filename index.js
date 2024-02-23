//instalar npm install nodemon -D , pababer rapidamente los cambios
//const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddlewars')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [  
        {
            "id":1,
            "content":"Me tengo que escribir ",
            "date":"2019-5-30T17:30:31.098z",
            "important":true
        },
        {
                 "id":2,
                "content":"tengo que estudiar las clases fullstack ",
                "date":"2019-5-30T17:30:31.098z",
                "important":false
        },
        {
                "id":3,
                "content":"repasar los retos de js de midudev ",
                "date":"2019-5-30T17:30:31.098z",
                "important":true
        }
]

/*const app = http.createServer((request,response) =>{ 'request'  
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(note))
})
*/

app.get('/', (request,response) =>{
        response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request,response) =>{
        
        response.json(notes)
})

app.get('/api/notes/:id', (request,response) =>{
        const id = Number(request.params.id)
        const note = notes.find(note => note.id == id)

        if(note){
           response.json(note)
        }else{
           response.status(404).end()
        }
})


app.delete('/api/notes/:id', (request,response) =>{
        const id = Number(request.params.id)
        notes = notes.filter(note => note.id != id)
        response.status(204).end()
})

app.post('/api/notes',(request, response) =>{
        const note = request.body
        console.log(note)
        //en caso de error
        if(!note || !note.content){
             return response.status(400).json({
                error:'note.content is missing'
             })
        }
        //obtener el id
        const ids = notes.map(note=> note.id)
        const maxId = Math.max(...ids)

        const newNote ={
                id: maxId + 1,
                content:note.content,
                important: typeof note.important != "undefined" ? note.important: false,
                date: new Date().toISOString()
        }
                //concatenando notes con nuevas notas
        notes = [...notes, newNote]

        response.status(201).json(newNote)
});

        app.use((request,response) =>{
                console.log(response.path)
                response.status(404).json({
                        error:'not fount'
                })
        })
const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});