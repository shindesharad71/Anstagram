import { getSignedUrl } from '../../libs/gcpFileManagement';
import { Feed } from '../feed/feedModel';
import { User, UserType } from '../user/userModel';

const getUserProfile = async (req: any, res: any) => {
    try {
        const username = req.params.username;
        const userInfo = await User.findOne({ username }, '-password -verifyOtp -createdAt -updatedAt');
        res.json(userInfo);
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const getProfileTabInfo = async (req: any, res: any) => {
    try {
        let feed: any = [];
        const finalFeed: any = [];
        const user = req.user.user;
        const tabType = req.params.tabType;
        const feedItemsToSkip = 0;
        if (tabType === 'Posts') {
            feed = await Feed.find({ user }).sort({ createdAt: 'desc' }).skip(feedItemsToSkip).limit(16);
        }

        if (feed && feed.length) {
            for (const item of feed) {
                // Media
                const signedMedia = [];
                for (const privateMedia of item.media) {
                    const signedUrl = await getSignedUrl(privateMedia);
                    signedMedia.push(signedUrl);
                }

                const newItem: any = { ...item._doc, media: signedMedia };
                finalFeed.push(newItem);
            }
        }
        res.json(finalFeed);
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getUserProfile, getProfileTabInfo };
