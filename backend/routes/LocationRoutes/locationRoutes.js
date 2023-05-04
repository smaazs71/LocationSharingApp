import express from "express";
import { getAllLocationsData, addUser, setAssignee } from "../../controllers/LocationController/locationController.js";

const router = express.Router();

router.get('/', getAllLocationsData)

router.post('/', addUser)

router.put('/setassignee', setAssignee)


export default { route: router, name: 'location' }
