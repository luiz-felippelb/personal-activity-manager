const status = require("http-status");
const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.get('/:id', async (req, res) => {
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
        const activity = await prisma.activity.findUnique({
            where: { id: id }
        });

        await prisma.$disconnect();

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
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = 'Endpoint that creates a new activity'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Activity data',
       required: true,
       schema: { $ref: "#/definitions/AddActivity" }
    } */

    const activity = req.body;

    // Verifica se req.body contém os dados esperados
    if (!activity || !activity.description || !activity.dt_initial || !activity.dt_final || !activity.category_id || !activity.user_id) {
        return res.status(status.BAD_REQUEST).send({ message: 'Missing or incomplete activity data in request body.' });
    }

    try {
        // CONSTRUIR A LOGICA PARA ADICIONAR O DADO NO BANCO 
        // const newActivity = { id: 1, ...activity };

        const newActivity = await prisma.activity.create({
            data: {
                description: activity.description,
                dt_initial: new Date(activity.dt_initial),
                dt_final: new Date(activity.dt_final),
                category_id: activity.category_id,
                user_id: activity.user_id
            }
        });

        await prisma.$disconnect();

        /* #swagger.responses[201] = {
            description: 'Activity created successfully',
            schema: { $ref: "#/definitions/Activity" }
        } */
        return res.status(status.CREATED).send(newActivity);
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
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
        let updatedData = {};

        if (updatedActivity.dt_final) {
            const dtFinalDate = new Date(updatedActivity.dt_final);
            if (!isNaN(dtFinalDate)) {
                updatedData.dt_final = dtFinalDate.toISOString();
            } else {
                return res.status(status.BAD_REQUEST).send({ message: "Invalid date format for dt_final" });
            }
        }

        const activity = await prisma.activity.update({
            where: { id: id },
            data: updatedData
        });

        await prisma.$disconnect();

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
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
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
        const deletedActivity = await prisma.activity.delete({
            where: { id: id }
        });

        if (deletedActivity) {
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
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
