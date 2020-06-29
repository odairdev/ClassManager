const { age, grade, date } = require('../../lib/utils')
const Student  = require('../models/student')

module.exports = {
    index(req, res) {
        Student.all(function(students) {
            res.render('students/index', { students })
        })
    },

    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) res.send("Student not found")

            student.grade = grade(student.grade)
            student.age = age(student.birth)

            res.render('students/show', { student })
        })
    },

    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) res.send("Student not found")

            student.birth = date(student.birth).iso

            res.render(`students/edit`, { student })
        })
    },

    create(req, res) {
        return res.render('students/create')
    },

    post(req, res) {
        Student.create(req.body, function(student) {
            res.redirect(`/students/${student.id}`)
        })

    },

    put(req, res) {
        Student.update(req.body, function() {
            res.redirect(`/students/${req.body.id}`)
        })
    },

    delete(req, res) {
        Student.delete(req.body.id, function() {
            res.redirect('/students')
        })
    }
}