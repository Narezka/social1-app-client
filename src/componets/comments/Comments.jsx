import moment from "moment";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./comments.css";

function Comments({ postId }) {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="userComment">
        <img
          className="userPic"
          src={"/upload/" + currentUser.profilePic}
          alt="userpic"
        />
        <div className="commentInfo">
          <input
            type="text"
            className="writeComment"
            placeholder="write a comment"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></input>
        </div>
        <button className="sendButton" onClick={handleClick}>
          send
        </button>
      </div>

      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img
                className="userPic"
                src={"/upload/" + comment.profilePic}
                alt="commentPic"
              />
              <div className="commentInfo">
                <span className="userName">{comment.name}</span>
                <p className="commentDesc">{comment.desc}</p>
              </div>
              <span className="commentTime">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments;
