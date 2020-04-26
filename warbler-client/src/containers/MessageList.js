import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages, removeMessage } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";
import { removeError } from "../store/actions/errors";

class MessageList extends Component {
  componentDidMount = () => {
    this.props.fetchMessages();
  };

  render() {
    const { messages, removeMessage, currentUserId } = this.props;
    let messageList = messages.map(m => (
      <MessageItem
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        key={m._id}
        date={m.createdAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        isCorrectUser={currentUserId === m.user._id}
      />
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToprops(state) {
  return {
    messages: state.messages,
    currentUserId: state.currentUser.user.id
  };
}
export default connect(mapStateToprops, { fetchMessages, removeMessage })(
  MessageList
);
