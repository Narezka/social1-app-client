import "./share.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          {error ? (
            "error"
          ) : isLoading ? (
            "loading"
          ) : (
            <div className="left">
              <img
                className="topImg"
                src={
                  data.profilePic
                    ? "/upload/" + data.profilePic
                    : "/images/ava.png"
                }
                alt=""
              />
              <input
                type="text"
                placeholder={`What's on your mind ${data.name}?`}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
          )}

          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img
                  className="bottomImg"
                  src="https://cdn-icons-png.flaticon.com/512/2659/2659360.png"
                  alt=""
                />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img
                className="bottomImg"
                src="https://cdn-icons-png.flaticon.com/512/9514/9514285.png"
                alt=""
              />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img
                className="bottomImg"
                src="https://cdn-icons-png.flaticon.com/512/9308/9308187.png"
                alt=""
              />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
