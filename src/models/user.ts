import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
        type: String, unique: true
    },
    dateOfBirth: Date,
    password: String
});

const User = mongoose.model('User', userSchema);

export default User;
