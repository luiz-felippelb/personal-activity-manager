const status = require("http-status");
const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that returns all users'

    try {
        // CONSTRUIR LOGICA PARA OBTER OS USUÁRIOS DO BANCO DE DADOS
        const users = [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }]; // Dados estáticos de exemplo

        /* #swagger.responses[200] = {
            description: 'Users found',
            schema: { $ref: "#/definitions/User" }
        } */
        return res.status(status.OK).send(users);
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint that creates a new user'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'User data',
       required: true,
       schema: { $ref: "#/definitions/AddUser" }
    } */
    
    const user = req.body;

    try {
        // CONSTRUIR A LOGICA PARA ADICIONAR O USUÁRIO NO BANCO DE DADOS
        const newUser = { id: 1, ...user }; // Dados estáticos de exemplo

        /* #swagger.responses[201] = {
            description: 'User created successfully',
            schema: { $ref: "#/definitions/User" }
        } */
        return res.status(status.CREATED).send(newUser);
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', (req, res) => {
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
    const updatedUser = req.body;

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid user ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid user ID" });
    }

    try {
        // CONSTRUIR A LOGICA PARA ATUALIZAR O USUÁRIO NO BANCO DE DADOS
        const user = { id, ...updatedUser }; // Dados estáticos de exemplo

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
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', (req, res) => {
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
        // CONSTRUIR A LOGICA PARA DELETAR O USUÁRIO NO BANCO DE DADOS
        const user = { id, name: "Sample User" }; // Dados estáticos de exemplo

        if (user) {
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
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
