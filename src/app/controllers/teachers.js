const { age, graduation, date } = require('../../lib/utils')
const Teacher = require('../models/teacher')

module.exports = {
    index(req, res) {
        const { filter } = req.query

        

        if (filter) {
            Teacher.findBy(filter, function(teachers) {
                let teacherSubjectsSplited = []

                for (teacher of teachers) {
                    const tc = {
                        ...teacher,
                        subjects_taught: teacher.subjects_taught.split(',')
                    }

                    teacherSubjectsSplited.push(tc)
                }

                res.render('teachers/index', { teachers: teacherSubjectsSplited, filter })
            })
        } else {
            Teacher.all(function(teachers) {

                let teacherSubjectsSplited = []
    
                for (teacher of teachers) {
                    const tc = {
                        ...teacher,
                        subjects_taught: teacher.subjects_taught.split(',')
                    }
    
                    teacherSubjectsSplited.push(tc)
                }
    
                res.render('teachers/index', { teachers: teacherSubjectsSplited })
            })
        }
    },

    show(req, res) {
        Teacher.find(req.params.id, function(teacher) {

            teacher.subjects_taught = teacher.subjects_taught.split(',')
            teacher.age = age(teacher.birth)
            teacher.created_at = date(teacher.created_at).format

            res.render('teachers/show', { teacher })
        })
    },

    edit(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) res.send("Teacher not found.")

            teacher.birth = date(teacher.birth).iso

            res.render('teachers/edit', { teacher })
        })
    },

    create(req, res) {
        return res.render('teachers/create')
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please Fill out all fields.')
            }
        }

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })

    },

    put(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") res.send("Please fill out all fields.")
        }

        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },

    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            res.redirect(`/teachers`)
        })
    }
    
}