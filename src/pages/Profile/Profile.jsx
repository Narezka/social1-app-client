import React, { useContext, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Profile.css";
import Posts from "../../componets/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../componets/update/Update";

function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          {" "}
          <div className="images">
            <img
              className="profileCover"
              src={
                data.coverPic
                  ? "/upload/" + data.coverPic
                  : "/images/cover.jpeg"
              }
              alt="profileCover"
            />
            <img
              className="profilePic"
              src={
                data.profilePic
                  ? "/upload/" + data.profilePic
                  : "/images/ava.png"
              }
              alt="profilePic"
            />
          </div>
          <div className="profileBio">
            <span className="profileName">{data.name}</span>

            <div className="bottomInfo">
              <div className="otherAccounts">
                <FacebookIcon className="otherIcons" />
                <InstagramIcon className="otherIcons" />
                <TwitterIcon className="otherIcons" />
                <LinkedInIcon className="otherIcons" />
                <PinterestIcon className="otherIcons" />
              </div>

              <div className="middleBio">
                <div className="location">
                  {data.city ? (
                    <LocationOnIcon
                      className="middleIcons"
                      style={{ width: "15px", marginRight: "5px" }}
                    />
                  ) : null}
                  <span className="text">{data.city}</span>
                </div>

                <div className="website">
                  {data.website ? (
                    <LanguageIcon
                      className="middleIcons"
                      style={{ width: "15px", marginRight: "5px" }}
                    />
                  ) : null}
                  <span className="text">{data.website}</span>
                </div>
              </div>

              <div className="contacts">
                <MailOutlineIcon className="contactsIcon" />
                <MoreVertIcon className="contactsIcon" />
              </div>
            </div>

            {rIsLoading ? (
              "loading"
            ) : userId === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)} className="follow">
                update
              </button>
            ) : (
              <button onClick={handleFollow} className="follow">
                {relationshipData.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <Posts userId={userId} />
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}

export default Profile;
