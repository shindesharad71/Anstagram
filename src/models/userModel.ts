import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId, index: true },
    firstName: { type: String, trim: true, required: 'required firstName' },
    lastName: { type: String, trim: true, required: 'required lastName' },
    email: {
        type: String, unique: true, required: 'required email', index: true, lowercase: true
    },
    dateOfBirth: { type: Date, required: 'required dateOfBirth' },
    password: { type: String, required: 'required password' },
}, {
        timestamps: true
    });

// Password Hashing
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

// Password Compare
userSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: any) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

export default User;
