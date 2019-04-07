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
            username: req.body.username,
            password: hashedPassword,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            verifyOtp
        });
        await user.save();
        await sendVerificationMail(req.body.firstName, req.body.email, verificationLink);
        res.status(201).json({ message: `registered successfully` });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const login = async (req: any, res: any) => {
    try {
        const loginInput = req.body.loginInput.toLowerCase();
        const password = req.body.password;
        const fieldName = loginInput.includes('@') ? 'email' : 'username';
        const userFound = await User.findOne({ [fieldName]: loginInput }) as UserType;

        if (userFound && Object.keys(userFound).length > 1) {
            if (userFound.isVerified) {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const token = jwt.sign({ user: userFound._id }, JWT_CONFIG.JWT_SECRET, { expiresIn: '24h' });
                    res.json({ token, message: `login successfully` });
                } else {
                    res.status(403).json({ message: `wrong username and password, try again` });
                }
            } else {
                res.status(403).json({ message: `please verify your email to login` });
            }
        } else {
            res.status(404).json({ message: `no user found with ${loginInput}` });
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
        let verificationQuery = JSON.stringify(Object.assign({
            verifyOtp,
            email
        }));
        verificationQuery = Buffer.from(verificationQuery).toString('base64');
        const verificationLink = `${clientUrl}#/login?query=${verificationQuery}`;
        return { verifyOtp, verificationLink };
    } catch (error) {
        throw error;
    }
};

const verify = async (req: any, res: any) => {
    try {
        const query = req.body.query;
        let params: any = Buffer.from(query, 'base64').toString('ascii');
        params = JSON.parse(params);
        const email = params.email;
        const verifyOtp = params.verifyOtp;
        await User.updateOne({ email, verifyOtp }, { $set: { isVerified: true } }, { upsert: true });
        res.json({ message: 'Success! Email verified successfully!' });
    } catch (error) {
        res.status(400).json(error);
        throw error;
    }
};

const checkUsername = async (req: any, res: any) => {
    try {
        const username = req.params.username;
        const isUsernameExists = await User.findOne({ username });
        res.json(isUsernameExists);
    } catch (error) {
        throw error;
    }
};

export { register, login, logout, verify, checkUsername };
