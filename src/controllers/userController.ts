import User from '../models/userModel';

const register = async (req: any, res: any) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            password: req.body.password
        });
        const userCreated = await user.save();
        res.json({ message: userCreated });
    } catch (error) {
        res.status(400).json({error: error.name, message: error.message});
        throw error;
    }
};

const login = async (req: any, res: any) => {
    try {
        res.json({ message: 'login' });
    } catch (error) {
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
