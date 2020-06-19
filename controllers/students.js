const fs = require('fs')
const data = require('../data.json')
const { age, grade, date } = require('../utils')

exports.index = function(req, res) {
    res.render('estudantes/index', {students: data.students})
}

//Create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please Fill out all fields.')
        }
    }

    let {
        avatar_url, 
        name, 
        birth, 
        email,
        carga
    } = req.body

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    if (lastStudent) {id = lastStudent.id + 1}

    data.students.push({
        id,
        avatar_url,
        name,
        email, 
        birth,
        ano: grade(req.body.ano), 
        carga
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) { res.send('WriteFile error.')}
    })
    res.redirect('/estudantes')
}

//Read
exports.show = function (req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found.')

    const student = {
        ...foundStudent,
        age : age(foundStudent.birth),
    }

    res.render('estudantes/show', { student } )
}

exports.edit = function(req, res) {
    const { id } = req.params

    let foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if (!foundStudent) {
        return res.send("Student not found.")
    }

    let student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }

    res.render('estudantes/edit', {student})
}

//Update
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if ( id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) {return res.send('Student not found.')}

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        ano: grade(req.body.ano),
        id: Number(req.body.id)
    }
    
    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) {return res.send('WriteFile error.')}

        return res.redirect(`/estudantes/${id}`)
    })
}

//Delete
exports.delete = function(req, res) {
    const { id } = req.body

    let filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) {return res.send('WriteFile error.')}

        return res.redirect('/estudantes')
    })
}