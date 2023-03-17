const express = require('express')
//const home = require('./routers/homerouter')
//const about = require('./routers/aboutrouter')
//const contact = require('./routers/contactrouter')
const Model = require('../model/model');

const router = express.Router();

router.post('/post', async (req, res) => {

    const data = new Model({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    })

    try {
        const dataToSave = data.save();
        data.
            res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/get-all', async (req, res) => {

    try {
        const data = await Model.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get-one/:id', async (req, res) => {
    try {
        console.log("------>>")
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updateData = req.body;
        console.log("--->updateData" + JSON.stringify(updateData))
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(id, updateData, options)

        res.send(result);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Data have been deleted ${data.name}` })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;