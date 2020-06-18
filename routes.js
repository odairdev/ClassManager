const express = require('express')
const routes = express.Router()
const teacher = require('./teacher')

routes.get('/', function(req, res) {
    return res.redirect('/professores')
})

routes.get('/professores', teacher.index)

routes.get('/professores/create', function(req, res) {
    return res.render('professores/create')
})

routes.post('/professores', teacher.post)

routes.get('/professores/:id', teacher.show)

routes.get('/professores/:id/edit', teacher.edit)

routes.put('/professores', teacher.put)

routes.delete('/professores', teacher.delete)

module.exports = routes