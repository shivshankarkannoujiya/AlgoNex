import { prisma } from "../lib/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { UserRole } from "../generated/prisma/index.js";

const createPost = asyncHandler(async (req, res) => {
    const { problemId, title, content, tags } = req.body;
    const userId = req.user?.id;

    if (!problemId || !title || !content) {
        throw new ApiError(400, "Missing required fields");
    }

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            tags,
            problem: {
                connect: {
                    id: problemId,
                },
            },
            author: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { post: newPost },
                "Post Created Successfully",
            ),
        );
});

const getPostsByProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { sort = "new", search = "", tag = "" } = req.query;

    let orderBy;
    if (sort === "top") {
        orderBy = { upvotes: { _count: "desc" } };
    } else if (sort === "mostCommented") {
        orderBy = { comments: { _count: "desc" } };
    } else {
        orderBy = { createdAt: "desc" };
    }

    const posts = await prisma.post.findMany({
        where: {
            problemId,
            AND: [
                search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  content: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {},
                tag ? { tags: { has: tag } } : {},
            ],
        },
        include: {
            author: { select: { id: true, username: true, avatarUrl: true } },
            comments: true,
            upvotes: true,
        },
        orderBy,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { posts: posts },
                "Posts fetched Successfully",
            ),
        );
});

const getAllPosts = asyncHandler(async (req, res) => {
    const sort = req.query.sort || "newest"; // can be 'newest' or 'popular'

    const posts = await prisma.post.findMany({
        orderBy:
            sort === "popular"
                ? { upvotes: { _count: "desc" } }
                : { createdAt: "desc" },

        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                },
            },
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { posts: posts },
                "All Post Fetched Successfully",
            ),
        );
});

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: { select: { id: true, username: true, avatarUrl: true } },
            comments: {
                include: {
                    author: {
                        select: { id: true, username: true, avatarUrl: true },
                    },
                    upvotes: true,
                },
                orderBy: { createdAt: "asc" },
            },
            upvotes: true,
        },
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { post: post }, "Post fetched Successfully"),
        );
});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === UserRole.ADMIN;

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.authorId !== userId && !isAdmin) {
        return res
            .status(403)
            .json({ error: "Unauthorized to delete this post" });
    }

    await prisma.post.delete({
        where: { id: postId },
    });

    return res.status(204).json(204, "Post Deleted Successfully");
});

export { createPost, getPostsByProblem, getPostById, deletePost, getAllPosts };
