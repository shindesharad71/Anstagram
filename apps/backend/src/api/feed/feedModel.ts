import * as mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export interface FeedType extends mongoose.Document {
	userId: string;
	media: [];
	description: string;
}

const feedSchema = new Schema(
	{
		user: { type: ObjectId, ref: 'User' },
		media: { type: Array, required: true },
		description: { type: String, default: '' },
		location: { type: String, default: '' }
	},
	{
		timestamps: true
	}
);

export const Feed = mongoose.model<FeedType & mongoose.Document>(
	'Feed',
	feedSchema
);
