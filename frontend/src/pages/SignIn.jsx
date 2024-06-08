import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn() {

    const [username, setUserName] = useState("");
    const [password, setUserPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to sign in"} />
                    <InputBox label={"Username"} placeholder={"Enter your username"} onChange={(e) => {
                        setUserName(e.target.value);
                    }}/>
                    <InputBox label={"Password"} placeholder={"Enter your password"} onChange={(e) => {
                        setUserPassword(e.target.value);
                    }}/>
                    <Button label={"Sign in"} onClick={async () => {
                        localStorage.removeItem("SignInToken")
                        const response = await axios.post("http://localhost:3003/api/v1/user/signin", {
                            username: username,
                            password: password
                        })
                        localStorage.setItem("SignInToken", response.data.token);
                        navigate("/dashboard");
                    }}/>
                    <Message label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}