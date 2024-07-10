const status = require("http-status");
const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that returns all categories'

    try {
        const categories = await prisma.category.findMany(); // Fetch all categories from the database

        await prisma.$disconnect();

        /* #swagger.responses[200] = {
            description: 'Categories found',
            schema: { $ref: "#/definitions/AllCategory" }
        } */
        return res.status(status.OK).send(categories);
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = 'Endpoint that creates a new category'

    /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Category data',
       required: true,
       schema: { $ref: "#/definitions/AddCategory" }
    } */

    const { description } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: {
                description: description,
                created_at: new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
                updated_at: new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})
            }
        });

        await prisma.$disconnect();

        /* #swagger.responses[201] = {
            description: 'Category created successfully',
            schema: { $ref: "#/definitions/Category" }
        } */
        return res.status(status.CREATED).send(newCategory);
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
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
    const { description } = req.body;

    if (isNaN(id)) {
        /* #swagger.responses[400] = {
            description: 'Invalid ID',
            schema: { message: "Invalid category ID" }
        } */
        return res.status(status.BAD_REQUEST).send({ message: "Invalid category ID" });
    }

    try {

        const category = await prisma.category.update({
            where: { id: id },
            data: {
                description: description,
                updated_at: new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
            }
        });

        await prisma.$disconnect();

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
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
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
        const deletedCategory = await prisma.category.delete({
            where: { id: id }
        });

        await prisma.$disconnect();

        if (deletedCategory) {
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
        console.error(error);
        await prisma.$disconnect();
        /* #swagger.responses[500] = { description: 'Internal Server Error' } */
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
