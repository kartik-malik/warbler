import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/default-profile-image.jpg";
import Moment from "react-moment";

const MessageItem = ({
  date,
  text,
  profileImageUrl,
  username,
  removeMessage,
  isCorrectUser
}) => {
  return (
    <div>
      <li className="list-group-item">
        <img
          src={profileImageUrl || DefaultProfile}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        ></img>
        <div className="message-area">
          <Link to="/"> @{username}</Link>
          <span className="text-muted"></span>
          <Moment className="text-muted">{date}</Moment>
          <p>{text}</p>
          {isCorrectUser && (
            <button className="btn btn-danger" onClick={removeMessage}>
              Delete
            </button>
          )}
        </div>
      </li>
    </div>
  );
};
export default MessageItem;
