import { useNavigate } from "react-router-dom";
import "./AutoLogout.css";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";


function AutoLogout(): JSX.Element {
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout>();
  const navigate = useNavigate();
  const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  
  function resetTimer() {
    // Reset the timer when the user interacts with the app
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    const timer = setTimeout(() => {
      logout();
    }, AUTO_LOGOUT_TIME);
    setLogoutTimer(timer);
  }

  function logout() {
    authService.logout().then(
        ()=>{
            notificationService.error("your connection is time out")
            navigate("/login");
        }
    ).catch();
  }

  // Attach event listeners to reset the timer when the user interacts with the app
  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // Start the timer when the component mounts
  useEffect(() => {
    resetTimer();
  }, []);

  // Clear the timer when the user logs out or when the session ends
  useEffect(() => {
    // Implement your logout or session end logic here
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [logoutTimer]);

  return (
    <div>
    </div>
  );
}

export default AutoLogout;
