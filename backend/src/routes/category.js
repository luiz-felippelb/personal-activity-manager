const status = require("http-status");
const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that returns all categories'
    
    try {
        // CONSTRUIR LOGICA PARA OBTER AS CATEGORIAS DO BANCO DE DADOS
        const categories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }]; // Dados estáticos de exemplo

        /* #swagger.responses[200] = {
            description: 'Categories found',
            schema: { $ref: "#/definitions/AllCategory" }
        } */
        return res.status(status.OK).send(categories);
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that creates a new category'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Category data',
       required: true,
       schema: { $ref: "#/definitions/AddCategory" }
    } */

    const category = req.body;

    try {
        // CONSTRUIR A LOGICA PARA ADICIONAR A CATEGORIA NO BANCO DE DADOS
        const newCategory = { id: 1, ...category }; // Dados estáticos de exemplo

        /* #swagger.responses[201] = {
            description: 'Category created successfully',
            schema: { $ref: "#/definitions/Category" }
        } */
        return res.status(status.CREATED).send(newCategory);
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that updates a category by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the category',
        required: true,
        type: 'integer'
    } */

    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Updated category data',
        required: true,
        schema: { $ref: "#/definitions/UpdateCategory" }
    } */

    const id = parseInt(req.params.id, 10);
    const updatedCategory = req.body;

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid category ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid category ID" });
    }

    try {
        // CONSTRUIR A LOGICA PARA ATUALIZAR A CATEGORIA NO BANCO DE DADOS
        const category = { id, ...updatedCategory }; // Dados estáticos de exemplo

        if (category) {
            /* #swagger.responses[200] = {
                description: 'Category updated successfully',
                schema: { $ref: "#/definitions/Category" }
            } */
            return res.status(status.OK).send(category);
        } else {
            /* #swagger.responses[404] = {
                description: 'Category not found',
                schema: { message: "Category not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "Category not found" });
        }
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that deletes a category by ID'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the category',
        required: true,
        type: 'integer'
    } */

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid category ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid category ID" });
    }

    try {
        // CONSTRUIR A LOGICA PARA DELETAR A CATEGORIA NO BANCO DE DADOS
        const category = { id, name: "Sample Category" }; // Dados estáticos de exemplo

        if (category) {
            /* #swagger.responses[200] = {
                description: 'Category deleted successfully',
                schema: { $ref: "#/definitions/Category" }
            } */
            return res.status(status.OK).send({ message: "Category deleted successfully" });
        } else {
            /* #swagger.responses[404] = {
                description: 'Category not found',
                schema: { message: "Category not found" }
            } */
            return res.status(status.NOT_FOUND).send({ message: "Category not found" });
        }
    } catch (error) {
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;