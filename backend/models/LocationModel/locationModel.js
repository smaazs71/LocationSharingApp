import mongoose, { Schema } from "mongoose";


const locationSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: [ true ]
        },
        location: {
            type: {type: String},
            coordinates: [Number]
        },
        socketId:{
            type: String,
            required: true,
        },
        assigneeId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location'
        }

    },
    {
        timestamps: true,
    }
)

locationSchema.index({location: '2dsphere'})

export const locationModel = mongoose.model('Location', locationSchema)
