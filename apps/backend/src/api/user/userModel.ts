import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export interface UserType extends mongoose.Document {
	_id: string;
	firstName: string;
	lastName: string;
	gender: string;
	email: string;
	username: string;
	password: string;
	avatar: string;
	dateOfBirth: string;
	isVerified: boolean;
}

const userSchema = new Schema(
	{
		firstName: {
			type: 'String',
			trim: true,
			required: true
		},
		lastName: { type: 'String', trim: true, required: true },
		email: {
			type: 'String',
			unique: true,
			required: true,
			index: true,
			lowercase: true
		},
		username: {
			type: 'String',
			unique: true,
			required: true,
			index: true,
			lowercase: true
		},
		dateOfBirth: { type: Date, required: true },
		gender: { type: 'String', required: true },
		password: { type: 'String', required: true },
		avatar: 'String',
		resetOtp: Number,
		verifyOtp: Number,
		isVerified: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

export const User = mongoose.model<UserType & mongoose.Document>(
	'User',
	userSchema
);
