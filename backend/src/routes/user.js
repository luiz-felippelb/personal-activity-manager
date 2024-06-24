const status = require("http-status")
const { Router } = require("express")
const router = Router()

router.get('/', (req, res) => {
    res.send("GET USER")
})

router.post('/', (req, res) => {
    res.status(201).send("POST USER")
})

router.put('/:id', (req, res) => {
    res.send(`PUT USER: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`DELETE USER: ${req.params.id}`)
})

module.exports = router