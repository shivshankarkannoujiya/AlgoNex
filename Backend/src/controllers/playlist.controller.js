import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!name) {
        throw new ApiError(400, "Playlist name is required");
    }

    const existingPlaylistForUser = await prisma.playlist.findUnique({
        where: {
            name_userId: {
                name,
                userId,
            },
        },
    });

    if (existingPlaylistForUser) {
        throw new ApiError(409, "You already have a playlist with this name");
    }

    try {
        const newPlaylist = await prisma.playlist.create({
            data: {
                name,
                description,
                userId,
            },
        });

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    { playlist: newPlaylist },
                    "Playlist created Successfully",
                ),
            );
    } catch (error) {
        console.error("Error while creating playlist: ", error);
        throw new ApiError(500, "Failed to create playlist");
    }
});

const getAllListDetails = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, "userId is required");
    }

    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                userId,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        if (playlists.length === 0) {
            throw new ApiError(404, "No playlists found for this user");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { playlists: playlists },
                    "Playlists fetched successfully",
                ),
            );
    } catch (error) {
        console.error("Error while fetching playlists: ", error);
        throw new ApiError(500, "Failed to fetch playlist");
    }
});

const getPlaylistDetails = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!playlistId) {
        throw new ApiError(400, "Playlist Id is required");
    }

    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                id: playlistId,
                userId: req.user?.id,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        if (playlists.length === 0) {
            throw new ApiError(404, "No playlists found for this user");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { playlists: playlists },
                    "Playlists fetched successfully",
                ),
            );
    } catch (error) {
        console.error("Error while fetching playlists: ", error);
        throw new ApiError(500, "Failed to fetch playlist");
    }
});

const addProblemToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        throw new ApiError(400, "Invalid or missing problem ids");
    }

    try {
        /**@description Create records for each problem in playlist */
        const problemsInPlaylist = await prisma.problemInPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                playlistId,
                problemId,
            })),
        });

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    { problemsInPlaylist: problemsInPlaylist },
                    "Problem added to playlist successfully",
                ),
            );
    } catch (error) {
        console.error("Error while adding problems in playlist: ", error);
        throw new ApiError(500, "Failed to add problem in playlist");
    }
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await prisma.playlist.findUnique({
        where: {
            id: playlistId,
        },
    });

    if (!playlist) {
        throw new ApiError(
            404,
            "Invalid playlistId or playlist does not exist",
        );
    }

    try {
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id: playlistId,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { deletedPlaylist: deletedPlaylist },
                    "Playlist deleted successfully",
                ),
            );
    } catch (error) {
        console.error("Error while deleting playlist: ", error);
        throw new ApiError(500, "Failed to delete playlist");
    }
});

const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const problemIds = req.body;

    const playlist = await prisma.playlist.findUnique({
        where: {
            id: playlistId,
        },
    });

    if (!playlist) {
        throw new ApiError(404, "Playlist does not exist");
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        throw new ApiError(400, "Invalid or missing problemId");
    }

    try {
        const deletedProblems = await prisma.problemInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemIds,
                },
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { deletedProblems: deletedProblems },
                    "Problem deleted from playlist successfully",
                ),
            );
    } catch (error) {
        console.error("Error while deleting problems: ", error);
        throw new ApiError(500, "Failed to delete problem from playlist");
    }
});

export {
    createPlaylist,
    getAllListDetails,
    getPlaylistDetails,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist,
};
