import asyncHandler from 'express-async-handler'
import { db } from '../../models/index.js'

export const addUserInDB = asyncHandler( async (user) => {
    return await db.locationModel.create(user)

})

export const updateLocationById = asyncHandler( async (data) => {
    const user = await db.locationModel.findById(data.id).populate('assigneeId')
    user.location.type = 'Point'
    user.location.coordinates = [data.location.longitude, data.location.latitude]
    return await user.save()
})

export const deleteUserLocation = asyncHandler( async (socketId) => {
    const user = await db.locationModel.deleteOne({socketId})
    console.log(JSON.stringify(user)+'User to be deleted');
    return user
})
