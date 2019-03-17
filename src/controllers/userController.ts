import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../configs/jwt';
import { User, UserType } from '../models/userModel';

const register = async (req: any, res: any) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            password: hashedPassword
        });
        const userCreated = await user.save();
        res.status(201).json({ message: userCreated });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const login = async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userFound = await User.findOne({ email }) as UserType;

        if (userFound && Object.keys(userFound).length > 1) {
            if (bcrypt.compareSync(password, userFound.password)) {
                const token = jwt.sign({ user: userFound._id }, JWT_CONFIG.JWT_SECRET, { expiresIn: '24h' });
                res.json({ token, message: `login successfully` });
            } else {
                res.status(400).json({ error: `wrong username and password, try again` });
            }
        } else {
            res.status(404).json({ error: `no user found with email ${email}` });
        }
    } catch (error) {
        res.status(400).json(error);
        throw error;
    }
};

const logout = async (req: any, res: any) => {
    try {
        res.json({ message: 'logout' });
    } catch (error) {
        throw error;
    }
};

export { register, login, logout };
