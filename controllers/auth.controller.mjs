import Users from "../models/Users.mjs";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


//register controller

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;

        const existingUser = await Users.findOne({ email: data.email });

        if (existingUser) {
            return res.status(400).json({ "message": "User already exists" });
        }

        const hashedPassword = await bcrypt.hashSync(data.password, 10);

        const user = await Users.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            phone: data.phone
        })

        res.status(201).json({
            message: "User registration complete",
            user: {
                _id: user._id,
                name: data.name,
                email: data.email,
                role: data.role,
                phone: data.phone
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Login Mechanism

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ "message": "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ "message": "Wrong password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

         res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}