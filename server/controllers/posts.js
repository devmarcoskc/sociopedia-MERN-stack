import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();

        const post = await Post.find().sort({createdAt:-1});
        res.status(201).json(post);
    } catch(error) {
        res.status(409).json({message: error.message})
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt:-1});
        res.status(201).json(post);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;

        const post = await Post.find({userId}).sort({createdAt:-1});
        res.status(201).json(post);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatePost);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const deleteUserPost = async (req, res) => {
    try {
        const {postId} = req.params;

        await Post.findByIdAndDelete(postId);
        const Posts = await Post.find().sort({createdAt:-1}); 

        res.status(200).json(Posts);
    } catch(error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
}