import express from "express";
import {getUser, getUserFriends, addRemoveFriend, deleteUser} from "../controllers/users.js"
import { verifyToken } from "../middlewares/auth.js";
import { updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.delete("/:id", deleteUser);
router.patch("/:id", verifyToken, updateUser);

export default router;