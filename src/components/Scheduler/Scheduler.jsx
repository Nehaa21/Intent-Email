import { useContext, useEffect, useRef } from "react";
// import { TextField, Button, DialogActions } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
import "./Scheduler.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { AuthContext } from "../../context/auth";

const CustomEditor = ({ scheduler }) => {
  const { setTodoDate } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTodoDate(scheduler.state.start.value);
    navigate("/to-do");
  }, [navigate, scheduler.state.start.value, setTodoDate]);
  // const event = scheduler.edited;

  // Make your own form/state
  // const [state, setState] = useState({
  //   title: event?.title || "",
  //   description: event?.description || "",
  // });
  // const [error, setError] = useState("");

  // const handleChange = (value, name) => {
  //   setState((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };
  // const handleSubmit = async () => {
  //   // Your own validation
  //   if (state.title.length < 3) {
  //     return setError("Min 3 letters");
  //   }

  //   try {
  //     scheduler.loading(true);

  //     /**Simulate remote data saving */
  //     const added_updated_event = await new Promise((res) => {
  //       /**
  //        * Make sure the event have 4 mandatory fields
  //        * event_id: string|number
  //        * title: string
  //        * start: Date|string
  //        * end: Date|string
  //        */

  //       setTimeout(() => {
  //         res(
  //           EVENTS.push({
  //             event_id: EVENTS.length + 1,
  //             title: state.title,
  //             start: scheduler.state.start.value,
  //             end: scheduler.state.end.value,
  //             description: state.description,
  //           })
  //         );
  //       }, 3000);
  //     });

  //     scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
  //     scheduler.close();
  //   } finally {
  //     scheduler.loading(false);
  //   }
  // };
  // return (
  //   <div>
  //     <div style={{ padding: "1rem" }}>
  //       <TextField
  //         label="Title"
  //         value={state.title}
  //         onChange={(e) => handleChange(e.target.value, "title")}
  //         error={!!error}
  //         helperText={error}
  //         fullWidth
  //       />
  //       <TextField
  //         label="Description"
  //         value={state.description}
  //         onChange={(e) => handleChange(e.target.value, "description")}
  //         fullWidth
  //       />
  //     </div>
  //     <DialogActions>
  //       <Button onClick={scheduler.close}>Cancel</Button>
  //       <Button onClick={handleSubmit}>Confirm</Button>
  //     </DialogActions>
  //   </div>
  // );
};

function SchedulerComp() {
  const calRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchRemote = async (query) => {
    /**Simulate fetchin remote data */
    return new Promise((res) => {
      setTimeout(() => {
        res(EVENTS);
      }, 1000);
    });
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    const buttons = document.querySelectorAll(".MuiButton-root");

    buttons.forEach((button) => {
      if (
        button.textContent === "Today" ||
        button.textContent === "Week" ||
        button.textContent === "Day"
      ) {
        button.style.display = "none";
      }
    });
  }, [currentUser, navigate]);
  // console.log(calRef);
  return (
    <div className="" style={{ height: "100vh", overflowY: "scroll" }}>
      <Scheduler
        ref={calRef}
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p>Description: {event.description || "Nothing..."}</p>
            </div>
          );
        }}
        draggable={false}
        onViewChange={() => {
          console.log("first");
        }}
        getRemoteEvents={fetchRemote}
        view="month"
        day={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 0,
          endHour: 24,
          step: 30,
        }}
      />
    </div>
  );
}

export default SchedulerComp;