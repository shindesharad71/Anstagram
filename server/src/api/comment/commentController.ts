import { Comment, CommentType } from './commentModel';

const getFeedComments = async (req: any, res: any) => {
    try {
        res.json({
            message: `test`
        });
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

const addFeedComments = async (req: any, res: any) => {
    try {
        if (req.body.type === 'create') {
            const comment = new Comment({
                userId: req.user,
                feedId: req.body.feedId,
                comment: req.body.comment
            });
            await comment.save();
            res.status(201).json({
                message: `comment added successfully on ${Date.now()}`
            });
        } else {
            // update code here
            res.json({
                message: `comment updated successfully on ${Date.now()}`
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.name, message: error.message });
        throw error;
    }
};

export { getFeedComments, addFeedComments };
