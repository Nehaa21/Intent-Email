import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/login";

import "bootstrap/dist/css/bootstrap.min.css";
import Scheduler from "./pages/Scheduler";
import ToDoPage from "./pages/todo";
import { createContext, useState } from "react";
import AuthProvider from "./context/auth";

export const UserContext = createContext(undefined);

const App = () => {
  const [todoDate, setTodoDate] = useState();

  return (
    <AuthProvider>
      <UserContext.Provider value={{ todoDate, setTodoDate }}>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<Login />} />
              <Route path="to-do" element={<ToDoPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthProvider>
  );
};

export default App;