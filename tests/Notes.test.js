const mongoose =require('mongoose')
//const supertest = require('supertest')
const {server} = require('../index')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./Helpers')
//const api = supertest(app)

 


beforeEach(async () => {
    await Note.deleteMany({})
    //console.log('beforeEach')

    //parallel
    /*
    const noteObjects = initialNotes.map(note => new Note(note))
    const promises = noteObjects.map(note => note.save())
    await Promise.all(promises)
    */

    //sequental
    for(const note of initialNotes){
        const noteObject = new Note(note)
        await noteObject.save()
    }
})

describe('GET all notes', () =>{
        
    test('notes are returned as json', async () =>{
        //console.log('first test')
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
      
    //Comprueba que el número de notas devueltas en la respuesta coincide con la cantidad de notas iniciales.
    test('there are two notes', async () =>{
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)
    })

    //Verifica que entre los contenidos de las notas devueltas en la respuesta, se encuentra el texto 'Aprendiendo fullStack js con midudev'.
    test('the first note is about midudev', async () => {
        /*const response = await api.get('/api/notes')
        const contents = response.body.map(note => note.content)
    */
            const {contents,
                //response
            } = await getAllContentFromNotes()
    
        expect(contents).toContain('Aprendiendo fullStack js con midudev')
     })

})


 describe(' create a note', () =>{
    //Verifica que sea posible crear una nueva nota enviando una solicitud POST
    test('is possible with a valid note', async () => {
        const newNote = {
            content:'Proximamente async/await',
            important:true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
            const {contents,response} = await getAllContentFromNotes()
    
        /*const response = await api.get('/api/notes')
        const contents = response.body.map(note => note.content)
    */
        expect(response.body).toHaveLength(initialNotes.length + 1)
        expect(contents).toContain(newNote.content)
     })
    
     test('is not possible with an invalid note', async () => {
        const newNote = {
            
            important:true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
             
        const response = await api.get('/api/notes')
         
        expect(response.body).toHaveLength(initialNotes.length )
         
     })
    
 })

 
//Esta prueba verifica que sea posible eliminar una nota existente. 
 test('a note can be deleted', async () => {
    const {response:firstResponse} = await  getAllContentFromNotes()
    const {body: notes}= firstResponse
    const noteToDelete= notes[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
    
    const {contents, response:secondRespose} = await getAllContentFromNotes()
    expect(secondRespose.body).toHaveLength(initialNotes.length - 1)

    expect(contents).not.toContain(noteToDelete.content)
 })


//Esta prueba verifica que no sea posible eliminar una nota que no existe.
 test('a note that do not exist can not be deleted', async () => {
    
      await api
        .delete(`/api/notes/1234`)
        .expect(400)
    
     
        
    const {response} = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)


     
    //expect(contents).not.toContain(noteToDelete.content)
 })



// hook se va ajecutar una ves terminen todos los test
afterAll(() => {
    mongoose.connection.close()
    server.close()
})



                                //--detectar tiradores abiertos
//en package.json, script, test --detectOpenHandles 



//datacamp