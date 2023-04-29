import { userModel } from '../../models/UsersModel/usersModel.js';
import asyncHandler from 'express-async-handler';


// @desc Get All Users
// @route api/v1/users
// @access Public
export const getAllUsers = asyncHandler( async ( req, res ) => {
    const users = await userModel.find()
    res.status(200).json({ msg: 'GET ALL USERS', users })
})


// @desc Get User by id
// @route GET api/v1/users/:id
// @access Private
export const getUserById = asyncHandler( async (req,res) => {
    const user = await userModel.findById(req.params.id)

    res.status(200).json({ msg: "GET Data of ID: " + req.params.id, user })
})

// @desc Add User
// @route POST api/v1/users
// @access Private
export const setUser = asyncHandler( async (req,res) => {
    if(!req.body){
       res.status(400)
       throw new Error('No data (body) found') 
    }
    console.log( 'Body: '+ JSON.stringify(req.body) );

    const { name, email, password } = req.body;

    const user = await userModel.create({name, email, password});

    res.status(200).json({ msg: "SET Data", user })
})

// @desc Get Update User
// @route PUT api/v1/users/:id
// @access Private
export const updateUser = asyncHandler( async (req,res) => {
    console.log( 'ID: ', req.params.id );
    const id = req.params.id;
    const user = await userModel.findById(id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {new:true})
        
    res.status(200).json({ msg: "UPDATE Data of ID: "+ id, updateUser })
})

// @desc Get Delete User
// @route DELETE api/v1/users/:id
// @access Private
export const deleteUser = asyncHandler( async (req,res) => {
    const user = await userModel.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove()
    res.status(200).json({ msg: `DELETE Data of ID: ${ req.params.id }` })
    
    //                 OR
    
    // const deletedUser = await userModel.findByIdAndDelete(req.params.id, req.body, {new:true})
    // res.status(200).json({ msg: `DELETE Data of ID: ${ req.params.id }`, deletedUser })
})

