const status = require("http-status");
const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')


router.post("/register", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;

    // ** destructure the information from user;
    const { first_name, last_name, email, password } = user;

    // ** Check the email all ready exist  in database or not ;
    // ** Import the user model from "./models/user";

    const isEmailAllReadyExist = await prisma.user_profile.findUnique({
      where: { email: email }
    });

    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.status(status.BAD_REQUEST).json({
        status: 400,
        message: "Email all ready in use",
      });
      return;
    }

    // ** if not create a new user ;
    // !! Don't save the password as plain text in db . I am saving just for demonstration.
    // ** You can use bcrypt to hash the plain password.

    // now create the user;
    const newUser = await prisma.user_profile.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
    });

    // Send the newUser as  response;
    res.status(status.CREATED).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error) {
    // console the error to debug
    console.log(error);

    // Send the error message to the client
    res.status(status.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: error.message.toString(),
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = req.body;

    const { email, password } = user;

    // ** Check the (email/user) exist  in database or not ;
    const isUserExist = await prisma.user_profile.findFirst({
      where: { email: email }
    });

    // ** if there is not any user we will send user not found;
    if (!isUserExist) {
      res.status(status.NOT_FOUND).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    // ** if the (user) exist  in database we will check the password is valid or not ;
    // **  compare the password in db and the password sended in the request body

    const isPasswordMatched =
      isUserExist?.password === password;

    // ** if not matched send response that wrong password;

    if (!isPasswordMatched) {
      res.status(status.BAD_REQUEST).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    // ** if the email and password is valid create a token

    /*
    To create a token JsonWebToken (JWT) receive's 3 parameter
    1. Payload -  This contains the claims or data you want to include in the token.
    2. Secret Key - A secure key known only to the server used for signing the token.
    3. expiration -  Additional settings like token expiration or algorithm selection.
    */

    // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

    // ** This is our JWT Token

    const payload = user
    const secretKey = process.env.JWT_PRIVATE_KEY
    const expiration = '1h'; // Token will expire in 1 hour
    const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
    console.log('JWT Token:', token);

    // send the response
    res.status(status.OK).json({
      status: 200,
      success: true,
      message: "Login success",
      token: token,
      user: isUserExist
      });
  } catch (error) {
    // Send the error message to the client
    res.status(status.BAD_REQUEST).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

module.exports = router;