const express = require('express');
const consola = require('consola')
const mongoose = require('mongoose')
const app = express();

const Day = require('../models/day');


error = function(err) {
    consola.error(new Error(err))
        res.status(500).json({
            error: err
        })
}

app.get('/', async (req, res) => {
    const days = await Day.find()
        .catch(err => error(err))
    res.status(200).json(days)  
})

app.get('/:id', async (req, res) => {
    const day = await Day.findById(req.params.id)
        .catch(err => error(err))
    res.status(200).json(day)
});

app.post('/', async (req, res) => {

    console.log(req.body.subjectIds)

    const day = new Day({
        name: req.body.name, 
        subjects: req.body.subjectIds
    })   

    await day.save()
        .then(async () => {
            // await Day.populate(day, 'subjects')
            res.status(200).send(day)
        })
        .catch(err => error(err))
});


app.delete('/:id', async (req, res) => {
    const day = await Day.findById(req.params.id)
        .catch(err => error(err))
    
    await day.deleteOne()
        .then(_ => res.status(200).json(day))
        .catch(err => error(err))
    
});

app.put('/:id', async (req, res) => {
    const day = await Day.findById(req.params.id)
        .catch(err => error(err))

    if(req.body.name) day.name = req.body.name
    if(req.body.subjectIds) day.subjects = req.body.subjectIds

    await day.save()
        .then(async (result) => {
            // await Day.populate(result, 'subjects')
            res.status(200).send(result)
        })
        .catch(err => error(err))
});

// app.put('/:id/pushsubject', async (req, res) => {
//     const day = await Day.findById(req.params.id)
//         .catch(err => error(err))

//     if(req.body.subjectIds){
//         req.body.subjectIds.forEach(subjectId => {
//             day.subjects.push(subjectId) 
//         })
//     } 

//     await day.save()
//         .then(result => {
//             res.status(200).send(result)
//         })
//         .catch(err => error(err))
// });

// app.put('/:id/pullsubject', async (req, res) => {
//     const day = await Day.findById(req.params.id)
//         .catch(err => error(err))

//     if(req.body.subjectIds){
//         day.subjects = day.subjects.filter(databaseSubjectId => !req.body.subjectIds.includes(databaseSubjectId)) 
//     } 

//     await day.save()
//         .then(result => {
//             res.status(200).send(result)
//         })
//         .catch(err => error(err))
// });



module.exports = app
