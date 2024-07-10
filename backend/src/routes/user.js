const status = require("http-status");
const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that returns all users'

    try {
        const users = await prisma.user_profile.findMany(); // Fetch all users from the database

        await prisma.$disconnect();

        /* #swagger.responses[200] = {
            description: 'Users found',
            schema: { $ref: "#/definitions/User" }
        } */
        return res.status(status.OK).send(users);
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that creates a new user'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'User data',
       required: true,
       schema: { $ref: "#/definitions/AddUser" }
    } */

    const { first_name, last_name, password } = req.body;

    try {
        const newUser = await prisma.user_profile.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                password: password
            }
        });

        await prisma.$disconnect();

        /* #swagger.responses[201] = {
            description: 'User created successfully',
            schema: { $ref: "#/definitions/User" }
        } */
        return res.status(status.CREATED).send(newUser);
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that updates a user by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user',
        required: true,
        type: 'integer'
    } */

    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Updated user data',
        required: true,
        schema: { $ref: "#/definitions/UpdateUser" }
    } */

    const id = parseInt(req.params.id, 10);
    const { first_name, last_name, password } = req.body;

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid user ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid user ID" });
    }

    try {
        const user = await prisma.user_profile.update({
            where: { id: id },
            data: {
                first_name: first_name,
                last_name: last_name,
                password: password
            }
        });

        await prisma.$disconnect();

        if (user) {
            /* #swagger.responses[200] = {
                description: 'User updated successfully',
                schema: { $ref: "#/definitions/User" }
            } */
            return res.status(status.OK).send(user);
        } else {
            /* #swagger.responses[404] = {
                description: 'User not found',
                schema: { message: "User not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that deletes a user by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the user',
        required: true,
        type: 'integer'
    } */

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid user ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid user ID" });
    }

    try {
        const deletedUser = await prisma.user_profile.delete({
            where: { id: id }
        });

        await prisma.$disconnect();

        if (deletedUser) {
            /* #swagger.responses[200] = {
                description: 'User deleted successfully',
                schema: { $ref: "#/definitions/User" }
            } */
            return res.status(status.OK).send({ message: "User deleted successfully" });
        } else {
            /* #swagger.responses[404] = {
                description: 'User not found',
                schema: { message: "User not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
