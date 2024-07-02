import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {

        setLoading(true)
        setError("")
        if (!firstName || !lastName || !username || !password) {
            setError("All fields are required");
            return;
        }
        if (password.length < 8) {
            setError("All Passwords should be a minimum length of 8 characters");
            setLoading(false)
            return;
        }
        localStorage.removeItem("SignUpToken" & "SignInToken") 
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password
            })
    
            if (response.data.token) {
                localStorage.setItem("SignUpToken", response.data.token);
                localStorage.setItem("Balance", response.data.balance)
                localStorage.setItem("CurrentUser", response.data.name)
                navigate(`/dashboard?name=${response.data.name}`)
            } else {
                setError(response.data.message);
            }
            setLoading(false)
        } catch (err) {
            alert("Internal Server Error")
            setLoading(false)
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            {localStorage.removeItem("SignInToken")}
            {localStorage.removeItem("SignUpToken")}
            {localStorage.removeItem("Balance")}
            {localStorage.removeItem("CurrentUser")}
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        label={"First Name"}
                        placeholder={"Enter your first name"}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                        label={"Last Name"}
                        placeholder={"Enter your last name"}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox
                        label={"Username/Email"}
                        placeholder={"xyz@mail.com"}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox
                        label={"Password"}
                        type="password"
                        placeholder={"Minimum 8 characters long"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    <Button
                        label={loading ? "Signing up..." : "Sign up"}
                        onClick={handleSignUp}
                        disabled={loading}
                    />
                    <Message label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
}
