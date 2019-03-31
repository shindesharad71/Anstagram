
import { Storage } from '@google-cloud/storage';
import dotenv from "dotenv";
import { User } from '../user/userModel';
import { Feed, FeedType } from './feedModel';

dotenv.config();

// GCP Storage Config
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.KEYFILE_PATH
});
const bucketName: string = process.env.BUCKET_NAME as string;
const bucket = storage.bucket(bucketName);

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
                const newItem: any = { ...item._doc, userInfo };
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
        if (req.files && req.files.length) {

            for (const file of req.files) {
                const uploadedFile = await bucket.upload(file.path, {
                    gzip: true,
                    metadata: {
                        cacheControl: 'public, max-age=31536000'
                    }
                });
                console.log(JSON.stringify(uploadedFile[0].metadata.name, undefined, 2));

                const options: any = {
                    action: 'read',
                    expires: Date.now() + 1000 * 60 * 60, // one hour
                };

                // Get a signed URL for the file
                const [url] = await bucket.file(uploadedFile[0].metadata.name)
                    .getSignedUrl(options);

                console.log(url);
            }
            const feed = new Feed({
                userId: req.user,
                media: req.files,
                description: req.body.description,
                location: req.body.location
            });
            // await feed.save();
            // res.status(201).json({ message: `feed created successfully` });
            res.send({ files: req.files });
        } else {
            console.log(req.files);
            res.send({ files: req.files });
        }
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserFeed, addUserFeed };
