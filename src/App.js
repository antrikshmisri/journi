import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Landing from "./routes/Landing";
import SignUp from "./routes/SignUp";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { darkTheme, lightTheme } from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [theme, setTheme] = useState("solardark");

  return (
    <GeistProvider themes={[darkTheme, lightTheme]} themeType={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute setTheme={setTheme}>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Toaster />
      </Router>
    </GeistProvider>
  );
};

export default App;
