const { age, grade, date } = require('../../lib/utils')
const Student  = require('../models/student')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        const offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    page,
                    total: Math.ceil(students[0].total / limit)
                }

                students.forEach(student => {
                    student.grade = grade(student.grade)
                });
    
                res.render('students/index', { students, filter, pagination })
            }
        }

        Student.paginate(params)
    },

    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) res.send("Student not found")

            student.grade = grade(student.grade)
            student.age = age(student.birth)

            res.render('students/show', { student })
        })
    },

    create(req, res) {
        Student.teacherSelectOptions(function(options) {
            res.render('students/create', { teacherOptions: options})
        })
    },

    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) res.send("Student not found")

            student.birth = date(student.birth).iso
            
            Student.teacherSelectOptions(function(options) {
                res.render(`students/edit`, { student, teacherOptions: options })
            })
            
        })
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