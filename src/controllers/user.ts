const register = async (req: any, res: any) => {
    try {
        res.json({ message: 'register' });
    } catch (error) {
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
