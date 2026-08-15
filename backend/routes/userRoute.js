import express from 'express'
import {registerUser,loginUser,updateUser, deleteUser,getUserById,getAllUsers,getMe} from '../controllers/userController.js'
import authUser from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/register", registerUser);
router.post("/login",loginUser);
router.put("/update/:id",authUser,updateUser);
router.delete("/delete/:id",authUser,deleteUser);
router.get("/get/:id",authUser,getUserById);
router.get("/getme",authUser, getMe);
router.get("/",getAllUsers);
export default router