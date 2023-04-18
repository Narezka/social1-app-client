import React, { useState } from "react";
import "./newstory.css";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "react-query";

function NewStory({ setOpenForm }) {
  const [file, setFile] = useState(null);

  function close() {
    setOpenForm(false);
  }

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
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ img: imgUrl });
    setFile(null);
  };

  return (
    <div className="storyForm">
      <button className="close" onClick={close}>
        x
      </button>
      <h3 className="formHead">Choose a story to share with your friends</h3>
      <input
        type="file"
        // id="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="storyImg"
      />
      {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
      <button disabled={!file} onClick={handleClick} className="shareStory">
        share
      </button>
    </div>
  );
}

export default NewStory;
