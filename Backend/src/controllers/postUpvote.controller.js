import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";

const togglePostUpvote = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user?.id;

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    const existingUpvote = await prisma.postUpvote.findUnique({
        where: {
            postId_userId: {
                postId,
                userId,
            },
        },
    });

    let message;

    if (existingUpvote) {
        await prisma.postUpvote.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        message = "Upvote removed";
    } else {
        await prisma.postUpvote.create({
            data: {
                postId,
                userId,
            },
        });
        message = "Upvote successfully";
    }

    const upvotes = await prisma.postUpvote.count({
        where: { postId },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, message, { upvotes: upvotes }));
});

export { togglePostUpvote };
