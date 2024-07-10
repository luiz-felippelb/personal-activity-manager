module.exports = {
  info: {
    version: '1.0.0',
    title: 'Personal Activity Manager API',
    description: 'Documentação da API',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Activity",
      "description": "Activity endpoint"
    },
    {
      "name": "Category",
      "description": "Category endpoint"
    },
    {
      "name": "User",
      "description": "User endpoint"
    }
  ],
  // securityDefinitions: {
  //   JWT: {
  //     description: 'JWT token',
  //     type: 'apiKey',
  //     in: 'header',
  //     name: 'Authorization',
  //   },
  // },
  definitions: {
    Activity: {
      id: 1,
      description: "do the daw2 activity",
      dt_initial: "2024-06-04",
      dt_final: "2024-07-04",
      category_id: 1,
      user_id: 1,
      status: "true"
    },
    AddActivity: {
      $description: "do the daw2 activity",
      $dt_initial: "2024-06-04",
      $dt_final: "2024-07-04",
      $category_id: 1,
      $user_id: 1,
    },
    UpdateActivity: {
      description: "do the daw2 activity",
      dt_initial: "2024-06-04",   
      dt_final: "2024-07-04",
      category_id: 1,
      status: "true"
    },
    AllActivity: [
      {
        id: 1,
        description: "do the daw2 activity",
        dt_initial: "2024-06-04",
        dt_final: "2024-07-04",
        category_id: 1,
        user_id: 1,
        status: "true"
      }
    ],
    Category: {
      id: 1,
      description: "college jobs",
      created_at: "2024-06-03",
      updated_at: "2024-06-03",
      status: "true"
    },
    AllCategory: [
      {
        id: 1,
        description: "college jobs",
        created_at: "2024-06-03",
        updated_at: "2024-06-03",
        status: "true"
      },
    ],
    AddCategory: {
      $description: "college jobs",
      $created_at: "2024-06-03",
      $updated_at: "2024-06-03"
    },
    UpdateCategory: {
      description: "college jobs",
      created_at: "2024-06-03",
      updated_at: "2024-06-03",
      status: "true"
    },
    User: {
      id: 1,
      first_name: "Luiz Felippe",
      last_name: "Brizola",
      password: "!22lf",
      status: "true"
    },
    AddUser: {
      $first_name: "Luiz Felippe",
      $last_name: "Brizola",
      $password: "!22lf",
    },
    UpdateUser: {
      first_name: "Luiz Felippe",
      last_name: "Brizola",
      password: "!22lf",
      status: "true"
    }
  },
  // apis: ['./src/routes/*.js'],
  // paths: {
  //   "/users": {

  //   }
  // }
};