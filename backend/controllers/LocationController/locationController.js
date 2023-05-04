import asyncHandler from 'express-async-handler';
import { db } from '../../models/index.js';


export const getAllLocationsData = asyncHandler( async (req, res) => {
    const locationData = await db.locationModel.find()
    res.status(200).json({msg:'Success', locationData})
})


export const addUser = asyncHandler( async (req, res) => {
    const { userName, role, location, socketId } = req.body
    const newUser = {
        userName,
        role,
        location: { type: "Point", coordinates: [ location.longitude, location.latitude] },
        socketId
    }
    const locationData = await db.locationModel.create(newUser)
    console.log('running adduser: '+ locationData);
    res.status(200).json({msg:'Success', locationData})
})

export const setAssignee = asyncHandler( async (req, res) => {
    const { id, assigneeId } = req.body

    const passenger = await db.locationModel.findById(id)
    passenger.assigneeId = assigneeId
    const updatedPassenger = await passenger.save()
    
    const driver = await db.locationModel.findById(assigneeId)
    driver.assigneeId = id
    const updatedDriver = driver.save()

    res.status(200).json({msg: 'Success', passenger: updatedPassenger, driver: updatedDriver})

})

export const updateUserLocation = asyncHandler( async (req, res) => {
    const { userName, role, location, socketId } = req.body
    const newUser = {
        userName,
        role,
        location: { type: "Point", coordinates: [ location.longitude, location.latitude] },
        socketId
    }
    const locationData = await db.locationModel.create(newUser)
    console.log('running adduser: '+ locationData);
    res.status(200).json({msg:'Success', locationData})
})


