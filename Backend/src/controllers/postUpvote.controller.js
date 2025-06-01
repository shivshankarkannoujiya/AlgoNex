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

    if (existingUpvote) {
        await prisma.postUpvote.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        return res.status(200).json(new ApiResponse(201, "Upvote removed"));
    } else {
        await prisma.postUpvote.create({
            data: {
                postId,
                userId,
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(201, "Upvote Successfully"));
    }
    // TODO:  return total upvotes count after toggling
});

export { togglePostUpvote };
