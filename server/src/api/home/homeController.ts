const getUserFeed = async (req: any, res: any) => {
    try {
        res.json({ message: req.user });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserFeed };
