const status = require("http-status")
const { Router } = require("express")
const router = Router()

router.get('/', (req, res) => {
    res.send("GET CATEGORY")
})

router.post('/', (req, res) => {
    res.status(status.CREATED).send("POST CATEGORY")
})

router.put('/:id', (req, res) => {
    res.send(`PUT CATEGORY: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`DELETE CATEGORY: ${req.params.id}`)
})

module.exports = router