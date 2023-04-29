import express from 'express'
import { deleteUser, getAllUsers, getUserById, setUser, updateUser } from '../../controllers/UserControllers/userController.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(setUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

        // OR

// router.get( '/', getAllUsers )

// router.get('/:id', getUserById )

// router.post('/', setUser )

// router.put('/:id', updateUser )

// router.delete('/:id', deleteUser )


export default { route: router, name: "user" };