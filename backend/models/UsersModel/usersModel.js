import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [ true, 'Email required' ]
        },
        password: {
            type: String,
            required: [ true, 'Password required' ]
        }
    },
    {
        timestamps: true,
    }
)

export const userModel = mongoose.model( 'User', userSchema )

