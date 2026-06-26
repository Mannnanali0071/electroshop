import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

export async function register(req, res) {
  try {
    const { email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(409).json({
      message: 'This email already exists, please login',
      success: false
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await User.create({
      ...req.body,
      password: hashedPassword
    })
    res.status(201).json({ message: "Register Successfull", success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message
    })
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found, please register",
        success: false,
      });
    }

    // Compare passwords
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
      },
    });

  } catch (error) {
    console.log("error in login controller: ", error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message
    })
  }
}


export const getUsers = async (_, res) => {
  try {
    const users = await User.find().sort({ dateOrdered: -1 })
    if (!users) return res.status(404).json({ message: "users not found", success: false })
    console.log(users)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error", success: false })
  }
}


export const usersCount = async (_, res) => {
  try {
    const count = await User.countDocuments()
    res.status(200).json({ totalUsers: count })
  } catch (error) {
    console.log(error)
    res.status(200).json({
      message: "Internal Servere error",
      error: error.message,
      success: false,
    })
  }
}


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({
      message: "User not found",
      success: false,
    })
    res.status(200).json(user)
  } catch (error) {
    console.log("message: error in getUserById", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    })
  }
}