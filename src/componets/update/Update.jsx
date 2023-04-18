import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import "./update.css";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prevValue) => ({
      ...prevValue,
      [e.target.name]: [e.target.value],
    }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: profileUrl, profilePic: coverUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <span>Update</span>
      <button className="updateClose" onClick={() => setOpenUpdate(false)}>
        X
      </button>

      <form>
        <div className="updateCoverPic">
          <p>Cover Picture : </p>
          <input type="file" onChange={(e) => setCover(e.target.files[0])} />
          {/* <img
            className="file"
            src={
              "/upload/" + user.coverPic
            }
            alt=""
          /> */}
          {cover && (
            <img className="file" alt="" src={URL.createObjectURL(cover)} />
          )}
        </div>

        <div className="updateProfilePic">
          <p>Profile Picture :</p>{" "}
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
          {/* <img
            className="file"
            src={
               "/upload/" + user.profilePic
            }
            alt=""
          /> */}
          {profile && (
            <img className="file" alt="" src={URL.createObjectURL(profile)} />
          )}
        </div>

        <div className="updateProfileName">
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={texts.name}
            onChange={handleChange}
          />
        </div>

        <div className="profileCity">
          <p>City:</p>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
        </div>

        <div className="profileWebsite">
          <p>Website:</p>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
        </div>

        <button className="upload" onClick={handleClick}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Update;
