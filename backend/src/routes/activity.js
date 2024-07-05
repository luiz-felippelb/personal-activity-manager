const status = require("http-status");
const { Router } = require("express");
const router = Router();

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = 'Endpoint that returns an activity by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the activity',
        required: true,
        type: 'integer'
    } */
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid activity ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid activity ID" });
    }

    try {
        // CONSTRUIR LOGICA PARA OBTER A INFORMACAO DO BANCO DE DADOS
        const activity = 'GET ACTIVITY';

        if (activity) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Activity" },
                description: 'Activity found' 
            } */
            return res.status(status.OK).send(activity);
        } else {
            /* #swagger.responses[404] = {
                schema: { message: 'Activity not found.' },
                description: 'Activity not found.'
            } */
            return res.status(status.NOT_FOUND).send({ message: 'Activity not found.' });
        }
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = 'Endpoint that creates a new activity'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Activity data',
       required: true,
       schema: { $ref: "#/definitions/AddActivity" }
    } */
    
    const activity = req.body;

    try {
        // CONSTRUIR A LOGICA PARA ADICIONAR O DADO NO BANCO 
        const newActivity = { id: 1, ...activity };

        /* #swagger.responses[201] = {
            description: 'Activity created successfully',
            schema: { $ref: "#/definitions/Activity" }
        } */
        return res.status(status.CREATED).send(newActivity);
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', (req, res) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = 'Endpoint that updates an activity by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the activity',
        required: true,
        type: 'integer'
    } */
    
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Updated activity data',
        required: true,
        schema: { $ref: "#/definitions/UpdateActivity" }
    } */
    
    const id = parseInt(req.params.id, 10);
    const updatedActivity = req.body;

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid activity ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid activity ID" });
    }

    try {
        // CONSTRUIR A LOGICA PARA ATUALIZAR A INFORMACAO NO BANCO
        const activity = { id, ...updatedActivity }; 

        if (activity) {
            /* #swagger.responses[200] = {
                description: 'Activity updated successfully',
                schema: { $ref: "#/definitions/Activity" }
            } */
            return res.status(status.OK).send(activity);
        } else {
            /* #swagger.responses[404] = {
                description: 'Activity not found',
                schema: { message: "Activity not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "Activity not found" });
        }
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = 'Endpoint that deletes an activity by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the activity',
        required: true,
        type: 'integer'
    } */
    
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid activity ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid activity ID" });
    }

    try {
        // CONSTRUIR A LOGICA PARA DELETER A INFORMACAO NO BANCO
        const activity = { id, name: "Sample Activity" }; 

        if (activity) {
            /* #swagger.responses[200] = {
                description: 'Activity deleted successfully',
                schema: { $ref: "#/definitions/Activity" }
            } */
            return res.status(status.OK).send({ message: "Activity deleted successfully" });
        } else {
            /* #swagger.responses[404] = {
                description: 'Activity not found',
                schema: { message: "Activity not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "Activity not found" });
        }
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
