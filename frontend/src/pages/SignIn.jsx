import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    localStorage.removeItem("SignInToken" && "SignUpToken");
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username: username,
        password: password
      });

      if (response.data.token) {
          localStorage.setItem("SignInToken", response.data.token);
          localStorage.setItem("Balance", response.data.balance)
          localStorage.setItem("CurrentUser", response.data.name)
          navigate(`/dashboard?name=${response.data.name}`)
      } else {
          setError(response.data.message)
      }
      setLoading(false)
    } catch (err) {
        alert(`Make sure all of the inputs are correct`)
        setLoading(false)
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      {localStorage.removeItem("SignInToken")}
      {localStorage.removeItem("SignUpToken")}
      {localStorage.removeItem("Balance")}
      {localStorage.removeItem("CurrentUser")}
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your registered credentials to sign in"} />
          <InputBox
            label={"Username/Email"}
            placeholder={"xyz@mail.com"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"Minimum 8 characters long"}
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <Button
            label={loading ? "Signing in..." : "Sign in"}
            onClick={handleSignIn}
            disabled={loading}
          />
          <Message label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}
