import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";
import { addPassword, addUsers } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

function Authentication() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { username, password } = useSelector((state) => ({
    username: state.user.name,
    password: state.user.password,
  }));

  const dispatch = useDispatch();

  const submit = () => {
    if (username === "" || password === "") {
      alert("Please fill the fields.");
      return;
    }

    setLoading(true);

    const url = "http://chat-server-challenge.herokuapp.com/login";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/dashboard");
      });

    // setLoading(true);
    // dispatch(fetchUserCredential({ username, password }));
    // setLoading(false);
    // navigate("/dashboard");
  };

  return (
    <div className="body">
      <div className="container">
        <p>Authentication</p>
        <form className="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              placeholder="username"
              value={username}
              onChange={(e) => dispatch(addUsers(e.target.value))}
              required
            />
            <label className="form-label">Username</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              autoComplete="off"
              placeholder="password"
              value={password}
              onChange={(e) => dispatch(addPassword(e.target.value))}
              required
            />
            <label className="form-label">Password</label>
          </div>
        </form>

        {!loading && (
          <button onClick={submit}>
            LOG IN
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        )}
        {loading && (
          <div>
            <button>
              LOG IN
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authentication;
