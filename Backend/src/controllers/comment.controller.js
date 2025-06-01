import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRole } from "../generated/prisma/index.js";

const createComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!content || !postId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    const newComment = await prisma.comment.create({
        data: {
            content,
            post: { connect: { id: postId } },
            author: { connect: { id: userId } },
        },
        include: {
            author: { select: { id: true, username: true, avatarUrl: true } },
        },
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { comment: newComment },
                "Comment Created Successfully",
            ),
        );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === UserRole.ADMIN;

    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
    });

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.authorId !== userId && !isAdmin) {
        return res
            .status(403)
            .json({ error: "Unauthorized to delete this comment" });
    }

    await prisma.comment.delete({
        where: { id: commentId },
    });

    return res
        .status(204)
        .json(new ApiResponse(204, "Comment deleted Successfully"));
});

export {
    createComment,
    deleteComment
}