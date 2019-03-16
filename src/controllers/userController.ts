import passport from 'passport';
import passportLocal from "passport-local";
import User from '../models/userModel';

const LocalStrategy = passportLocal.Strategy;

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
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const login = async (req: any, res: any) => {
    try {
        const localOptions = { usernameField: 'email' };
        const passportData = passport.use(new LocalStrategy(localOptions, (email, password, done) => {
            User.findOne({ email: email.toLowerCase() }, (error, user: any) => {
                if (error) { return done(error); }
                if (!user) {
                    return done(undefined, false, { message: `Email ${email} not found.` });
                }
                user.comparePassword(password, (err: Error, isMatch: boolean) => {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(undefined, user);
                    }
                    return done(undefined, false, { message: "Invalid email or password." });
                });
            });
        }));
        res.json({ message: passportData });
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
