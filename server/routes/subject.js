const express = require('express');
const consola = require('consola')
const mongoose = require('mongoose')
const app = express();

const Subject = require('../models/subject');


error = function(err) {
    consola.error(new Error(err))
        res.status(500).json({
            error: err
        })
}

app.get('/', async (req, res) => {
    const subjects = await Subject.find()
        .catch(err => error(err))
    res.status(200).json(subjects)  
})

app.get('/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id)
        .catch(err => error(err))
    res.status(200).json(subject)
});

app.post('/', async (req, res) => {
    const subject = new Subject({
        name: req.body.name, 
        room: req.body.room,
        teacher: req.body.teacher
    })   

    await subject.save()
        .then(async () => {
            res.status(200).send(subject)
        })
        .catch(err => error(err))
});


app.delete('/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id)
        .catch(err => error(err))
    
    await subject.deleteOne()
        .then(_ => res.status(200).json(subject))
        .catch(err => error(err))
});

app.put('/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id)
        .catch(err => error(err))
    
    subject.name = req.body.name ? req.body.name : ""
    subject.teacher = req.body.teacher ? req.body.teacher : ""
    subject.room = req.body.room ? req.body.room : ""

    await subject.save()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => error(err))
});



module.exports = app
