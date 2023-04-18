import React, { useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import "./post.css";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

function Post({ post }) {
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const likePost = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="topPostInfo">
        <img
          className="postUserIMG"
          src={
            post.profilePic ? "/upload/" + post.profilePic : "/images/ava.png"
          }
          alt="userIMG"
        ></img>
        <Link className="postUser" to={`/profile/${post.userId}`}>
          <span className="postUserName">{post.name}</span>
          <span className="postTime">{moment(post.createdAt).fromNow()}</span>
        </Link>

        <MoreHorizIcon
          className="moreIcon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && post.userId === currentUser.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>

      <div className="postContent">
        <span className="postDescription">{post.desc}</span>
        <img
          className="postIMG"
          src={post.img ? "/upload/" + post.img : null}
          alt="postIMG"
        ></img>
      </div>

      <div className="bottomPostInfo">
        <div className="postNumbers">
          <span className="like">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon className="likedIcon" onClick={likePost} />
            ) : (
              <FavoriteBorderIcon className="likeIcon" onClick={likePost} />
            )}
            {data?.length} likes
          </span>
          <span
            className="comment"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            See comments
          </span>
          <span className="shared">
            {" "}
            <ShareIcon className="shareIcon" />
            Share
          </span>
        </div>

        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

export default Post;
