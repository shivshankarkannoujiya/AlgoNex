import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    getAllListDetails,
    getPlaylistDetails,
    createPlaylist,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

router.route("/").get(isLoggedIn, getAllListDetails);
router.route("/:playlistId").get(isLoggedIn, getPlaylistDetails);
router.route("/createPlaylist").post(isLoggedIn, createPlaylist);
router.route("/:playlistId/addProblem").post(isLoggedIn, addProblemToPlaylist);
router.route("/:playlistId").delete(isLoggedIn, deletePlaylist);
router
    .route("/:playlistId/removeProblem")
    .delete(isLoggedIn, removeProblemFromPlaylist);
router.route("/:playlistId/update").put(isLoggedIn, updatePlaylist);
export default router;
