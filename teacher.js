const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

exports.index = function(req, res) {

    let teachers = []

    for (teacher of data.teachers) {
        const tc = {
            ...teacher,
            area: teacher.area.split(',')
        }
        teachers.push(tc)
    }

    res.render('professores/index', {teachers})
}

//Create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please Fill out all fields.')
        }
    }

    let {avatar_url, name, birth, grau, aula, area} = req.body

    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    birth = Date.parse(req.body.birth)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        grau,
        aula,
        area,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) { res.send('WriteFile error.')}
    })
    res.redirect('/professores')
}

//Read
exports.show = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found.')

    const teacher = {
        ...foundTeacher,
        grau: graduation(foundTeacher.grau),
        age : age(foundTeacher.birth),
        area : foundTeacher.area.split(","),
        created_at : new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    res.render('professores/show', { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params

    let foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if (!foundTeacher) {
        return res.send("Teacher not found.")
    }

    let teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    res.render('professores/edit', {teacher})
}

//Update
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if ( id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) {return res.send('Teacher not found.')}

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    
    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) {return res.send('WriteFile error.')}

        return res.redirect(`/professores/${id}`)
    })
}

//Delete
exports.delete = function(req, res) {
    const { id } = req.body

    let filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) {return res.send('WriteFile error.')}

        return res.redirect('/professores')
    })
}