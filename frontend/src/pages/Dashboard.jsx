import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  const navigate = useNavigate();
  let memory = null;
  if (localStorage.getItem("SignInToken") !== null) {
    memory = localStorage.getItem("SignInToken");
  } else {
    memory = localStorage.getItem("SignUpToken");
  }

  useEffect(() => {
    if (memory === null) {
      alert("You are not logged into PayZap");
      navigate("/signin");
    }
  }, [memory, navigate]);

  if (memory === null) {
    return null; 
  }

  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value /> 
        <Users />
      </div>
    </div>
  );
}
