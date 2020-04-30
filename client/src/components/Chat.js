import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chat: {
    position: "fixed",
    bottom: "0px",
    right: "10px",
  },
  chatContent: {
    border: "solid 1px #000",
    height: "500px",
    width: "300px",
    position: "fixed",
    bottom: "20px",
    right: "10px",
    backgroundColor: "white",
  },
  chatMessages: {
    height: "400px",
    "overflow-x": "auto",
  },
  chatHeader: {
    position: "fixed",
    height: "20px",
    width: "300px",
    bottom: "0px",
    right: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Chat = ({ chatName, socket }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const username =
    sessionStorage.getItem("username") ||
    localStorage.getItem("username") ||
    "guest";
  const classes = useStyles();

  const scroll = () => {
    const chat = document.getElementById("chatmessages");
    if (chat) {
      chat.scrollTo(0, chat.scrollHeight);
    }
  };

  useEffect(() => {
    socket.on("messages", (data) => {
      setMessages(data);
      scroll();
    });
    scroll();
  }, [socket, open]);

  const togglePanel = (e) => {
    setOpen(!open);
  };

  const send = (e) => {
    socket.emit("message", {
      Username: username,
      Message: message,
      Time: Date.now(),
    });
  };

  return (
    <div className={classes.chat}>
      {open ? (
        <div className={classes.chatContent}>
          <Container id="chatmessages" className={classes.chatMessages}>
            {messages &&
              messages.map((message) => (
                <p>{`${message.Username} : ${message.Message}`}</p>
              ))}
          </Container>
          <TextField
            variant="outlined"
            margin="normal"
            id="message"
            label="Message"
            name="message"
            autoFocus
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={send}
          >
            Send
          </Button>
        </div>
      ) : null}
      <div onClick={togglePanel} className={classes.chatHeader}>
        {chatName}
      </div>
    </div>
  );
};

export default Chat;
