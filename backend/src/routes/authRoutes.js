import express from "express"
import { login, register, getUsers, usersCount, getUserById } from "../controllers/authController.js"
import { loginValidation, registerValidation } from "../middlewares/authValidation.js"

const router = express.Router()

router.post('/register', registerValidation, register)

router.post('/login', loginValidation, login)

router.get('/users', getUsers)

router.get('/users/count', usersCount)

router.get('/user/:id', getUserById)

export default router