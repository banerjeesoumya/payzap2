import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function SignUp() {

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder = {"Enter your first name"} onChange={function (e) {
                        setfirstName(e.target.value);
                    }} />
                    <InputBox label={"Last Name"} placeholder={"Enter your last name"} onChange={(e) => {
                        setLastName(e.target.value);
                    }} />
                    <InputBox label={"Username"} placeholder={"xyz@mail.com"} onChange={(e) => {
                        setUserName(e.target.value);
                    }} />
                    <InputBox label={"Password"} placeholder={"Enter your password"} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <Button label={"Sign up"} onClick={async () => {
                        localStorage.removeItem("SignUpToken")
                        const response = await axios.post("http://localhost:3003/api/v1/user/signup", {
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            password: password
                        })
                        localStorage.setItem("SignUpToken", response.data.token);
                        navigate("/dashboard")
                    }}/>
                    <Message label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}