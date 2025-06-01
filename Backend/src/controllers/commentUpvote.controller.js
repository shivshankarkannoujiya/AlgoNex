import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";

const toggleCommentUpvote = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
    });

    if (!comment) {
        return res.status(400).json(400, "Comment not found");
    }

    const existingUpvote = await prisma.commentUpvote.findUnique({
        where: {
            commentId_userId: {
                commentId,
                userId,
            },
        },
    });

    if (existingUpvote) {
        await prisma.commentUpvote.delete({
            where: {
                commentId_userId: {
                    commentId,
                    userId,
                },
            },
        });

        return res.status(200).json(new ApiResponse(200, "Upvote removed"));
    } else {
        await prisma.commentUpvote.create({
            data: {
                commentId,
                userId,
            },
        });
    }

    const upvotes = await prisma.commentUpvote.count({
        where: { commentId },
    });

    return res
        .status(200)
        .json(
            200,
            { upvotes: upvotes },
            { message: existingUpvote ? "Upvote removed" : "Comment upvoted" },
        );
});

export { toggleCommentUpvote };

