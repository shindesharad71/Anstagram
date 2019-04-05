import bcrypt from 'bcrypt-nodejs';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../../configs/jwt';
import { sendVerificationMail } from '../../libs/mailer';
import { User, UserType } from './userModel';

dotenv.config();

const clientUrl = process.env.CLIENT_URL;

const register = async (req: any, res: any) => {
    try {
        const { verifyOtp, verificationLink } = await createVerificationLink(req.body.email);
        const hashedPassword = bcrypt.hashSync(req.body.password);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            verifyOtp
        });
        // await user.save();
        await sendVerificationMail(firstName, req.body.email, verificationLink);
        res.status(201).json({ message: `registered successfully` });
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
                res.status(403).json({ message: `wrong username and password, try again` });
            }
        } else {
            res.status(404).json({ message: `no user found with email ${email}` });
        }
    } catch (error) {
        res.status(400).json(error);
        throw error;
    }
};

const logout = async (req: any, res: any) => {
    try {
        res.json({ message: 'logout test' });
    } catch (error) {
        throw error;
    }
};

const createVerificationLink = async (email: string) => {
    try {
        const verifyOtp = Math.floor(100000 + Math.random() * 900000);
        let verificationQuery = Object.assign({
            verifyOtp,
            email
        });
        verificationQuery = Buffer.from(verificationQuery).toString('base64');
        const verificationLink = `${clientUrl}users/verify?query=${verificationQuery}`;
        return { verifyOtp, verificationLink };
    } catch (error) {
        throw error;
    }
};

export { register, login, logout };
