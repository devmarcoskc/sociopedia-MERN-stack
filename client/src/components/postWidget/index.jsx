import { 
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../flexbetween/index.jsx";
import Friend from "../friend/index.jsx";
import WidgetWrapper from "../widgetwrapper/index.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";
import { setPosts } from "../../state/index.js";
import { boolean } from "yup";

const PostWidget = ({name, postId, postUserId,description, location,
    picturePath, userPicturePath, likes,
    comments}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;  
    const posts = useSelector((state) => state.posts);

    const {palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: loggedInUserId})
      });

      const updatePost = await response.json();
      dispatch(setPost({post: updatePost}));
    }

    const handleDeletePost = async () => {
      const deletePost = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
        method:"DELETE",
        headers: {"Authorization":`Bearer ${token}`},
      });

      const data = await deletePost.json();
      dispatch(setPosts({posts: data}));
    }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{mt:"1rem"}}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{borderRadius: "0.75rem", marginTop:"0.75rem"}}
          src={`${import.meta.env.VITE_BASE_URL}/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">

          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{color: primary}}/>
              ): (
                <FavoriteBorderOutlined/>
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined/>
            </IconButton>  
            <Typography>{comments.length}</Typography>
          </FlexBetween>

        </FlexBetween>

        <Box display="flex" gap="1rem">
          <IconButton>
            <ShareOutlined/>
          </IconButton>
          <IconButton>
            {postUserId === user._id && (
              <DeleteOutlineOutlined onClick={handleDeletePost}/>
            )}
          </IconButton>
        </Box>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider/>
              <Typography sx={{color: main, m:"0.5rem 0", pl:"1rem"}}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider/>
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget;