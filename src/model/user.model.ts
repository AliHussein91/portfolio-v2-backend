import { Schema, model } from "mongoose"
import bcrypt from 'bcrypt';
import { IUser } from "../interfaces/user.interface"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export const User = model('User', userSchema)