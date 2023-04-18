import React from "react";
import "./Rightbar.css";
import CircleIcon from "@mui/icons-material/Circle";

function Rightbar() {
  return (
    <div className="Rightbar">
      <div className="container">
        <div className="suggestions">
          <span className="heading">Suggestions For You</span>

          <div className="user">
            <img className="userIMG" src="/images/ava.png" alt="userIMG" />
            <span className="userName">Tom Holland</span>
            <div className="buttons">
              <button className="follow">follow</button>
              <button className="dismiss">dismiss</button>
            </div>
          </div>

          <div className="user">
            <img className="userIMG" src="/images/ava.png" alt="userIMG" />
            <span className="userName">John Doe</span>
            <div className="buttons">
              <button className="follow">follow</button>
              <button className="dismiss">dismiss</button>
            </div>
          </div>
        </div>

        <div className="activities">
          <span className="heading">Latest Activities</span>
          <div className="activityUser">
            <img
              className="ActivityUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <span className="ActivityUserName">
              Alba Baptista{" "}
              <span className="activity">changed their cover picture</span>
            </span>
            <span className="time">1 min ago</span>
          </div>
          <div className="activityUser">
            <img
              className="ActivityUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <span className="ActivityUserName">
              Chris Evans <span className="activity">liked a post</span>
            </span>
            <span className="time">1 min ago</span>
          </div>
          <div className="activityUser">
            <img
              className="ActivityUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <span className="ActivityUserName">
              Taylor Swift <span className="activity">liked a comment</span>
            </span>
            <span className="time">1 min ago</span>
          </div>
          <div className="activityUser">
            <img
              className="ActivityUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <span className="ActivityUserName">
              Selena <span className="activity">posted</span>
            </span>
            <span className="time">1 min ago</span>
          </div>
        </div>

        <div className="onlineFriends">
          <span className="headingOnline">Online Friends</span>
          <div className="userOnline">
            <img
              className="onlineUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <CircleIcon className="onlineTag" />
            <span className="userName">Justin Bieber</span>
          </div>

          <div className="userOnline">
            <img
              className="onlineUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <CircleIcon className="onlineTag" />
            <span className="userName">Hailey</span>
          </div>
          <div className="userOnline">
            <img
              className="onlineUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <CircleIcon className="onlineTag" />
            <span className="userName">Bobby Brown</span>
          </div>
          <div className="userOnline">
            <img
              className="onlineUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <CircleIcon className="onlineTag" />
            <span className="userName">Tom Hardy</span>
          </div>
          <div className="userOnline">
            <img
              className="onlineUserIMG"
              src="/images/ava.png"
              alt="userIMG"
            />
            <CircleIcon className="onlineTag" />
            <span className="userName">Katy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
