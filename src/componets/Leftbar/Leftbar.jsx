import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./Leftbar.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

function Leftbar() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  console.log(data);

  return (
    <div className="Leftbar">
      <div className="container">
        <div className="menu">
          {error ? (
            "error"
          ) : isLoading ? (
            "loading"
          ) : (
            <Link
              style={{ textDecoration: "none" }}
              className="user"
              to={`/profile/${data.id}`}
            >
              <img
                className="userIMG"
                src={
                  data.profilePic
                    ? "/upload/" + data.profilePic
                    : "/images/ava.png"
                }
                alt="userIMG"
              />

              <span className="username">{data.name}</span>
            </Link>
          )}

          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/863/863823.png"
              alt=""
            />
            <span>Friends</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1921/1921935.png"
              alt=""
            />
            <span>Groups</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8890/8890391.png"
              alt=""
            />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
              alt=""
            />
            <span>Watch</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3507/3507564.png"
              alt=""
            />
            <span>Memories</span>
          </div>
        </div>

        <div className="shortcuts">
          <span className="itemTitles">Your Shortcuts</span>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3277/3277431.png"
              alt=""
            />
            <span>Events</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/808/808476.png"
              alt=""
            />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2914/2914180.png"
              alt=""
            />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1111/1111880.png"
              alt=""
            />
            <span>Videos</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt=""
            />
            <span>Messages</span>
          </div>
        </div>

        <div className="others">
          <span className="itemTitles">Others</span>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2037/2037747.png"
              alt=""
            />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3048/3048482.png"
              alt=""
            />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3352/3352667.png"
              alt=""
            />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
