import { User, UserType } from '../user/userModel';

const getUserProfile = async (req: any, res: any) => {
    try {
        const username = req.params.username;
        const userInfo = await User.findOne({username}, '-password -verifyOtp -createdAt -updatedAt');
        res.json(userInfo);
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserProfile };
