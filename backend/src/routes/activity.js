const status = require("http-status")
const { Router } = require("express")
const router = Router()

router.get('/', (req, res) => {
    res.send("GET ACTIVITY")
})

router.post('/', (req, res) => {
    res.status(status.SUCCESSFUL).send("POST ACTIVITY")
})

router.put('/:id', (req, res) => {
    res.send(`PUT ACTIVITY: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`DELETE ACTIVITY: ${req.params.id}`)
})

module.exports = router