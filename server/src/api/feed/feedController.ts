
import { getSignedUrl, uploadFile } from '../../libs/gcpFileManageMent';
import { User } from '../user/userModel';
import { Feed, FeedType } from './feedModel';

const getUserFeed = async (req: any, res: any) => {
    try {
        let feed: any;
        const userFeed: any[] = [];
        const feedItemsToSkip: number = Number(req.params.feedItemsToSkip);
        if (feedItemsToSkip > 0) {
            feed = await Feed.find({}).sort({ createdAt: 'desc' }).skip(feedItemsToSkip).limit(10);
        } else {
            feed = await Feed.find({}).sort({ createdAt: 'desc' }).limit(10);
        }

        if (feed && feed.length) {
            for (const item of feed) {
                const userInfo = await User.findOne({ _id: item.userId }, 'firstName lastName -_id');
                const signedMedia = [];
                for (const privateMedia of item.media) {
                    const signedUrl = await getSignedUrl(privateMedia);
                    signedMedia.push(signedUrl);
                }
                const newItem: any = { ...item._doc, media: signedMedia, userInfo };
                userFeed.push(newItem);
            }
        }
        res.json(userFeed);
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const addUserFeed = async (req: any, res: any) => {
    try {
        const uploadedFileNames: any = [];
        if (req.files && req.files.length) {
            for (const file of req.files) {
                const fileName: string = await uploadFile(file.path);
                uploadedFileNames.push(fileName);
            }
            const feed = new Feed({
                userId: req.user,
                media: uploadedFileNames,
                description: req.body.description,
                location: req.body.location
            });
            await feed.save();
            res.status(201).json({ message: `feed created successfully` });
        } else {
            res.status(400).json({ error: `no media found in post` });
        }
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserFeed, addUserFeed };
