const getFeed = async (req: any, res: any) {
    try {
        res.json({ message: `home` });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};
