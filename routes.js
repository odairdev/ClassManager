const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

//Teachers Routes
routes.get('/', function(req, res) {
    return res.redirect('/professores')
})
routes.get('/professores', teachers.index)
routes.get('/professores/create', function(req, res) {
    return res.render('professores/create')
})
routes.post('/professores', teachers.post)
routes.get('/professores/:id', teachers.show)
routes.get('/professores/:id/edit', teachers.edit)
routes.put('/professores', teachers.put)
routes.delete('/professores', teachers.delete)

//Students Routes
routes.get('/estudantes', students.index)
routes.get('/estudantes/create', function(req, res) {
    return res.render('estudantes/create')
})
routes.post('/estudantes', students.post)
routes.get('/estudantes/:id', students.show)
routes.get('/estudantes/:id/edit', students.edit)
routes.put('/estudantes', students.put)
routes.delete('/estudantes', students.delete)

module.exports = routes