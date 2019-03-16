import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    firstName: { type: String, trim: true, required: 'required firstName' },
    lastName: { type: String, trim: true, required: 'required lastName' },
    email: {
        type: String, unique: true, required: 'required email'
    },
    dateOfBirth: { type: Date, required: 'required dateOfBirth' },
    password: { type: String, required: 'required password' },
}, {
        timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
