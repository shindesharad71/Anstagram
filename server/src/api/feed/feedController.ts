import { Feed, FeedType } from './feedModel';

const getUserFeed = async (req: any, res: any) => {
    try {
        const feed = await Feed.find({}).sort({ createdAt: 'desc' });
        res.json(feed);
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const addUserFeed = async (req: any, res: any) => {
    try {

        // const feed = new Feed({
        //     userId: req.user,
        //     media: req.body.media,
        //     description: req.body.description
        // });
        // await feed.save();
        // res.status(201).json({ message: `feed created successfully` });
        console.log(req.files);
        res.send({ files: req.files, body: req.body });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserFeed, addUserFeed };
