require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const PORT = process.env.PORT || 3000
const Vegetable = require('./models/vegetable')
const app = express()

app.use(express.urlencoded({ extended: true })) // build a ssr website
// app.use(express.json()) // build an api
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

//******************************************/
//===== I.N.D.C.E.S. = ROUTE ACRONYM ======//

//--- INDEX ---//
// list all vegetables
app.get('/vegetables', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.find({})
        res.render('vegetables/Index', {
            vegetables: foundVegetables
        })            
    } catch (error){
        res.status(400).send({ message: error.message })
    }
})


//--- NEW ---//
// show the user a form to fill out to create a vegetable.

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New')
})

//--- DELETE ---//
// backend only functionality that is used to DELETE a vegetable.

//--- UPDATE ---//
// backend only functionality that is used to UPDATE a vegetable.

//--- CREATE ---//
// backend only functionality that is used to CREATE a vegetable. 

app.post('/vegetables', async (req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try{
        const createdVegetable = await Vegetable.create(req.body)
        res.redirect(`/vegetables/${createdVegetable._id}`)
    }catch (error){
        res.status(400).send({ messaqge: error.message })

    }
})

//--- EDIT ---//
// show the user a form to EDIT the vegetable.

//--- SHOW ---//
// shows you 1 individual vegetable. 
app.get('/vegetables/:id', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findOne({_id: req.params.id})
        res.render('vegetables/Show', {
            vegetable: foundVegetable
        })
    }catch (error) {
        res.status(400).send({ message: error.message})
    }
})


app.listen(PORT, () => {
    console.log(`Ayo the port at ${PORT} is lit.`)
})