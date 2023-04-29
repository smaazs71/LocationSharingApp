
// @desc Get All Users
// @route api/v1/users
// @access Public
export const getAllUsers = ( req, res ) => {
    res.status(200).json({ msg: 'GET ALL USERS' })
}


// @desc Get User by id
// @route GET api/v1/users/:id
// @access Private
export const getUserById = (req,res) => {
    res.status(200).json({ msg: "GET Data of ID: " + req.params.id })
}

// @desc Add User
// @route POST api/v1/users
// @access Private
export const setUser = (req,res) => {
    console.log( 'Body: '+ JSON.stringify(req.body) );
    res.status(200).json({ msg: "SET Data"})
}

// @desc Get Update User
// @route PUT api/v1/users/:id
// @access Private
export const updateUser = (req,res) => {
    console.log( 'ID: ', req.params.id );
    const id = req.params.id;
    res.status(200).json({ msg: "UPDATE Data of ID: "+ id })
}

// @desc Get Delete User
// @route DELETE api/v1/users/:id
// @access Private
export const deleteUser = (req,res) => {
    res.status(200).json({ msg: `DELETE Data of ID: ${ req.params.id }` })
}