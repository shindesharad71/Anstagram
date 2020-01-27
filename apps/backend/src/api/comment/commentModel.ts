import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

type CommentType = mongoose.Document & {
    id: string,
    userId: string,
    feedId: string
};

const commentSchema = new Schema({
    id: { type: ObjectId, index: true },
    user: {type: ObjectId, ref: 'User', required: 'userId required'},
    feed: {type: ObjectId, ref: 'Feed', required: 'feedId required'},
    comment: { type: String, required: 'comment required' }
}, {
        timestamps: true
    });

const Comment = mongoose.model('Comment', commentSchema);

export { CommentType, Comment };
