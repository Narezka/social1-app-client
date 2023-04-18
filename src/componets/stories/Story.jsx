import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./story.css";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import NewStory from "../newStory/NewStory";
import moment from "moment";
import { useLocation } from "react-router-dom";

function Story({ userId }) {
  const { currentUser } = useContext(AuthContext);
  const [openForm, setOpenForm] = useState(false);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  const sortedArray = data?.sort(
    (a, b) => moment(b.createdAt) - moment(a.createdAt)
  );

  const {
    isLoading: uIsLoading,
    error: uError,
    data: uData,
  } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  // console.log(sortedArray);

  return (
    <div className="topContainer">
      <div className="stories">
        {uError ? (
          "error"
        ) : uIsLoading ? (
          "loading"
        ) : (
          <div className="story">
            <img
              className="storyIMG"
              src={
                uData.profilePic
                  ? "/upload/" + uData.profilePic
                  : "/images/ava.png"
              }
              alt="story"
            ></img>
            <div className="addStory" onClick={() => setOpenForm(true)}>
              <AddIcon className="addIcon" />
              <span className="newStory">Create Story</span>
            </div>
          </div>
        )}

        {openForm && <NewStory setOpenForm={setOpenForm} />}
        {error
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          : Object.entries(data)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((story) => (
                <div className="story" key={story[0]}>
                  <img
                    className="storyIMG"
                    src={"/upload/" + story[1].img}
                    alt="story"
                  ></img>
                  <span className="storyUserName">{story[1].name}</span>
                </div>
              ))}
      </div>
    </div>
  );
}

export default Story;
