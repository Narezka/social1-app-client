import React, { useContext, useEffect, useRef, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

function Navbar() {
  const { changeMode, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [openSugestions, setOpenSugestions] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef();

  const styles = {
    paddingRight: "12px",
    width: "15px",
  };

  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout;
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users/find").then((res) => {
      return res.data;
    })
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
  console.log(uData);

  // const id = currentUser.id - 1;

  function handleKey(e) {
    e.code === "Enter" && handleClick();
  }

  function handleClick(e) {
    setOpenSugestions((prev) => !prev);
  }

  function handleClear() {
    setOpenSugestions(false);
    setName("");
  }

  return (
    <nav className="Navbar">
      <div className="left">
        <Link style={{ textDecoration: "none" }} to="/">
          <h1> ConnectMe! </h1>
        </Link>

        <HomeOutlinedIcon className="leftIcons" style={styles} />
        {darkMode ? (
          <LightModeOutlinedIcon
            onClick={changeMode}
            className="leftIcons"
            style={styles}
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={changeMode}
            className="leftIcons"
            style={styles}
          />
        )}
        <GridViewOutlinedIcon className="leftIcons" style={styles} />

        <form>
          <SearchOutlinedIcon style={styles} />
          <input
            onKeyDown={handleKey}
            onChange={(e) => setName(e.target.value)}
            className="search"
            name="search"
            type="text"
            placeholder="Search..."
            onClick={handleClick}
            value={name}
            ref={inputRef}
          ></input>
          <div className="searchSugestions">
            {isLoading ? (
              "loading"
            ) : openSugestions ? (
              <div className="info">
                {data
                  .filter((user) => user.name.match(new RegExp(name, "i")))
                  .map((user) => {
                    return (
                      name && (
                        <div key={user.id}>
                          <Link
                            to={`/profile/${user.id}`}
                            onClick={handleClear}
                            className="searchUser"
                          >
                            <img
                              className="searchImg"
                              alt="img"
                              src={
                                user.profilePic
                                  ? "/upload/" + user.profilePic
                                  : "/images/ava.png"
                              }
                            />
                            <span className="searchName">{user.name}</span>
                          </Link>
                        </div>
                      )
                    );
                  })}
                <span className="head">Suggestions</span>
                <Link
                  to={`/profile/${data[8].id}`}
                  onClick={() => setOpenSugestions(false)}
                  className="searchUser"
                >
                  <img
                    className="searchImg"
                    alt="img"
                    src={
                      data[8].profilePic
                        ? "/upload/" + data[8].profilePic
                        : "/images/ava.png"
                    }
                  />
                  <span className="searchName">{data[8].name}</span>
                </Link>
              </div>
            ) : null}
          </div>
        </form>
      </div>

      <div className="right">
        <PersonOutlineOutlinedIcon className="rightIcons" style={styles} />
        <MailOutlineIcon className="rightIcons" style={styles} />
        <NotificationsNoneOutlinedIcon className="rightIcons" style={styles} />

        {uError ? (
          "error"
        ) : uIsLoading ? (
          "loading"
        ) : (
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${uData.id}`}
            className="user"
          >
            <img
              className="userIMG"
              src={
                uData.profilePic
                  ? "/upload/" + uData.profilePic
                  : "/images/ava.png"
              }
              alt="userIMG"
            />
            <span className="username">{uData.name}</span>
          </Link>
        )}

        <button className="logout" onClick={handleLogout}>
          logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
