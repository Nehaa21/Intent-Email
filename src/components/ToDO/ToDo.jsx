import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { EVENTS } from "../Scheduler/events";
import moment from "moment";
import { Card } from "react-bootstrap";
import "./ToDo.css";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const ToDo = () => {
  const { todoDate, setTodoDate } = useContext(UserContext);
  const { currentUser } = useContext(AuthContext);
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    setEmail(localStorage.getItem("userEmail"));
    if (todoDate) {
      const list = EVENTS.filter(
        (e) =>
          moment(e.start).format("DD-MM-YYYY") ===
          moment(todoDate).format("DD-MM-YYYY")
      );
      setTodoList(list);
    } else {
      setTodoList(EVENTS);
    }

    return () => {
      setTodoDate();
    };
  }, [currentUser, navigate, setTodoDate, todoDate]);

  return (
    <div
      className="mt-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card className="text-start p-3 to-do-main">
        <div className="d-flex align-items-center justify-content-between">
          {todoDate && (
            <div className="todo-day">
              <div className="week-day">{moment(todoDate).format("dddd")}</div>
              <div className="week-date">{moment(todoDate).format("D")}</div>
              {todoList.length === 0 && (
                <div className="week-date">No Events</div>
              )}
            </div>
          )}
          {!todoDate && (
            <div className="todo-day">
              <div className="week-day">All Events</div>
            </div>
          )}
          <div className="user">
            <div className="d-flex">
              <div className="d-flex flex-column">
                <div className="col">{email.split("@")[0].toUpperCase()}</div>
                <div className="col">{email}</div>
                <div className="col">9876543210</div>
              </div>
              <div className="col p-2 ms-2">
                <Avatar
                  alt={`${email.split("@")[0].toUpperCase()}`}
                  src="/static/images/avatar/1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        {todoList.length > 0 &&
          todoList.map((event) => {
            return (
              <div className="d-flex mt-3" key={event.event_id}>
                <div className="left-border p-0" />
                <Card className="ms-1 todo-event">
                  <div className="todo-title">{event.title}</div>
                  <div className="todo-description">{event.description}</div>
                  <div className="todo-time">
                    {moment(event.start).format("h:mm A")} -{" "}
                    {moment(event.end).format("h:mm A")}
                  </div>
                </Card>
              </div>
            );
          })}
      </Card>
    </div>
  );
};

export default ToDo;