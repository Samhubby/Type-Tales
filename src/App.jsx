import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components/Header/index";
import { Footer } from "./components/Header/index";
import ExampleBar from "./components/Header/Navbar";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout({ userData }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
    <ExampleBar/>
    <Footer/>
    </>
  ) : null;
}

export default App;
