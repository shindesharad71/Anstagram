
import fs from 'fs';
import { getSignedUrl, uploadFile } from '../../libs/gcpFileManagement';
import { Comment } from '../comment/commentModel';
import { Feed, FeedType } from './feedModel';

const getUserFeed = async (req: any, res: any) => {
    try {
        let feed: any;
        const userFeed: any[] = [];
        const feedItemsToSkip: number = Number(req.params.feedItemsToSkip);
        if (feedItemsToSkip > 0) {
            feed = await Feed.find({}).sort({ createdAt: 'desc' }).skip(feedItemsToSkip).limit(10).populate({ path: 'user', select: 'firstName lastName' });
        } else {
            feed = await Feed.find({}).sort({ createdAt: 'desc' }).limit(10).populate({ path: 'user', select: 'firstName lastName' });
        }

        if (feed && feed.length) {
            for (const item of feed) {
                // Media
                const signedMedia = [];
                for (const privateMedia of item.media) {
                    const signedUrl = await getSignedUrl(privateMedia);
                    signedMedia.push(signedUrl);
                }

                // Feed Comments
                const feedComments = await Comment.find({ feed: item._id }).sort({ createdAt: 'desc' }).limit(2).populate({ path: 'user', select: 'firstName lastName' });

                const newItem: any = { ...item._doc, media: signedMedia, feedComments };
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
                fs.unlink(file.path, (err) => {
                    if (err) { throw err; }
                    console.log('file removed from uploads');
                });
            }
            const feed = new Feed({
                user: req.user,
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
